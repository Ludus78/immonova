import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ImmoNova",
  description: "Votre assistant immobilier intelligent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
