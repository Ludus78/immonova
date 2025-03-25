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
  "frais agence": "Les frais d'agence immobilière varient selon le type de bien et la région. En général, ils représentent entre 4% et 8% du prix de vente pour le vendeur. Pour l'acheteur, ces frais sont inclus dans le prix de vente. Le montant exact dépend de plusieurs facteurs : le type de bien (appartement, maison, terrain), la zone géographique, et les services inclus (estimation, photos, visites, etc.).",
  "frais notaire": "Les frais de notaire comprennent plusieurs éléments : les droits d'enregistrement (taxe départementale et communale), la rémunération du notaire, et diverses taxes. Pour un bien ancien, ils représentent environ 7-8% du prix d'achat. Pour un bien neuf, ils sont plus faibles, autour de 2-3% car il n'y a pas de droits d'enregistrement.",
  "frais annexes": "Les frais annexes à l'achat immobilier incluent : les frais de dossier bancaire (environ 1% du prêt), les frais d'hypothèque (si nécessaire), les frais de garantie (1-2% du prêt), les frais d'assurance habitation, et les frais de déménagement. Il faut prévoir environ 1-2% supplémentaires du prix d'achat pour ces frais.",
  "apport": "L'apport personnel recommandé pour un achat immobilier est généralement de 10% minimum du prix d'achat, idéalement 20%. Un apport plus important peut permettre d'obtenir un meilleur taux d'intérêt et de réduire les frais de garantie. L'apport peut provenir de votre épargne, d'un don familial, ou de la vente d'un autre bien.",
  "taux endettement": "Le taux d'endettement maximum recommandé est de 35% des revenus nets. Ce ratio est calculé en divisant le montant total des mensualités de crédit par le revenu net mensuel. Par exemple, si vous gagnez 3000€ net par mois, vos mensualités de crédit ne devraient pas dépasser 1050€.",
  "durée prêt": "La durée maximale d'un prêt immobilier est généralement de 25 ans, parfois 30 ans pour certains profils. Une durée plus longue permet des mensualités plus basses mais augmente le coût total du crédit. Le choix de la durée dépend de votre âge, de votre capacité d'emprunt et de vos objectifs financiers.",
  "garantie": "Les principales garanties pour un prêt immobilier sont : l'hypothèque (garantie sur le bien), le privilège de prêteur de deniers (PPD, moins coûteux), et la caution (garantie par un organisme spécialisé). Le choix dépend du type de bien, de votre situation et des exigences de la banque.",
  "assurance": "L'assurance habitation est obligatoire pour tout propriétaire ou locataire. Elle couvre les dommages causés à votre bien et aux tiers. Pour un prêt immobilier, l'assurance emprunteur est également obligatoire. Elle couvre le remboursement du prêt en cas d'incapacité de travail ou de décès.",
  "visite": "La visite d'un bien immobilier est une étape cruciale. Vérifiez : l'état général du bien, l'isolation, l'exposition, les nuisances potentielles, l'état des installations (électricité, plomberie), et les diagnostics obligatoires. N'hésitez pas à poser des questions au vendeur ou à l'agent immobilier.",
  "offre": "L'offre d'achat doit être rédigée par écrit et inclure : le prix proposé, les conditions suspensives (obtention du prêt, vente d'un autre bien), le délai de validité, et les modalités de paiement. Elle peut être accompagnée d'un chèque de garantie de 5-10% du prix.",
  "compromis": "Le compromis de vente est un contrat qui engage acheteur et vendeur. Il précise : le prix, les conditions suspensives, la date de signature de l'acte définitif, et les modalités de paiement. L'acheteur dispose d'un délai de rétractation de 10 jours.",
  "acte": "L'acte authentique de vente est signé chez le notaire. Il transfère la propriété du bien et fixe définitivement les conditions de la vente. Les frais de notaire sont payés à cette occasion. Le notaire vérifie également la régularité de la transaction et enregistre la vente.",
  "diagnostics": "Les diagnostics immobiliers obligatoires incluent : le DPE (performance énergétique), l'amiante, le plomb, les termites, l'électricité, le gaz, et les risques naturels. Ils doivent être fournis par le vendeur et sont valables entre 3 et 10 ans selon le type.",
  "dpe": "Le Diagnostic de Performance Énergétique (DPE) évalue la consommation énergétique d'un logement et son impact environnemental. Depuis juillet 2021, il est plus fiable et opposable. Les logements sont classés de A (très performant) à G (peu performant).",
  "estimation": "L'estimation d'un bien immobilier prend en compte plusieurs critères : la localisation, la surface, l'état du bien, les équipements, les diagnostics, et les prix du marché local. Elle peut être réalisée par un agent immobilier, un expert ou via des outils en ligne.",
  "mandat": "Le mandat de vente est le contrat qui lie le vendeur à l'agent immobilier. Il peut être exclusif (un seul agent) ou simple (plusieurs agents). Il précise la durée, le prix de vente souhaité, et les conditions de rémunération de l'agent.",
  "annonce": "Une annonce immobilière doit inclure : le prix, la surface, le nombre de pièces, la localisation, les photos, et les diagnostics obligatoires. Elle doit être claire et précise pour attirer les acheteurs potentiels.",
  "visite virtuelle": "La visite virtuelle permet de découvrir un bien à distance. Elle peut être réalisée via des photos 360°, une vidéo, ou une visite en direct par visioconférence. C'est un outil utile pour un premier tri avant les visites physiques.",
  "négociation": "La négociation immobilière doit être préparée : étudiez le marché local, comparez les prix, identifiez les points forts et faibles du bien, et fixez-vous une fourchette de prix. Soyez prêt à justifier votre offre et à faire des compromis.",
  "frais vente": "Les frais de vente immobilière incluent : la commission d'agence (4-8% du prix), les diagnostics obligatoires, les frais de notaire, et éventuellement des frais de rénovation ou de mise en valeur du bien. Ces frais sont généralement à la charge du vendeur.",
  "ptz": "Le Prêt à Taux Zéro (PTZ) est un prêt sans intérêts, accordé sous conditions de ressources pour l'achat d'une première résidence principale. Il peut financer jusqu'à 40% du prix d'acquisition selon la zone géographique et doit être complété par d'autres prêts.",
  "pinel": "La loi Pinel permet de bénéficier d'une réduction d'impôt pour l'investissement locatif dans le neuf, en contrepartie d'un engagement de location à un loyer plafonné pendant 6, 9 ou 12 ans. L'avantage fiscal peut atteindre jusqu'à 21% du prix d'achat.",
  "plus value": "La plus-value immobilière est la différence entre le prix de vente et le prix d'achat d'un bien. Pour les résidences principales, elle est totalement exonérée d'impôt. Pour les résidences secondaires, l'impôt diminue avec la durée de détention (exonération totale après 22 ans pour l'impôt sur le revenu).",
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
  const lowerCaseMessage = message.toLowerCase().trim();
  
  // Si le message est vide ou trop court, donner une réponse d'accueil
  if (!lowerCaseMessage || lowerCaseMessage.length < 2) {
    return "Bonjour ! Je suis Fabi, votre assistant immobilier. Je peux vous renseigner sur l'achat, la vente, la location, le financement immobilier et bien d'autres sujets. Posez-moi une question !";
  }
  
  // Dictionnaire simple de termes immobiliers courants pour répondre aux requêtes d'un seul mot
  const singleWordResponses: Record<string, string> = {
    "maison": "L'achat d'une maison implique plusieurs étapes : définir votre budget, obtenir un prêt, visiter des biens, faire une offre, signer un compromis puis l'acte définitif. Pour les maisons, vérifiez particulièrement l'état de la toiture, de l'isolation, et la présence de nuisibles. Souhaitez-vous en savoir plus sur un aspect particulier ?",
    "appartement": "L'achat d'un appartement nécessite de vérifier le règlement de copropriété, les charges, les travaux prévus et le DPE. Attention aux nuisances sonores et à la qualité des parties communes. En copropriété, vous possédez votre lot et une quote-part des parties communes. Que souhaitez-vous savoir sur les appartements ?",
    "terrain": "L'achat d'un terrain constructible requiert de vérifier le PLU (Plan Local d'Urbanisme), les servitudes, la viabilité (raccordements eau, électricité, etc.) et la nature du sol. Une étude de sol est recommandée avant tout projet de construction. Avez-vous un projet de construction ?",
    "hypothèque": "L'hypothèque est une garantie prise par la banque sur votre bien immobilier. En cas de non-remboursement du prêt, la banque peut saisir et vendre le bien. C'est une garantie courante mais qui engendre des frais (1-2% du montant emprunté). Une alternative moins coûteuse est le privilège de prêteur de deniers (PPD).",
    "banque": "Pour obtenir le meilleur prêt immobilier, comparez plusieurs offres bancaires. Les taux varient selon votre profil, votre apport (idéalement 10-20% du prix), et la durée du prêt. Pensez aussi aux frais de dossier et de garantie. Souhaitez-vous des conseils pour négocier votre prêt ?",
    "notaire": "Le notaire joue un rôle essentiel dans les transactions immobilières : il vérifie la légalité de la vente, rédige les actes, collecte les taxes, et assure la publication au service de publicité foncière. Ses honoraires sont réglementés et représentent environ 1% du prix de vente (hors droits d'enregistrement).",
    "impôts": "L'immobilier implique plusieurs impôts : taxe foncière (payée par le propriétaire), taxe d'habitation (en cours de suppression pour les résidences principales), imposition des revenus locatifs, et impôt sur les plus-values immobilières (lors de la revente, avec exonération pour la résidence principale).",
    "succession": "La transmission immobilière par succession est soumise aux droits de succession, avec un abattement de 100 000€ par enfant. La SCI peut faciliter la transmission et réduire les frais. Les donations de son vivant permettent également de réduire la charge fiscale. Souhaitez-vous plus d'informations sur la planification successorale ?",
    "diagnostics": "Les diagnostics immobiliers obligatoires incluent : le DPE (performance énergétique), l'amiante, le plomb, les termites (selon zone), l'électricité et le gaz (si installations de plus de 15 ans), et les risques naturels. Ils doivent être fournis par le vendeur et sont valables entre 3 et 10 ans selon le type.",
    "agence": "Les agences immobilières prennent généralement une commission de 4-8% du prix de vente, payée par le vendeur (parfois négociable). Elles offrent plusieurs services : estimation, photos, annonces, visites, négociation, suivi juridique. Le mandat peut être exclusif (un seul agent) ou simple (plusieurs agents).",
    "loyer": "Le loyer est fixé librement lors de la première location, mais son augmentation est ensuite encadrée par l'IRL (Indice de Référence des Loyers). Dans certaines zones tendues, les loyers sont plafonnés. Le dépôt de garantie est limité à 1 mois de loyer (2 mois pour les locations meublées).",
    "taux": "Les taux d'intérêt immobiliers varient selon la durée du prêt, votre profil, et la conjoncture économique. Actuellement, ils se situent entre 3% et 4% environ pour un prêt sur 20-25 ans. N'hésitez pas à comparer plusieurs offres et à négocier. Voulez-vous des conseils pour obtenir le meilleur taux ?",
    "travaux": "Avant d'entreprendre des travaux, établissez un budget précis, vérifiez si des autorisations sont nécessaires (permis, déclaration préalable), et privilégiez des artisans avec une garantie décennale. Certains travaux de rénovation énergétique peuvent bénéficier d'aides comme MaPrimeRénov' ou l'éco-prêt à taux zéro.",
    "cadastre": "Le plan cadastral est un document administratif qui répertorie les propriétés foncières par parcelles. Il permet d'identifier les limites de votre terrain et peut être consulté gratuitement sur le site cadastre.gouv.fr. Le cadastre sert notamment pour calculer les impôts fonciers et vérifier les servitudes.",
    "servitude": "Une servitude est une charge imposée à une propriété (fonds servant) au profit d'une autre propriété (fonds dominant), comme un droit de passage. Elle peut être légale, conventionnelle ou naturelle. Les servitudes doivent être mentionnées dans l'acte de vente et peuvent affecter la valeur du bien.",
    "défiscalisation": "La défiscalisation immobilière permet de réduire vos impôts via des investissements immobiliers. Les principaux dispositifs sont la loi Pinel (réduction d'impôt jusqu'à 21% en neuf), le LMNP (amortissement du bien), le déficit foncier (imputation sur le revenu global) et la loi Malraux (rénovation en secteur sauvegardé)."
  };
  
  // Vérifier si le message correspond à un mot clé du dictionnaire de mots simples
  if (singleWordResponses[lowerCaseMessage]) {
    return singleWordResponses[lowerCaseMessage];
  }
  
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
    { key: "viager" as keyof typeof fallbackResponses, keywords: ["viager", "rente", "viagère", "bouquet", "occupé", "libre", "espérance de vie"] },
    { key: "frais agence" as keyof typeof fallbackResponses, keywords: ["frais d'agence", "commission agence", "frais agence", "commission immobilière", "frais immobiliers", "honoraires agence"] },
    { key: "frais notaire" as keyof typeof fallbackResponses, keywords: ["frais de notaire", "notaire", "honoraires notaire", "droits d'enregistrement", "taxe notaire"] },
    { key: "frais annexes" as keyof typeof fallbackResponses, keywords: ["frais annexes", "frais supplémentaires", "frais cachés", "frais dossier", "frais de garantie", "frais d'hypothèque"] },
    { key: "apport" as keyof typeof fallbackResponses, keywords: ["apport", "apport personnel", "apport initial", "apport minimum", "apport requis", "apport nécessaire"] },
    { key: "taux endettement" as keyof typeof fallbackResponses, keywords: ["taux d'endettement", "capacité d'emprunt", "ratio d'endettement", "endettement maximum", "35%", "mensualités"] },
    { key: "durée prêt" as keyof typeof fallbackResponses, keywords: ["durée du prêt", "durée emprunt", "durée de remboursement", "longueur prêt", "25 ans", "30 ans"] },
    { key: "garantie" as keyof typeof fallbackResponses, keywords: ["garantie", "hypothèque", "ppd", "privilège prêteur", "caution", "garantie prêt"] },
    { key: "assurance" as keyof typeof fallbackResponses, keywords: ["assurance", "assurance habitation", "assurance emprunteur", "assurance prêt", "assurance décès", "assurance invalidité"] },
    { key: "visite" as keyof typeof fallbackResponses, keywords: ["visite", "visiter", "visite bien", "visite appartement", "visite maison", "inspection"] },
    { key: "offre" as keyof typeof fallbackResponses, keywords: ["offre", "offre d'achat", "proposition", "proposer", "faire une offre", "chèque de garantie"] },
    { key: "acte" as keyof typeof fallbackResponses, keywords: ["acte", "acte authentique", "signature acte", "acte de vente", "signature chez notaire", "acte définitif"] },
    { key: "estimation" as keyof typeof fallbackResponses, keywords: ["estimation", "estimer", "valeur", "prix marché", "évaluation", "expertise"] },
    { key: "mandat" as keyof typeof fallbackResponses, keywords: ["mandat", "mandat de vente", "mandat exclusif", "mandat simple", "agent immobilier", "représentation"] },
    { key: "annonce" as keyof typeof fallbackResponses, keywords: ["annonce", "publication", "mettre en vente", "publicité", "photos", "description"] },
    { key: "visite virtuelle" as keyof typeof fallbackResponses, keywords: ["visite virtuelle", "visite en ligne", "visio", "visioconférence", "360°", "photos 360"] },
    { key: "négociation" as keyof typeof fallbackResponses, keywords: ["négociation", "négocier", "marchander", "discuter prix", "réduire", "barguigner"] },
    { key: "frais vente" as keyof typeof fallbackResponses, keywords: ["frais de vente", "coût vente", "dépenses vente", "frais rénovation", "mise en valeur", "frais marketing"] }
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
  
  // Si le message est très court (1-3 mots) mais pas dans notre liste, essayer de deviner l'intention
  if (lowerCaseMessage.split(/\s+/).length <= 3) {
    // Liste de termes immobiliers courants pour tenter de comprendre le thème
    const immobilierThemes = [
      { theme: "achat", termes: ["acheter", "acquisition", "acquéreur", "promesse", "compromis"] },
      { theme: "vente", termes: ["vendre", "vendeur", "céder", "aliéner", "cession"] },
      { theme: "location", termes: ["louer", "loyer", "bail", "locataire", "propriétaire", "bailleur"] },
      { theme: "financement", termes: ["prêt", "crédit", "banque", "emprunt", "taux", "mensualité"] },
      { theme: "fiscalité", termes: ["impôt", "taxe", "fiscal", "défiscalisation", "imposition"] },
      { theme: "construction", termes: ["construire", "bâtir", "maison", "architecte", "terrain"] },
      { theme: "rénovation", termes: ["rénover", "travaux", "aménagement", "réhabiliter"] }
    ];
    
    // Chercher si un des mots du message correspond à un thème immobilier
    for (const { theme, termes } of immobilierThemes) {
      if (termes.some(terme => lowerCaseMessage.includes(terme))) {
        return `Je vois que vous vous intéressez à la ${theme} immobilière. Pour vous apporter une réponse précise, pourriez-vous formuler votre question de manière plus détaillée ? Par exemple: "Quelles sont les étapes pour ${theme === 'achat' ? 'acheter un bien' : theme === 'vente' ? 'vendre mon appartement' : theme === 'location' ? 'louer un bien' : theme === 'financement' ? 'financer mon projet' : theme === 'fiscalité' ? 'optimiser la fiscalité' : theme === 'construction' ? 'construire une maison' : 'rénover un logement'}?"`;
      }
    }
    
    // Si c'est juste un terme immobilier isolé, donner une réponse générique sur ce terme
    return `Vous avez mentionné "${lowerCaseMessage}". Ce terme est lié à l'immobilier. Pour vous donner une information précise, pourriez-vous me poser une question complète incluant ce terme ? Je suis là pour vous aider sur tous les aspects de l'immobilier : achat, vente, location, financement, réglementation, etc.`;
  }
  
  // Si aucun mot clé ne correspond, utiliser la réponse par défaut
  return fallbackResponses.default;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // Si le message est manquant ou vide, répondre avec un message d'accueil
    if (!message || message.trim() === '') {
      const welcomeMessage = "Bonjour ! Je suis Fabi, votre assistant immobilier. Je peux vous aider sur divers sujets liés à l'immobilier : achat, vente, location, financement, fiscalité... Comment puis-je vous aider aujourd'hui ?";
      return NextResponse.json({ response: welcomeMessage }, { status: 200 });
    }
    
    // Récupérer la session d'authentification
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    
    // Récupérer ou créer une session de chat
    const chatSession = await getOrCreateChatSession(userId);
    
    if (!chatSession) {
      console.error("Erreur: Impossible de créer ou récupérer une session de chat");
      // Répondre même en cas d'erreur de session
      return NextResponse.json(
        { response: "Je suis là pour vous aider avec vos questions immobilières. Comment puis-je vous accompagner aujourd'hui ?" },
        { status: 200 }
      );
    }
    
    try {
      // Enregistrer le message de l'utilisateur
      await saveMessage(chatSession.id, message, "user");
    } catch (dbError) {
      console.error("Erreur lors de l'enregistrement du message utilisateur:", dbError);
      // Continuer malgré l'erreur pour ne pas bloquer l'interaction
    }

    // Vérifier si OpenAI est configuré
    if (!openai) {
      console.log("Mode de secours activé - OpenAI n'est pas configuré");
      const fallbackResponse = getFallbackResponse(message);
      
      try {
        // Enregistrer la réponse du bot
        await saveMessage(chatSession.id, fallbackResponse, "bot");
      } catch (saveError) {
        console.error("Erreur lors de l'enregistrement de la réponse du bot:", saveError);
        // Continuer malgré l'erreur
      }
      
      return NextResponse.json({ response: fallbackResponse }, { status: 200 });
    }

    try {
      // Faire une recherche web pour enrichir la réponse
      let searchResults = [];
      try {
        searchResults = await searchWeb(message);
      } catch (searchError) {
        console.error("Erreur lors de la recherche web:", searchError);
        // Continuer sans les résultats de recherche
      }
      
      // Préparer le contexte avec les résultats de recherche
      let searchContext = "";
      if (searchResults && searchResults.length > 0) {
        searchContext = "Informations trouvées sur le web :\n\n";
        searchResults.slice(0, 3).forEach((result: any, index: number) => {
          if (result && result.title && result.snippet) {
            searchContext += `${index + 1}. ${result.title}\n${result.snippet}\nSource: ${result.link || "N/A"}\n\n`;
          }
        });
      }
      
      // Préparer les messages précédents pour le contexte
      let contextMessages: ChatCompletionMessageParam[] = [];
      try {
        const previousMessages: ChatCompletionMessageParam[] = 
          chatSession.messages && Array.isArray(chatSession.messages) 
            ? chatSession.messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant" as const,
                content: msg.content || ""
              }))
            : [];
        
        // Limite à un maximum de 10 messages précédents pour éviter des coûts trop élevés
        contextMessages = previousMessages.slice(-10);
      } catch (contextError) {
        console.error("Erreur lors de la préparation du contexte:", contextError);
        // Continuer sans contexte si erreur
      }
      
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
11. Si la question est très courte ou un seul mot, donne quand même une réponse complète et précise sur ce sujet immobilier.

