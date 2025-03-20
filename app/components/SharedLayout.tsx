"use client";

import Link from 'next/link';
import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Footer from './Footer';

interface SharedLayoutProps {
  children: ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-[#eef6ff] text-black">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <Link href="/" className="hover:opacity-80">
              <span className="text-xl font-bold text-indigo-700">ImmoNova</span>
              <span className="block text-sm text-gray-500">Votre partenaire pour un investissement immobilier réussi</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-indigo-700">Accueil</Link>
          </nav>
          
          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/profil"
                className="text-gray-700 hover:text-indigo-700"
              >
                {session.user?.name}
              </Link>
              <button 
                onClick={() => signOut()}
                className="border-2 border-indigo-700 text-indigo-700 px-6 py-2 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link 
              href="/connexion"
              className="border-2 border-indigo-700 text-indigo-700 px-6 py-2 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300"
            >
              Connexion
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 