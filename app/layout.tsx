import type { Metadata } from "next";
import "./globals.css";
import SharedLayout from "./components/SharedLayout";
import { AuthProvider } from "./providers/AuthProvider";

export const metadata: Metadata = {
  title: "ImmoNova - Votre partenaire immobilier",
  description: "ImmoNova vous accompagne dans tous vos projets immobiliers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased overflow-y-auto">
        <AuthProvider>
          <SharedLayout>
            {children}
          </SharedLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
