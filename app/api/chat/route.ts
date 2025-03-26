import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

// Messages de secours en cas d'échec de l'API
const fallbackResponses = {
  default: "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants ou contacter notre équipe pour obtenir de l'aide.",
  
  // Réponses par mots-clés
  prix: "Les prix immobiliers varient selon la localisation, la taille et l'état du bien. En 2024, le prix moyen en France est d'environ 3400€/m² pour un appartement.",
  
  achat: "Pour acheter un bien immobilier, commencez par définir votre budget, obtenez une pré-approbation de prêt, visitez plusieurs biens, et faites une offre avec l'aide d'un professionnel.",
  
  vente: "Pour vendre votre bien, estimez son prix correctement, préparez-le pour les visites, rassemblez les diagnostics obligatoires, et envisagez l'aide d'un agent immobilier pour la commercialisation.",
  
  locatif: "L'investissement locatif permet de générer des revenus réguliers et de se constituer un patrimoine. La rentabilité moyenne se situe entre 3% et 7% selon la localisation et le type de bien.",
  
  ptz: "Le Prêt à Taux Zéro (PTZ) est un prêt sans intérêts pour l'achat d'un premier logement neuf ou à rénover. Il est soumis à des conditions de ressources et varie selon la zone géographique."
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return Response.json({ 
        success: false,
        error: "Je n'ai pas compris votre question. Pourriez-vous la reformuler ?" 
      }, { status: 200 });
    }
    
    console.log("Message reçu:", message);

    if (!process.env.CLAUDE_API_KEY) {
      console.warn("Clé API Claude non configurée, utilisation d'une réponse de secours");
      return Response.json({ 
        success: true,
        response: getFallbackResponse(message)
      }, { status: 200 });
    }

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1500,
        system: "Tu es un assistant Français spécialisé en immobilier. Tu apportes des réponses précises, professionnelles et utiles sur tous les sujets liés à l'immobilier en France (achat, vente, location, investissement, financement, réglementation, etc.). Tu es poli et concis. Si tu ne peux pas répondre à une question, dis-le honnêtement.",
        messages: [
          {"role": "user", "content": message}
        ]
      });

      if (!response || !response.content || !Array.isArray(response.content)) {
        throw new Error('Format de réponse invalide');
      }

      const textContent = response.content.find(content => content.type === 'text')?.text;
      if (!textContent) {
        throw new Error('Pas de contenu textuel dans la réponse');
      }

      return Response.json({ 
        success: true,
        response: textContent 
      }, { status: 200 });
    } catch (apiError) {
      console.error("Erreur API Claude:", apiError);
      return Response.json({ 
        success: true,
        response: getFallbackResponse(message)
      }, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur générale dans l'API chat:", error);
    return Response.json({ 
      success: false,
      error: fallbackResponses.default 
    }, { status: 200 });
  }
}

// Fonction pour obtenir une réponse de secours basée sur les mots-clés
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif')) {
    return fallbackResponses.prix;
  }
  
  if (lowerMessage.includes('achat') || lowerMessage.includes('acheter') || lowerMessage.includes('acquérir')) {
    return fallbackResponses.achat;
  }
  
  if (lowerMessage.includes('vente') || lowerMessage.includes('vendre')) {
    return fallbackResponses.vente;
  }
  
  if (lowerMessage.includes('locatif') || lowerMessage.includes('location') || lowerMessage.includes('louer')) {
    return fallbackResponses.locatif;
  }
  
  if (lowerMessage.includes('ptz') || lowerMessage.includes('prêt à taux zéro')) {
    return fallbackResponses.ptz;
  }
  
  return "Je comprends votre question, mais je ne peux pas y répondre pour le moment. Pourriez-vous la reformuler ou me poser une question sur un autre aspect de l'immobilier ?";
}