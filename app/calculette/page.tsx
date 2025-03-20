"use client";

import { useState } from 'react';

export default function Calculette() {
  const [revenuMensuel, setRevenuMensuel] = useState<number>(0);
  const [revenuConjoint, setRevenuConjoint] = useState<number>(0);
  const [apport, setApport] = useState<number>(0);
  const [duree, setDuree] = useState<number>(25);
  const [tauxInteret, setTauxInteret] = useState<number>(3.5);
  const [fraisNotaire, setFraisNotaire] = useState<number>(8);
  const [fraisAgence, setFraisAgence] = useState<number>(5);
  const [fraisDossier, setFraisDossier] = useState<number>(1000);
  const [fraisTravaux, setFraisTravaux] = useState<number>(0);
  
  // Calculer le montant empruntable
  const capaciteEmprunt = () => {
    const revenuTotal = revenuMensuel + revenuConjoint;
    const mensualiteMax = revenuTotal * 0.35; // 35% des revenus maximum
    
    // Formule: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    // M = mensualité, P = principal (montant emprunté), r = taux d'intérêt mensuel, n = nombre de mensualités
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombreMensualites = duree * 12;
    
    const numerateur = tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites);
    const denominateur = Math.pow(1 + tauxMensuel, nombreMensualites) - 1;
    
    // Résoudre P = M * [(1+r)^n - 1] / [r(1+r)^n]
    const montantEmpruntable = mensualiteMax * (denominateur / numerateur);
    
    return Math.round(montantEmpruntable);
  };
  
  // Calculer le budget total incluant l'apport
  const budgetTotal = capaciteEmprunt() + apport;
  
  // Calculer le prix d'achat maximum (hors frais)
  const prixAchatMax = () => {
    const fraisTotauxPourcentage = fraisNotaire + fraisAgence;
    const fraisTotaux = (budgetTotal * fraisTotauxPourcentage / 100) + fraisDossier + fraisTravaux;
    return Math.round(budgetTotal - fraisTotaux);
  };
  
  // Calculer les frais annexes
  const calculerFrais = () => {
    const fraisNotaireValeur = prixAchatMax() * fraisNotaire / 100;
    const fraisAgenceValeur = prixAchatMax() * fraisAgence / 100;
    
    return {
      notaire: Math.round(fraisNotaireValeur),
      agence: Math.round(fraisAgenceValeur),
      dossier: fraisDossier,
      travaux: fraisTravaux,
      total: Math.round(fraisNotaireValeur + fraisAgenceValeur + fraisDossier + fraisTravaux)
    };
  };
  
  const frais = calculerFrais();
  const mensualite = () => {
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombreMensualites = duree * 12;
    const emprunt = capaciteEmprunt();
    
    const numerateur = tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites);
    const denominateur = Math.pow(1 + tauxMensuel, nombreMensualites) - 1;
    
    return Math.round(emprunt * (numerateur / denominateur));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">Calculette d'achat immobilier</h1>
      <p className="text-gray-600 mb-6">
        Estimez votre capacité d'emprunt et le prix maximum d'un bien immobilier en fonction de vos revenus et des frais annexes.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Vos revenus</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Votre revenu mensuel net (€)
              </label>
              <input
                type="number"
                value={revenuMensuel || ''}
                onChange={(e) => setRevenuMensuel(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Revenu du conjoint mensuel net (€)
              </label>
              <input
                type="number"
                value={revenuConjoint || ''}
                onChange={(e) => setRevenuConjoint(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apport personnel (€)
              </label>
              <input
                type="number"
                value={apport || ''}
                onChange={(e) => setApport(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Conditions du prêt</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée du prêt (années)
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={duree}
                onChange={(e) => setDuree(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 ans</span>
                <span>{duree} ans</span>
                <span>30 ans</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taux d'intérêt (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="10"
                value={tauxInteret}
                onChange={(e) => setTauxInteret(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Frais annexes</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frais de notaire (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={fraisNotaire}
                onChange={(e) => setFraisNotaire(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frais d'agence (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={fraisAgence}
                onChange={(e) => setFraisAgence(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frais de dossier bancaire (€)
              </label>
              <input
                type="number"
                value={fraisDossier}
                onChange={(e) => setFraisDossier(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget travaux (€)
              </label>
              <input
                type="number"
                value={fraisTravaux}
                onChange={(e) => setFraisTravaux(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 text-indigo-700">Résultats</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Budget total</h3>
              <div className="text-3xl font-bold text-indigo-700">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(budgetTotal)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Capacité d'emprunt + apport personnel
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Prix d'achat maximum</h3>
              <div className="text-3xl font-bold text-green-600">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prixAchatMax())}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Budget total - frais annexes
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Mensualité estimée</h3>
              <div className="text-2xl font-bold text-indigo-600">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(mensualite())}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Sur {duree} ans à {tauxInteret}%
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-medium text-gray-700 mb-3">Détail des frais annexes</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de notaire</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(frais.notaire)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais d'agence</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(frais.agence)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de dossier</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(frais.dossier)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget travaux</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(frais.travaux)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                  <span>Total des frais</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(frais.total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Conseil ImmoNova</h3>
            <p className="text-sm text-blue-600">
              Avec vos revenus actuels, vous pouvez envisager l'achat d'un bien jusqu'à {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prixAchatMax())}. N'hésitez pas à consulter nos experts pour optimiser votre recherche immobilière.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 