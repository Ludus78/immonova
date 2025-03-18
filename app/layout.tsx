import type { Metadata } from "next";
import "./globals.css";
import SharedLayout from "./components/SharedLayout";

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
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased overflow-y-auto">
        <SharedLayout>
          {children}
        </SharedLayout>
      </body>
    </html>
  );
}
