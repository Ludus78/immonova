import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token requis' },
        { status: 400 }
      );
    }

    // Vérifier si le token existe et est toujours valide
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la validation du token' },
      { status: 500 }
    );
  }
} 