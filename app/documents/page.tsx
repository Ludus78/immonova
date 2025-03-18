import Navigation from "../components/Navigation";
import { useState } from "react";

export default function Documents() {
  return (
    <div className="min-h-screen bg-[#131316] text-white">
      <Navigation />
      
      <div className="pt-20 p-8 sm:p-20">
        <section className="max-w-4xl mx-auto mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center">Checklist Documents Obligatoires</h1>
          <p className="text-xl text-gray-300 text-center mb-12">
            Générez une liste personnalisée des documents obligatoires pour la vente de votre bien.
          </p>
          
          <div className="bg-[#1e1e24] p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Caractéristiques de votre bien</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Type de bien</label>
                <select className="w-full bg-[#2a2a35] p-3 rounded-lg">
                  <option>Appartement</option>
                  <option>Maison individuelle</option>
                  <option>Terrain</option>
                  <option>Local commercial</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Année de construction</label>
                <select className="w-full bg-[#2a2a35] p-3 rounded-lg">
                  <option>Avant 1949</option>
                  <option>Entre 1949 et 1997</option>
                  <option>Entre 1997 et 2005</option>
                  <option>Après 2005</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Chauffage et énergie</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="gaz" className="mr-2" />
                    <label htmlFor="gaz">Installation gaz de plus de 15 ans</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="elec" className="mr-2" />
                    <label htmlFor="elec">Installation électrique de plus de 15 ans</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="assainissement" className="mr-2" />
                    <label htmlFor="assainissement">Assainissement non collectif</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Localisation</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="termites" className="mr-2" />
                    <label htmlFor="termites">Zone à risque termites</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="risque" className="mr-2" />
                    <label htmlFor="risque">Zone à risque naturel, technologique ou minier</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="radon" className="mr-2" />
                    <label htmlFor="radon">Zone à potentiel radon</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Situation juridique</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="copro" className="mr-2" />
                    <label htmlFor="copro">En copropriété</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="location" className="mr-2" />
                    <label htmlFor="location">Actuellement loué</label>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
                Générer ma checklist personnalisée
              </button>
            </form>
          </div>
          
          <div className="mt-10 bg-[#1e1e24] p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Documents obligatoires</h2>
            <p className="text-gray-300 mb-6">
              Complétez le formulaire ci-dessus pour obtenir votre liste personnalisée.
            </p>
            
            <div className="space-y-4">
              <div className="bg-[#2a2a35] p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-1">Titre de propriété</h3>
                <p className="text-gray-300 text-sm">Obligatoire pour toute vente</p>
              </div>
              
              <div className="bg-[#2a2a35] p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-1">Diagnostics techniques</h3>
                <p className="text-gray-300 text-sm">Obligatoire selon les caractéristiques de votre bien</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 