import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

// Fonction pour hacher le mot de passe avec un sel
const hashPassword = (password: string): string => {
  // Générer un sel aléatoire
  const salt = crypto.randomBytes(16).toString('hex');
  // Hacher le mot de passe avec le sel en utilisant scrypt
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  // Stocker à la fois le sel et le hachage
  return `${salt}:${hash}`;
};

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token et mot de passe requis' },
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

    // Hacher le nouveau mot de passe
    const hashedPassword = hashPassword(password);

    // Mettre à jour le mot de passe et supprimer le token de réinitialisation
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du mot de passe' },
      { status: 500 }
    );
  }
} 