${realEstateContext}` 
        },
        ...contextMessages,
        {
          role: "user" as const,
          content: searchContext ? `Question: ${message}\n\n${searchContext}` : message
        }
      ];

      // Obtenir une réponse de l'API OpenAI
      try {
        const chatResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
        });

        const responseText = chatResponse.choices[0]?.message?.content?.trim();

        // Si la réponse est vide ou invalide
        if (!responseText) {
          throw new Error("Réponse vide ou invalide de l'API");
        }
        
        // Enregistrer la réponse du bot
        try {
          await saveMessage(chatSession.id, responseText, "bot");
        } catch (saveError) {
          console.error("Erreur lors de l'enregistrement de la réponse du bot:", saveError);
          // Continuer malgré l'erreur de sauvegarde
        }

        return NextResponse.json({ response: responseText }, { status: 200 });
      } catch (openaiApiError) {
        console.error("Erreur lors de l'appel à l'API OpenAI:", openaiApiError);
        throw openaiApiError; // Remonter l'erreur pour le fallback
      }
    } catch (openaiError) {
      console.error("Erreur OpenAI:", openaiError);
      // Fallback en cas d'erreur OpenAI
      const fallbackResponse = getFallbackResponse(message);
      
      // Essayer d'enregistrer la réponse fallback du bot
      try {
        await saveMessage(chatSession.id, fallbackResponse, "bot");
      } catch (saveError) {
        console.error("Erreur lors de l'enregistrement de la réponse fallback:", saveError);
        // Continuer malgré l'erreur
      }
      
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