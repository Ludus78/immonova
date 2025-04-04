import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    const { type, url } = data;

    if (!type || !url) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const simulation = await prisma.simulation.create({
      data: {
        type,
        url,
        date: new Date(),
        userId: user.id
      }
    });

    return NextResponse.json(simulation);
  } catch (error) {
    console.error('Error saving simulation:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 