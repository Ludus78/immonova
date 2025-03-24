import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { authOptions } from "../auth/[...nextauth]/auth.config";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Initialiser le client OpenAI avec la clé API
let openai: OpenAI | null = null;
try {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "votre-cle-api-openai") {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
} catch (error) {
  console.error("Erreur lors de l'initialisation d'OpenAI:", error);
}

// Fonction pour rechercher sur le web
async function searchWeb(query: string) {
  try {
    // Améliorer la requête en ajoutant des termes pertinents pour l'immobilier
    let enhancedQuery = query;
    
    // Ajouter des termes spécifiques à l'immobilier pour améliorer les résultats
    const immobilierTerms = ["immobilier", "logement", "bien immobilier", "propriété"];
    const financeTerms = ["crédit immobilier", "prêt", "financement", "taux"];
    const achatTerms = ["achat", "acquisition", "acheter", "compromis"];
    const venteTerms = ["vente", "vendre", "estimation"];
    const locationTerms = ["location", "louer", "bail", "locataire"];
    
    // Si la requête ne contient pas déjà des termes immobiliers, les ajouter
    if (!immobilierTerms.some(term => query.toLowerCase().includes(term))) {
      // Détecter le contexte de la question
      if (financeTerms.some(term => query.toLowerCase().includes(term))) {
        enhancedQuery += " financement immobilier";
      } else if (achatTerms.some(term => query.toLowerCase().includes(term))) {
        enhancedQuery += " achat immobilier";
      } else if (venteTerms.some(term => query.toLowerCase().includes(term))) {
        enhancedQuery += " vente immobilier";
      } else if (locationTerms.some(term => query.toLowerCase().includes(term))) {
        enhancedQuery += " location immobilier";
      } else {
        enhancedQuery += " immobilier";
      }
    }
    
    // Ajouter 'France' à la requête pour contextualiser géographiquement si pas déjà présent
    if (!query.toLowerCase().includes("france")) {
      enhancedQuery += " France";
    }
    
    // Appeler l'API de recherche avec la requête améliorée
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/web-search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: enhancedQuery })
    });
    
    if (!response.ok) {
      throw new Error("Erreur lors de la recherche web");
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erreur de recherche web:", error);
    return [];
  }
}

// Fonction pour obtenir ou créer une session de chat
async function getOrCreateChatSession(userId: string | null) {
  try {
    // Récupérer l'ID de session des cookies ou en créer un nouveau
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("chatSessionId")?.value;
    
    if (!sessionId) {
      sessionId = uuidv4();
      // Définir un cookie qui expire après 30 jours
      cookieStore.set("chatSessionId", sessionId, { 
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      });
    }
    
    // Rechercher une session existante
    let chatSession = await prisma.chatSession.findFirst({
      where: {
        OR: [
          { userId: userId },
          { sessionId: sessionId }
        ]
      },
      include: {
        messages: {
          orderBy: { timestamp: 'asc' }
        }
      }
    });
    
    // Si aucune session n'existe, en créer une nouvelle
    if (!chatSession) {
      chatSession = await prisma.chatSession.create({
        data: {
          userId: userId,
          sessionId: sessionId,
        },
        include: {
          messages: true
        }
      });
    }
    
    return chatSession;
  } catch (error) {
    console.error("Erreur lors de la récupération/création de session:", error);
    return null;
  }
}

