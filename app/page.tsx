"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [choix, setChoix] = useState<null | 'achat' | 'vente'>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
      {/* Header */}
      <header className="bg-[#0f3460] py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">ImmoNova</h1>
          <p className="text-sm text-gray-300">Votre partenaire pour un investissement immobilier réussi</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Choix initial */}
        {!choix && (
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Bienvenue sur ImmoNova</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Que vous souhaitiez acheter ou vendre un bien immobilier, nos outils innovants sont là pour vous accompagner à chaque étape</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
              <button 
                onClick={() => setChoix('achat')}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2980b9] to-[#3498db] p-1 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3498db]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 bg-[#1a1a2e]/30 rounded-xl p-6 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 flex items-center justify-center mb-4 bg-[#3498db] rounded-full shadow-lg text-4xl transform transition-transform group-hover:rotate-6 group-hover:scale-110">
                    🏠
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Acheter un bien</h3>
                  <p className="text-gray-200">Trouvez le logement idéal qui répond à vos besoins et vos envies</p>
                  <div className="mt-6 bg-white/20 rounded-full px-6 py-2 text-white font-medium flex items-center gap-2 group-hover:bg-white/30 transition-all duration-300">
                    Explorer
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => setChoix('vente')}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#c0392b] to-[#e74c3c] p-1 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e74c3c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 bg-[#1a1a2e]/30 rounded-xl p-6 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 flex items-center justify-center mb-4 bg-[#e74c3c] rounded-full shadow-lg text-4xl transform transition-transform group-hover:rotate-6 group-hover:scale-110">
                    💰
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Vendre un bien</h3>
                  <p className="text-gray-200">Valorisez et commercialisez votre propriété au meilleur prix</p>
                  <div className="mt-6 bg-white/20 rounded-full px-6 py-2 text-white font-medium flex items-center gap-2 group-hover:bg-white/30 transition-all duration-300">
                    Explorer
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Parcours Achat */}
        {choix === 'achat' && (
          <div className="w-full">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setChoix(null)} 
                className="flex items-center text-[#3498db] hover:underline"
              >
                <span className="mr-1">←</span> Retour
              </button>
              <h2 className="text-2xl font-bold ml-4">Services pour les acheteurs</h2>
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
          <div className="w-full">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setChoix(null)} 
                className="flex items-center text-[#e74c3c] hover:underline"
              >
                <span className="mr-1">←</span> Retour
              </button>
              <h2 className="text-2xl font-bold ml-4">Services pour les vendeurs</h2>
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
    </main>
  );
}

function MenuButton({ title, desc, href, icon, color }) {
  return (
    <Link 
      href={href}
      style={{ borderColor: color }}
      className="bg-[#162447] rounded-md border-l-4 p-4 flex flex-col gap-1 hover:bg-[#1f4068] transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      {desc && <p className="text-xs text-gray-400 pl-9">{desc}</p>}
    </Link>
  );
}

