"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDefaultRate } from '../hooks/useMarketRates';

export default function CalculetteAchat() {
  // Paramètres d'entrée de l'achat
  const [prixAchat, setPrixAchat] = useState<number>(300000);
  const [fraisNotaire, setFraisNotaire] = useState<number>(8);
  const [fraisAgence, setFraisAgence] = useState<number>(4);
  const [fraisDossier, setFraisDossier] = useState<number>(1000);
  const [apport, setApport] = useState<number>(30000);
  const [revenusMensuels, setRevenusMensuels] = useState<number>(3500);
  const [chargesMensuelles, setChargesMensuelles] = useState<number>(1000);
  const [estPrimoAccedant, setEstPrimoAccedant] = useState<boolean>(true);
  
  // Paramètres du financement
  const [duree, setDuree] = useState<number>(25);
  // Récupérer le taux du marché via le hook, avec une valeur par défaut de 4%
  const tauxMarche = useDefaultRate('achat', duree, 4.0);
  const [tauxInteret, setTauxInteret] = useState<number>(tauxMarche);
  const [tauxAssurance, setTauxAssurance] = useState<number>(0.34);
  
  // Mettre à jour le taux d'intérêt quand la durée change
  useEffect(() => {
    setTauxInteret(tauxMarche);
  }, [tauxMarche]);
  
  // Calculs des coûts totaux de l'achat
  const calculerCoutTotal = () => {
    const fraisNotaireValeur = prixAchat * fraisNotaire / 100;
    const fraisAgenceValeur = prixAchat * fraisAgence / 100;
    const total = prixAchat + fraisNotaireValeur + fraisAgenceValeur + fraisDossier;
    
    return {
      fraisNotaire: Math.round(fraisNotaireValeur),
      fraisAgence: Math.round(fraisAgenceValeur),
      fraisDossier: fraisDossier,
      totalProjet: Math.round(total)
    };
  };
  
  const coutProjet = calculerCoutTotal();
  
  // Calcul du montant à emprunter
  const montantEmprunt = coutProjet.totalProjet - apport;
  
  // Calcul de la mensualité du prêt (avec assurance)
  const calculerMensualite = () => {
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombreMensualites = duree * 12;
    
    // Calcul de la mensualité hors assurance
    let mensualiteHorsAssurance;
    if (tauxMensuel === 0) {
      mensualiteHorsAssurance = montantEmprunt / nombreMensualites;
    } else {
      const numerateur = tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites);
      const denominateur = Math.pow(1 + tauxMensuel, nombreMensualites) - 1;
      mensualiteHorsAssurance = montantEmprunt * (numerateur / denominateur);
    }
    
    // Calcul de l'assurance mensuelle
    const assuranceMensuelle = (montantEmprunt * (tauxAssurance / 100)) / 12;
    
    return {
      total: Math.round(mensualiteHorsAssurance + assuranceMensuelle),
      assurance: Math.round(assuranceMensuelle),
      horAssurance: Math.round(mensualiteHorsAssurance)
    };
  };
  
  const mensualites = calculerMensualite();
  
  // Calcul du taux d'endettement
  const tauxEndettement = (mensualites.total / revenusMensuels) * 100;
  
  // Calcul du reste à vivre
  const resteAVivre = revenusMensuels - mensualites.total - chargesMensuelles;
  
  // Calcul du coût total du crédit
  const coutTotalCredit = (mensualites.total * duree * 12) - montantEmprunt;
  
  // Calcul du PTZ (Prêt à Taux Zéro) si primo-accédant
  const calculerPTZ = () => {
    if (!estPrimoAccedant) return 0;
    const plafondPTZ = 100000; // Exemple de plafond
    return Math.min(prixAchat * 0.4, plafondPTZ);
  };
  
  const montantPTZ = calculerPTZ();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calculette de prêt immobilier</h1>
          <p className="mt-2 text-gray-600">
            Simulez votre capacité d'emprunt et estimez vos mensualités
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panneau de configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre projet</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix d'achat (€)
                    </label>
                    <input
                      type="number"
                      value={prixAchat}
                      onChange={(e) => setPrixAchat(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apport personnel (€)
                    </label>
                    <input
                      type="number"
                      value={apport}
                      onChange={(e) => setApport(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Revenus mensuels nets (€)
                    </label>
                    <input
                      type="number"
                      value={revenusMensuels}
                      onChange={(e) => setRevenusMensuels(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Charges mensuelles (€)
                    </label>
                    <input
                      type="number"
                      value={chargesMensuelles}
                      onChange={(e) => setChargesMensuelles(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres du prêt</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durée du prêt (années)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={duree}
                      onChange={(e) => setDuree(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-sm text-gray-600 mt-1">{duree} ans</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Taux d'intérêt (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={tauxInteret}
                      onChange={(e) => setTauxInteret(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Taux d'assurance (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={tauxAssurance}
                      onChange={(e) => setTauxAssurance(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={estPrimoAccedant}
                      onChange={(e) => setEstPrimoAccedant(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Primo-accédant (PTZ)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Résumé principal */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Mensualité totale</div>
                  <div className="mt-1 text-3xl font-semibold text-indigo-600">
                    {mensualites.total}€
                  </div>
                  <div className="mt-1 text-xs text-gray-500">dont {mensualites.assurance}€ d'assurance</div>
                </div>

                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Taux d'endettement</div>
                  <div className="mt-1 text-3xl font-semibold text-indigo-600">
                    {Math.round(tauxEndettement)}%
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {tauxEndettement <= 35 ? 'Acceptable' : 'Trop élevé'}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Reste à vivre</div>
                  <div className="mt-1 text-3xl font-semibold text-indigo-600">
                    {Math.round(resteAVivre)}€
                  </div>
                  <div className="mt-1 text-xs text-gray-500">par mois</div>
                </div>
              </div>
            </div>

            {/* Détails du financement */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails du financement</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Coût du projet</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 text-gray-600">Prix d'achat</td>
                        <td className="py-1 text-right font-medium">{prixAchat.toLocaleString()}€</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">Frais de notaire</td>
                        <td className="py-1 text-right font-medium">{coutProjet.fraisNotaire.toLocaleString()}€</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">Frais d'agence</td>
                        <td className="py-1 text-right font-medium">{coutProjet.fraisAgence.toLocaleString()}€</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">Frais de dossier</td>
                        <td className="py-1 text-right font-medium">{fraisDossier.toLocaleString()}€</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-2 font-medium">Total</td>
                        <td className="py-2 text-right font-medium">{coutProjet.totalProjet.toLocaleString()}€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Plan de financement</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 text-gray-600">Apport personnel</td>
                        <td className="py-1 text-right font-medium">{apport.toLocaleString()}€</td>
                      </tr>
                      {estPrimoAccedant && (
                        <tr>
                          <td className="py-1 text-gray-600">PTZ</td>
                          <td className="py-1 text-right font-medium">{montantPTZ.toLocaleString()}€</td>
                        </tr>
                      )}
                      <tr>
                        <td className="py-1 text-gray-600">Montant emprunté</td>
                        <td className="py-1 text-right font-medium">{montantEmprunt.toLocaleString()}€</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">Coût total du crédit</td>
                        <td className="py-1 text-right font-medium">{coutTotalCredit.toLocaleString()}€</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-2 font-medium">Coût total du projet</td>
                        <td className="py-2 text-right font-medium">
                          {(montantEmprunt + coutTotalCredit + apport).toLocaleString()}€
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Liens vers les autres calculettes */}
            <div className="mt-8 text-center space-y-4">
              <Link href="/calculateurs/pret" className="block text-indigo-600 hover:text-indigo-800 font-medium">
                Essayer la version avancée →
              </Link>
              <Link href="/calculette-locative" className="block text-indigo-600 hover:text-indigo-800 font-medium">
                Voir aussi notre calculette d'investissement locatif →
              </Link>
              <Link href="/calculette-viager" className="block text-indigo-600 hover:text-indigo-800 font-medium">
                Découvrez notre calculette d'investissement en viager →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 