// Fonction pour sauvegarder un message dans la base de données
async function saveMessage(sessionId: string, content: string, sender: string) {
  try {
    return await prisma.chatMessage.create({
      data: {
        content,
        sender,
        chatSessionId: sessionId
      }
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du message:", error);
    return null;
  }
}

// Réponses prédéfinies pour le mode de secours
const fallbackResponses = {
  "bonjour": "Bonjour ! Je suis Fabi, votre assistant immobilier. Comment puis-je vous aider aujourd'hui ?",
  "salut": "Salut ! Je suis Fabi, votre assistant immobilier. En quoi puis-je vous être utile ?",
  "hello": "Bonjour ! Je suis Fabi, votre assistant immobilier. Comment puis-je vous aider aujourd'hui ?",
  "aide": "Je peux vous aider sur différents sujets liés à l'immobilier comme l'achat, la vente, les démarches administratives, le financement, etc. N'hésitez pas à me poser une question précise !",
  "achat": "Pour un achat immobilier, je vous conseille de bien définir votre budget, faire une liste de vos critères essentiels, et contacter notre équipe pour vous accompagner. Voulez-vous plus d'informations sur une étape particulière ?",
  "vente": "Pour vendre votre bien, nous pouvons vous aider à estimer sa valeur, préparer les documents nécessaires et trouver des acheteurs potentiels. Souhaitez-vous plus d'informations sur le processus de vente ?",
  "prix": "Les prix immobiliers varient considérablement selon la localisation, la taille, et l'état du bien. Je vous conseille d'utiliser notre outil d'estimation ou de contacter notre équipe pour une évaluation personnalisée.",
  "credit": "Pour votre crédit immobilier, nous recommandons de comparer plusieurs offres de banques. Votre taux dépendra de votre apport personnel, votre situation professionnelle et la durée de l'emprunt.",
  "notaire": "Les frais de notaire représentent généralement entre 7% et 8% du prix d'achat pour un bien ancien, et environ 2-3% pour un bien neuf. Ils comprennent les droits d'enregistrement, la rémunération du notaire et diverses taxes.",
  "diagnostics": "Les diagnostics immobiliers obligatoires incluent le DPE (performance énergétique), l'amiante, le plomb, les termites, l'électricité, le gaz, et les risques naturels. Ils doivent être fournis par le vendeur et sont valables entre 3 et 10 ans selon le type.",
  "dpe": "Le Diagnostic de Performance Énergétique (DPE) évalue la consommation énergétique d'un logement et son impact environnemental. Depuis juillet 2021, il est plus fiable et opposable. Les logements sont classés de A (très performant) à G (peu performant).",
  "compromis": "Le compromis de vente est un contrat qui engage acheteur et vendeur. Il précise les conditions de la vente et prévoit généralement des conditions suspensives (obtention de prêt, absence de servitudes). Un délai de rétractation de 10 jours est prévu pour l'acheteur.",
  "ptz": "Le Prêt à Taux Zéro (PTZ) est un prêt sans intérêts, accordé sous conditions de ressources pour l'achat d'une première résidence principale. Il peut financer jusqu'à 40% du prix d'acquisition selon la zone géographique et doit être complété par d'autres prêts.",
  "pinel": "La loi Pinel permet de bénéficier d'une réduction d'impôt pour l'investissement locatif dans le neuf, en contrepartie d'un engagement de location à un loyer plafonné pendant 6, 9 ou 12 ans. L'avantage fiscal peut atteindre jusqu'à 21% du prix d'achat.",
  "plus value": "La plus-value immobilière est la différence entre le prix de vente et le prix d'achat d'un bien. Pour les résidences principales, elle est totalement exonérée d'impôt. Pour les résidences secondaires, l'impôt diminue avec la durée de détention (exonération totale après 22 ans pour l'impôt sur le revenu).",
  "hypothèque": "L'hypothèque est une garantie prise par la banque sur votre bien immobilier. En cas de non-remboursement du prêt, la banque peut saisir et vendre le bien. L'alternative est le privilège de prêteur de deniers (PPD), moins coûteux mais uniquement pour l'achat d'un bien existant.",
  "locataire": "En tant que locataire, vous avez des droits et des obligations. Vous devez payer votre loyer et charges à temps, entretenir le logement et respecter le voisinage. Le propriétaire doit vous fournir un logement décent, effectuer les réparations importantes et respecter votre vie privée.",
  "congé": "Le congé est la notification de fin de bail, qui peut être donné par le locataire (préavis de 1 à 3 mois) ou par le propriétaire (préavis de 6 mois, uniquement à l'échéance du bail et pour motif légitime : vente, reprise pour habiter, motif légitime et sérieux).",
  "investissement": "Pour un investissement locatif réussi, considérez l'emplacement (demande locative, services, transports), la rentabilité (rapport entre loyer annuel et prix d'achat), la fiscalité (dispositifs comme Pinel ou LMNP) et la gestion (directe ou via une agence).",
  "lmnp": "Le statut LMNP (Loueur Meublé Non Professionnel) permet de louer des biens meublés avec des avantages fiscaux. Les revenus sont imposés dans la catégorie BIC avec un abattement forfaitaire de 50% ou au régime réel, permettant d'amortir le bien et de déduire certaines charges.",
  "sci": "La SCI (Société Civile Immobilière) est une structure permettant d'acquérir et gérer un bien immobilier à plusieurs. Elle facilite la transmission, permet de dissocier propriété et jouissance du bien, et peut offrir des avantages fiscaux selon votre situation.",
  "copropriété": "La copropriété est un régime où chaque propriétaire possède un lot privatif et une quote-part des parties communes. Elle est gérée par un syndic qui exécute les décisions prises en assemblée générale. Chaque copropriétaire paie des charges proportionnelles à sa quote-part.",
  "viager": "Le viager est une vente où l'acheteur (débirentier) verse au vendeur (crédirentier) un bouquet initial puis une rente jusqu'à son décès. Le prix total dépend de l'espérance de vie du vendeur. Il existe le viager occupé (le vendeur reste dans le logement) et le viager libre.",
  "default": "Je n'ai pas toutes les informations spécifiques sur ce sujet, mais je peux vous orienter vers les ressources appropriées ou vous aider sur d'autres aspects de l'immobilier. Pourriez-vous préciser votre question ou me dire quel aspect vous intéresse particulièrement ?"
};

// Information sur l'immobilier en France pour enrichir les réponses du bot
const realEstateContext = `
Information contextuelle sur l'immobilier en France:

1. ACHAT IMMOBILIER:
- Étapes principales: recherche, visite, offre d'achat, compromis de vente, financement, acte définitif.
- Documents nécessaires pour l'achat: pièce d'identité, justificatifs de revenus, avis d'imposition, relevés de compte bancaire.
- Frais d'acquisition: frais de notaire (7-8% pour l'ancien, 2-3% pour le neuf), frais de dossier bancaire, frais d'hypothèque.
- Délais moyens: 3 mois entre compromis et acte définitif.

2. FINANCEMENT:
- Taux d'endettement maximum recommandé: 35% des revenus nets.
- Durée maximale d'emprunt: généralement 25 ans, parfois 30 ans.
- Apport personnel recommandé: minimum 10% du prix d'achat, idéalement 20%.
- Aides: PTZ (Prêt à Taux Zéro), Action Logement, prêts conventionnés, PAS (Prêt d'Accession Sociale).

3. FISCALITÉ IMMOBILIÈRE:
- Taxe foncière: payée par le propriétaire, basée sur la valeur locative cadastrale.
- Taxe d'habitation: en cours de suppression pour les résidences principales.
- Plus-values immobilières: exonération pour résidence principale, abattements progressifs pour les autres biens (exonération totale après 22 ans pour l'impôt sur le revenu, 30 ans pour les prélèvements sociaux).
- Dispositifs d'investissement: Pinel, LMNP (Loueur Meublé Non Professionnel), Denormandie, Malraux.

4. VENTE IMMOBILIÈRE:
- Documents à préparer: titre de propriété, diagnostics techniques obligatoires, état hypothécaire.
- Diagnostics obligatoires: DPE, amiante, plomb, électricité, gaz, termites (selon zone), état des risques naturels et technologiques, assainissement.
- Commission d'agence: généralement entre 4% et 8% du prix de vente.
- Garanties du vendeur: garantie décennale, garantie des vices cachés.

5. LOCATION:
- Bail de location: 3 ans (meublé: 1 an), tacite reconduction.
- Dépôt de garantie: maximum 1 mois de loyer hors charges (2 mois pour meublé).
- Préavis: locataire (1 mois en zone tendue, 3 mois ailleurs), propriétaire (préavis de 6 mois à l'échéance du bail).
- Encadrement des loyers: applicable dans certaines zones tendues comme Paris.

6. COPROPRIÉTÉ:
- Charges: charges courantes (entretien courant, gardiennage) et charges exceptionnelles (travaux).
- Syndic: professionnel ou bénévole, responsable de l'administration de l'immeuble.
- Assemblée générale: réunion annuelle obligatoire des copropriétaires pour voter les décisions importantes.
- Règlement de copropriété: document définissant les règles de vie et l'usage des parties communes et privatives.

7. TENDANCES DU MARCHÉ (2022-2023):
- Prix en hausse dans les grandes villes et leurs périphéries.
- Demande accrue pour les logements avec espaces extérieurs et/ou possibilité de télétravail.
- Taux d'intérêt en augmentation, impactant la capacité d'emprunt.
- Tension sur l'offre locative dans les zones urbaines attractives.
- Impact croissant des critères énergétiques (DPE) sur les prix et la valorisation des biens.
`;

function getFallbackResponse(message: string): string {
  const lowerCaseMessage = message.toLowerCase();
  
  // Tableau d'objets contenant des mots clés associés à chaque sujet
  const keywordMap = [
    { key: "bonjour" as keyof typeof fallbackResponses, keywords: ["bonjour", "salut", "hello", "coucou", "hey", "bonsoir"] },
    { key: "aide" as keyof typeof fallbackResponses, keywords: ["aide", "help", "aider", "besoin", "comment", "pouvez"] },
    { key: "achat" as keyof typeof fallbackResponses, keywords: ["achat", "acheter", "acquérir", "acquisition", "devenir propriétaire", "premier achat"] },
    { key: "vente" as keyof typeof fallbackResponses, keywords: ["vente", "vendre", "céder", "mettre en vente", "revendre"] },
    { key: "prix" as keyof typeof fallbackResponses, keywords: ["prix", "coût", "montant", "valeur", "tarif", "combien", "estimation"] },
    { key: "credit" as keyof typeof fallbackResponses, keywords: ["crédit", "prêt", "emprunt", "financement", "banque", "taux", "hypothèque"] },
    { key: "notaire" as keyof typeof fallbackResponses, keywords: ["notaire", "frais de notaire", "acte notarié", "honoraires", "acte authentique"] },
    { key: "diagnostics" as keyof typeof fallbackResponses, keywords: ["diagnostic", "dpe", "amiante", "plomb", "termites", "électricité", "gaz"] },
    { key: "dpe" as keyof typeof fallbackResponses, keywords: ["dpe", "diagnostic performance", "énergie", "étiquette énergétique", "classe énergétique"] },
    { key: "compromis" as keyof typeof fallbackResponses, keywords: ["compromis", "promesse", "avant-contrat", "signer", "précontrat", "offre"] },
    { key: "ptz" as keyof typeof fallbackResponses, keywords: ["ptz", "prêt à taux zéro", "taux zéro", "première acquisition", "primo"] },
    { key: "pinel" as keyof typeof fallbackResponses, keywords: ["pinel", "défiscalisation", "réduction d'impôt", "investissement locatif", "défiscaliser"] },
    { key: "plus value" as keyof typeof fallbackResponses, keywords: ["plus-value", "plus value", "bénéfice", "gain", "impôt sur la plus-value", "taxation"] },
    { key: "hypothèque" as keyof typeof fallbackResponses, keywords: ["hypothèque", "garantie", "caution", "privilège prêteur", "ppd"] },
    { key: "locataire" as keyof typeof fallbackResponses, keywords: ["locataire", "louer", "location", "bail", "loyer", "préavis"] },
    { key: "congé" as keyof typeof fallbackResponses, keywords: ["congé", "préavis", "résiliation", "fin de bail", "rupture", "quitter"] },
    { key: "investissement" as keyof typeof fallbackResponses, keywords: ["investissement", "investir", "placement", "rendement", "rentabilité", "locatif"] },
    { key: "lmnp" as keyof typeof fallbackResponses, keywords: ["lmnp", "loueur meublé", "meublé", "fiscalité location", "bic", "amortissement"] },
    { key: "sci" as keyof typeof fallbackResponses, keywords: ["sci", "société civile", "société immobilière", "parts", "gérant"] },
    { key: "copropriété" as keyof typeof fallbackResponses, keywords: ["copropriété", "syndic", "charges", "assemblée générale", "lot", "tantièmes", "millièmes"] },
    { key: "viager" as keyof typeof fallbackResponses, keywords: ["viager", "rente", "viagère", "bouquet", "occupé", "libre", "espérance de vie"] }
  ];
  
  // Rechercher des correspondances dans le message
  for (const item of keywordMap) {
    for (const keyword of item.keywords) {
      if (lowerCaseMessage.includes(keyword)) {
        return fallbackResponses[item.key];
      }
    }
  }
  
  // Pour les messages qui contiennent des questions complexes ou générales sur l'immobilier
  const generalQuestionPatterns = [
    /comment .*immobil/i, 
    /qu['e].*est.*ce.*qu/i, 
    /quelles sont/i, 
    /conseils.*pour/i, 
    /comment faire/i, 
    /quelle.*différence/i,
    /quel.*avantages?/i,
    /quel.*inconvénients?/i,
    /comment choisir/i,
    /est-ce que je dois/i,
    /est-ce qu'il faut/i,
    /peut-on/i,
    /doit-on/i,
    /faut-il/i
  ];
  
  if (generalQuestionPatterns.some(pattern => pattern.test(lowerCaseMessage))) {
    // Réponse générique pour les questions complexes
    return "Je comprends votre question sur l'immobilier. Pour vous donner la réponse la plus précise possible, pourriez-vous me préciser si votre question concerne l'achat, la vente, la location, l'investissement ou un autre domaine spécifique de l'immobilier ?";
  }
  
  // Si aucun mot clé ne correspond, utiliser la réponse par défaut
  return fallbackResponses.default;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Le message est requis" },
        { status: 400 }
      );
    }
    
    // Récupérer la session d'authentification
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    
    // Récupérer ou créer une session de chat
    const chatSession = await getOrCreateChatSession(userId);
    
    if (!chatSession) {
      throw new Error("Impossible de créer ou récupérer une session de chat");
    }
    
    // Enregistrer le message de l'utilisateur
    await saveMessage(chatSession.id, message, "user");

    // Vérifier si OpenAI est configuré
    if (!openai) {
      console.log("Mode de secours activé - OpenAI n'est pas configuré");
      const fallbackResponse = getFallbackResponse(message);
      
      // Enregistrer la réponse du bot
      await saveMessage(chatSession.id, fallbackResponse, "bot");
      
      return NextResponse.json({ response: fallbackResponse }, { status: 200 });
    }

    try {
      // Faire une recherche web pour enrichir la réponse
      const searchResults = await searchWeb(message);
      
      // Préparer le contexte avec les résultats de recherche
      let searchContext = "";
      if (searchResults.length > 0) {
        searchContext = "Informations trouvées sur le web :\n\n";
        searchResults.slice(0, 3).forEach((result: any, index: number) => {
          searchContext += `${index + 1}. ${result.title}\n${result.snippet}\nSource: ${result.link}\n\n`;
        });
      }
      
      // Préparer les messages précédents pour le contexte
      const previousMessages: ChatCompletionMessageParam[] = chatSession.messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant" as const,
        content: msg.content
      }));
      
      // Limite à un maximum de 10 messages précédents pour éviter des coûts trop élevés
      const contextMessages = previousMessages.slice(-10);
      
      // Construire les messages pour l'API OpenAI
      const messages: ChatCompletionMessageParam[] = [
        { 
          role: "system" as const, 
          content: `Tu es Fabi, un assistant immobilier expert et sympathique pour le site ImmoNova. Tu réponds aux questions des utilisateurs sur l'immobilier en France avec des conseils pratiques et précis.

DIRECTIVES:
1. Sois concis, précis et pédagogue dans tes réponses.
2. Donne des informations spécifiques et concrètes, pas de généralités.
3. Si tu ne connais pas la réponse exacte, dis-le clairement et suggère où trouver l'information.
4. Utilise les informations du web quand elles sont disponibles pour répondre avec précision.
5. Limite tes réponses à 3-4 phrases ou une liste de points courts dans la plupart des cas.
6. N'invente jamais de chiffres précis ou de statistiques si tu n'en as pas.
7. Pour les questions légales complexes, précise que tu n'es pas un conseiller juridique et que l'utilisateur devrait consulter un professionnel.
8. Ne mentionne pas de concurrents. Si on te pose une question comparative, reste neutre et factuel.
9. Privilégie l'information française (lois, pratiques) car tu t'adresses à un public français.
10. Réponds uniquement aux questions liées à l'immobilier. Si la question n'est pas liée à l'immobilier, invite poliment l'utilisateur à te poser une question immobilière.

${realEstateContext}` 
        },
        ...contextMessages,
        {
          role: "user" as const,
          content: searchContext ? `Question: ${message}\n\n${searchContext}` : message
        }
      ];

      // Obtenir une réponse de l'API OpenAI
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const responseText = chatResponse.choices[0].message.content;

      // Si la réponse est vide (peu probable mais possible)
      if (!responseText) {
        throw new Error("Réponse vide de l'API");
      }
      
      // Enregistrer la réponse du bot
      await saveMessage(chatSession.id, responseText, "bot");

      return NextResponse.json({ response: responseText }, { status: 200 });
    } catch (openaiError) {
      console.error("Erreur OpenAI:", openaiError);
      // Fallback en cas d'erreur OpenAI
      const fallbackResponse = getFallbackResponse(message);
      
      // Enregistrer la réponse fallback du bot
      await saveMessage(chatSession.id, fallbackResponse, "bot");
      
      return NextResponse.json({ response: fallbackResponse }, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur lors de la réponse du chat:", error);
    return NextResponse.json(
      { response: "Je suis désolé, je rencontre des difficultés techniques. Pourriez-vous réessayer dans quelques instants ?" },
      { status: 200 }
    );
  }
} 