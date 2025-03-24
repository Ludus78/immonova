"use client";

import Link from 'next/link';
import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

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
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80">
              <div className="mr-2 text-2xl text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-indigo-700">ImmoNova</span>
                <span className="block text-sm text-gray-500">Votre partenaire pour un investissement immobilier réussi</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {/* Le lien Accueil a été supprimé */}
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
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
} 