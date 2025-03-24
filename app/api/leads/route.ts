import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, calculatorType, acceptNewsletter } = await request.json();

    if (!email || !calculatorType) {
      return NextResponse.json(
        { error: 'Email et type de calculette requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingLead = await prisma.lead.findUnique({
      where: { email },
    });

    if (existingLead) {
      // Récupérer les calculettes existantes et ajouter la nouvelle
      const calculatorsUsed = JSON.parse(existingLead.calculatorsUsed || '[]');
      if (!calculatorsUsed.includes(calculatorType)) {
        calculatorsUsed.push(calculatorType);
      }

      // Mettre à jour les calculettes utilisées et le statut newsletter
      await prisma.lead.update({
        where: { email },
        data: {
          calculatorsUsed: JSON.stringify(calculatorsUsed),
          acceptNewsletter: acceptNewsletter ?? existingLead.acceptNewsletter,
          updatedAt: new Date(),
        },
      });
    } else {
      // Créer un nouveau lead
      await prisma.lead.create({
        data: {
          email,
          calculatorsUsed: JSON.stringify([calculatorType]),
          acceptNewsletter: acceptNewsletter ?? true,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement' },
      { status: 500 }
    );
  }
} 