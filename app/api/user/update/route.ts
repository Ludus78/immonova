import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/auth.config";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Le nom est requis" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        name
      }
    });

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      user: {
        name: updatedUser.name,
        email: updatedUser.email
      }
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
} 