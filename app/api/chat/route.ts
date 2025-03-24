import { NextResponse } from "next/server";
import OpenAI from "openai";

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
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/web-search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
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
  "default": "Je suis désolé, je ne peux pas vous fournir une réponse détaillée pour le moment. Pourriez-vous reformuler votre question ou contacter directement notre équipe ?"
};

function getFallbackResponse(message: string): string {
  const lowerCaseMessage = message.toLowerCase();
  
  // Rechercher des mots clés dans le message
  for (const [keyword, response] of Object.entries(fallbackResponses)) {
    if (lowerCaseMessage.includes(keyword)) {
      return response;
    }
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

    // Vérifier si OpenAI est configuré
    if (!openai) {
      console.log("Mode de secours activé - OpenAI n'est pas configuré");
      const fallbackResponse = getFallbackResponse(message);
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

      // Obtenir une réponse de l'API OpenAI
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: `Tu es Fabi, un assistant immobilier sympathique et serviable. Tu réponds aux questions des utilisateurs sur l'immobilier, l'achat, la vente, et les conseils liés au domaine. Tu es concis et précis dans tes réponses. Utilise les informations du web quand elles sont disponibles pour répondre précisément.` 
          },
          {
            role: "user",
            content: searchContext ? `Question: ${message}\n\n${searchContext}` : message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const responseText = chatResponse.choices[0].message.content;

      // Si la réponse est vide (peu probable mais possible)
      if (!responseText) {
        throw new Error("Réponse vide de l'API");
      }

      return NextResponse.json({ response: responseText }, { status: 200 });
    } catch (openaiError) {
      console.error("Erreur OpenAI:", openaiError);
      // Fallback en cas d'erreur OpenAI
      const fallbackResponse = getFallbackResponse(message);
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