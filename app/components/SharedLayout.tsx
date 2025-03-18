"use client";

import Link from 'next/link';
import { ReactNode } from 'react';

interface SharedLayoutProps {
  children: ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
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
            <Link href="/estimation" className="hover:text-indigo-700">Estimation</Link>
            <Link href="/diagnostics" className="hover:text-indigo-700">Diagnostics</Link>
            <Link href="/professionnels" className="hover:text-indigo-700">Professionnels</Link>
            <Link href="/documents" className="hover:text-indigo-700">Documents</Link>
          </nav>
          
          <button className="border-2 border-indigo-700 text-indigo-700 px-6 py-2 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300">
            Connexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      
        {/* Search Section - Shown on all pages */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-wrap md:flex-nowrap gap-8 items-center">
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 bg-indigo-800 rounded-lg p-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span className="text-xl font-medium">Recherche</span>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#e1fae8] flex items-center justify-center text-[#42b983]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500">Localisation</p>
                  <p className="font-medium">Alès, France</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#fff4e8] flex items-center justify-center text-[#ffc47d]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500">Prix moyen</p>
                  <p className="font-medium">300€ - 650€</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[#e8f1ff] flex items-center justify-center text-[#7da9ff]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500">Type de bien</p>
                  <p className="font-medium">Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-indigo-700 mb-4">ImmoNova</h3>
            <p className="text-gray-600 mb-4">Votre partenaire pour un investissement immobilier réussi</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.956 6.293c.609-.001 1.126.21 1.524.582.443-.09.861-.26 1.237-.514.055-.03.11-.06.164-.089-.146.45-.437.83-.832 1.07l-.121.057c.405-.05.786-.152 1.143-.308l-.099.06c-.21.3-.477.566-.784.784-.083.057-.129.132-.129.229.001 3.225-2.463 6.946-6.963 6.946-1.38 0-2.668-.396-3.75-1.077.192.023.387.034.584.034 1.146 0 2.201-.388 3.036-1.038-1.067-.02-1.967-.71-2.279-1.658.149.028.303.043.461.043.223 0 .438-.03.644-.084-1.117-.225-1.953-1.21-1.953-2.391v-.031c.329.182.705.292 1.105.305-.655-.437-1.086-1.184-1.086-2.031 0-.448.12-.866.328-1.226 1.198 1.466 2.989 2.43 5.009 2.533-.041-.179-.063-.366-.063-.557 0-1.347 1.094-2.44 2.441-2.44.703 0 1.338.295 1.785.768.556-.11 1.08-.313 1.553-.594l-.183.068z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3.464 14.476h-2.31v-4.466h.77v3.695h1.54v.771zm.768-6.39H13.8v-.77h2.431v.77zm-5.031 4.23v2.16h-.77v-2.931h3.466v.77h-2.696zm.539-3.081v2.621h-.77v-2.621h-1.156v-.77H13.8v.77h-2.06zm-1.925 2.387v2.16h-.77v-2.621h1.156v-.77h-2.312v-.77h3.466v1.541h-1.54z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/estimation" className="text-gray-600 hover:text-indigo-700">Estimation</Link></li>
              <li><Link href="/diagnostics" className="text-gray-600 hover:text-indigo-700">Diagnostics</Link></li>
              <li><Link href="/mise-en-valeur" className="text-gray-600 hover:text-indigo-700">Mise en valeur</Link></li>
              <li><Link href="/professionnels" className="text-gray-600 hover:text-indigo-700">Professionnels</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Outils</h4>
            <ul className="space-y-2">
              <li><Link href="/frais-annexes" className="text-gray-600 hover:text-indigo-700">Frais annexes</Link></li>
              <li><Link href="/ecoles" className="text-gray-600 hover:text-indigo-700">Écoles à proximité</Link></li>
              <li><Link href="/espaces-verts" className="text-gray-600 hover:text-indigo-700">Espaces verts</Link></li>
              <li><Link href="/documents" className="text-gray-600 hover:text-indigo-700">Documents</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Contact</h4>
            <p className="text-gray-600 mb-2">123 Avenue des Immobiliers</p>
            <p className="text-gray-600 mb-2">75001 Paris, France</p>
            <p className="text-gray-600 mb-2">contact@immonova.fr</p>
            <p className="text-gray-600">+33 1 23 45 67 89</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          © 2024 ImmoNova. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
} 