"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [choix, setChoix] = useState<null | 'achat' | 'vente'>(null);

  return (
    <>
      {/* Content */}
      <div>
        {/* Choix initial */}
        {!choix && (
          <div className="grid md:grid-cols-2 gap-12 items-center py-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Bienvenue sur <span className="text-[#42b983]">ImmoNova</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Que vous souhaitiez acheter ou vendre un bien immobilier, nos outils innovants sont là pour vous accompagner à chaque étape
              </p>
              
              <div className="grid grid-cols-1 gap-6 mb-12">
                <button 
                  onClick={() => setChoix('achat')}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all text-left w-full cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                      🏠
                    </div>
                    <h3 className="text-xl font-semibold">Acheter un bien</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Trouvez le logement idéal qui répond à vos besoins et vos envies</p>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    Explorer
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </button>
                
                <button 
                  onClick={() => setChoix('vente')}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-all text-left w-full cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                      💰
                    </div>
                    <h3 className="text-xl font-semibold">Vendre un bien</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Valorisez et commercialisez votre propriété au meilleur prix</p>
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    Explorer
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative">
              {/* Main house image with circular border */}
              <div className="relative h-[500px] w-full rounded-full overflow-hidden">
                <div className="absolute inset-0 border-[20px] border-[#e1fae8] rounded-full z-10"></div>
                <div className="absolute inset-0 bg-cover bg-center rounded-full" style={{ backgroundImage: 'url("/img/famille-heureuse.jpg")' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Parcours Achat */}
        {choix === 'achat' && (
          <div className="w-full bg-white rounded-xl shadow-lg p-8 mt-8">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setChoix(null)} 
                className="flex items-center text-indigo-700 hover:underline"
              >
                <span className="mr-1">←</span> Retour
              </button>
              <h2 className="text-2xl font-bold ml-4 text-gray-800">Services pour les acheteurs</h2>
            </div>
            <div className="p-8 text-center">
              <p className="text-xl text-gray-600">
                Vous avez choisi d'acheter un bien immobilier.<br />
                Notre équipe est à votre disposition pour vous accompagner dans votre projet.
              </p>
            </div>
          </div>
        )}

        {/* Parcours Vente */}
        {choix === 'vente' && (
          <div className="w-full bg-white rounded-xl shadow-lg p-8 mt-8">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setChoix(null)} 
                className="flex items-center text-red-500 hover:underline"
              >
                <span className="mr-1">←</span> Retour
              </button>
              <h2 className="text-2xl font-bold ml-4 text-gray-800">Services pour les vendeurs</h2>
            </div>
            <div className="p-8 text-center">
              <p className="text-xl text-gray-600">
                Vous avez choisi de vendre un bien immobilier.<br />
                Notre équipe est à votre disposition pour vous accompagner dans votre projet.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function MenuButton({ title, desc, href, icon, color }: { 
  title: string; 
  desc?: string; 
  href: string; 
  icon: React.ReactNode; 
  color: string;
}) {
  return (
    <Link 
      href={href}
      style={{ borderColor: color }}
      className="bg-white border rounded-md border-l-4 p-4 flex flex-col gap-1 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      {desc && <p className="text-xs text-gray-400 pl-9">{desc}</p>}
    </Link>
  );
}

