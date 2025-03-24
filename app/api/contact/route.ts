import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration du transporteur d'email
// Pour production, utilisez vos propres informations SMTP
// Pour le développement, vous pouvez utiliser un service comme Mailtrap, Gmail, etc.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
});

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const { name, email, phone, subject, message, propertyType, budget } = await request.json();

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Vérification de format d'email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Composition du message
    let emailContent = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;

    if (phone) {
      emailContent += `<p><strong>Téléphone:</strong> ${phone}</p>`;
    }

    if (subject) {
      emailContent += `<p><strong>Sujet:</strong> ${subject}</p>`;
    }

    if (propertyType) {
      emailContent += `<p><strong>Type de projet:</strong> ${propertyType}</p>`;
    }

    if (budget) {
      emailContent += `<p><strong>Budget:</strong> ${budget}€</p>`;
    }

    emailContent += `
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Envoi de l'email
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'no-reply@immonova.com',
      to: process.env.EMAIL_TO || 'contact@immonova.com',
      subject: `Nouveau contact ImmoNova: ${subject || 'Demande d\'information'}`,
      html: emailContent,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    // Répondre avec un succès
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre message' },
      { status: 500 }
    );
  }
} 