import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/auth.config";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer la session d'authentification
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    
    // Récupérer l'ID de session du cookie
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("chatSessionId")?.value;
    
    // Si aucun identifiant n'est disponible, retourner un tableau vide
    if (!userId && !sessionId) {
      return NextResponse.json({ messages: [] }, { status: 200 });
    }
    
    // Rechercher la session de chat
    const chatSession = await prisma.chatSession.findFirst({
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
    
    // Si aucune session n'est trouvée, retourner un tableau vide
    if (!chatSession) {
      return NextResponse.json({ messages: [] }, { status: 200 });
    }
    
    // Retourner les messages
    return NextResponse.json({ messages: chatSession.messages }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique des conversations:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération de l'historique" },
      { status: 500 }
    );
  }
} 