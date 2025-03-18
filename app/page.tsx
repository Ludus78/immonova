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
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-2xl font-bold text-indigo-800">5000+</p>
                  <p className="text-gray-600">Happy customer</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#42b983]">6000+</p>
                  <p className="text-gray-600">Property sales</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-500">200+</p>
                  <p className="text-gray-600">Award Winning</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative">
              {/* Main house image with circular border */}
              <div className="relative h-[500px] w-full rounded-full overflow-hidden">
                <div className="absolute inset-0 border-[20px] border-[#e1fae8] rounded-full z-10"></div>
                <div className="absolute inset-0 bg-[url('/hero-image.jpg')] bg-cover bg-center rounded-full"></div>
                
                {/* Pro House card */}
                <div className="absolute top-12 right-0 bg-white p-3 rounded-lg shadow-xl z-20">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-[#e1fae8] rounded-lg flex items-center justify-center text-[#42b983]">
                      🏠
                    </div>
                    <div>
                      <p className="font-medium text-sm">Pro House</p>
                      <p className="text-gray-500 text-xs">San francisco,USA</p>
                    </div>
                  </div>
                </div>
                
                {/* Progress indicators */}
                <div className="absolute top-1/4 left-0 bg-white p-3 rounded-lg shadow-xl z-20 flex items-center gap-2">
                  <div className="text-green-500">✓</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-indigo-600"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 left-0 bg-white p-3 rounded-lg shadow-xl z-20 flex items-center gap-2">
                  <div className="text-green-500">✓</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-indigo-600"></div>
                  </div>
                </div>
                
                {/* Play reel button */}
                <div className="absolute -bottom-6 right-0 z-20">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full border-2 border-indigo-700 flex items-center justify-center bg-white text-indigo-800">
                      <div className="flex flex-col items-center">
                        <p className="text-xs">Play the</p>
                        <p className="font-medium">reel</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-200 animate-ping"></div>
                  </div>
                </div>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <MenuButton
                title="Diagnostic"
                desc="Analysez l'état des biens"
                href="/diagnostic"
                icon="📊"
                color="#3498db"
              />
              <MenuButton
                title="Professionnels"
                desc="Agents et notaires recommandés"
                href="/professionnels"
                icon="👥"
                color="#9b59b6"
              />
              <MenuButton
                title="Espaces Verts"
                desc="Parcs et loisirs à proximité"
                href="/espaces-verts"
                icon="🌳"
                color="#27ae60"
              />
              <MenuButton
                title="Écoles"
                desc="Établissements scolaires"
                href="/ecoles"
                icon="🏫"
                color="#e84393"
              />
              <MenuButton
                title="Frais Annexes"
                desc="Calculez votre budget total"
                href="/frais-annexes"
                icon="🧮"
                color="#e67e22"
              />
              <MenuButton
                title="Visites Virtuelles"
                desc="Explorez sans vous déplacer"
                href="/visites"
                icon="🔍"
                color="#2c3e50"
              />
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <MenuButton
                title="Estimation"
                desc="Évaluez la valeur de votre bien"
                href="/estimation"
                icon="💰"
                color="#2ecc71"
              />
              <MenuButton
                title="Diagnostic"
                desc="Préparez vos documents légaux"
                href="/diagnostic"
                icon="📊"
                color="#3498db"
              />
              <MenuButton
                title="Professionnels"
                desc="Agents et photographes"
                href="/professionnels"
                icon="👥"
                color="#9b59b6"
              />
              <MenuButton
                title="Mise en valeur"
                desc="Optimisez l'attractivité"
                href="/amelioration"
                icon="✨"
                color="#f1c40f"
              />
              <MenuButton
                title="Frais Annexes"
                desc="Calculez votre gain net"
                href="/frais-annexes"
                icon="🧮"
                color="#e67e22"
              />
              <MenuButton
                title="Documents"
                desc="Gérez vos papiers administratifs"
                href="/documents"
                icon="📋"
                color="#16a085"
              />
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

