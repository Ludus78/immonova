"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { 
  HomeIcon, 
  CalculatorIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  BellAlertIcon,
  BriefcaseIcon,
  BookmarkIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user } = useKindeBrowserClient();
  const [greeting, setGreeting] = useState('');
  const [activeTab, setActiveTab] = useState('aperçu');

  // Déterminer le message de salutation en fonction de l'heure
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Bonjour');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Bon après-midi');
    } else {
      setGreeting('Bonsoir');
    }
  }, []);

  // Données simulées pour le dashboard
  const recentSearches = [
    { id: 1, type: 'Appartement', location: 'Paris 16ème', price: '620 000 €', date: '25/03/2024' },
    { id: 2, type: 'Maison', location: 'Bordeaux Centre', price: '450 000 €', date: '23/03/2024' },
    { id: 3, type: 'Studio', location: 'Lyon 3ème', price: '210 000 €', date: '20/03/2024' },
  ];

  const savedProperties = [
    { id: 1, title: 'Appartement lumineux Paris 11', status: 'À vendre', price: '550 000 €', img: '/images/property1.jpg' },
    { id: 2, title: 'Maison familiale avec jardin', status: 'À vendre', price: '720 000 €', img: '/images/property2.jpg' },
  ];

  const calculatorHistory = [
    { id: 1, type: 'Achat', date: '24/03/2024', details: 'Budget: 350 000 € - Mensualité: 1 450 €' },
    { id: 2, type: 'Locatif', date: '22/03/2024', details: 'Rendement: 4.8% - Prix: 210 000 €' },
  ];

  const statisticCards = [
    { id: 1, title: 'Biens consultés', value: '27', icon: <HomeIcon className="h-6 w-6 text-primary-500" />, change: '+12% cette semaine' },
    { id: 2, title: 'Calculatrices utilisées', value: '8', icon: <CalculatorIcon className="h-6 w-6 text-primary-500" />, change: '+3 depuis votre dernière visite' },
    { id: 3, title: 'Biens favoris', value: '5', icon: <StarIcon className="h-6 w-6 text-primary-500" />, change: '2 nouveaux' },
  ];

  const quickActions = [
    { id: 1, title: 'Nouvelle recherche', href: '/', icon: <HomeIcon className="h-6 w-6 text-white" />, color: 'bg-primary-600' },
    { id: 2, title: 'Calculer capacité', href: '/calculette', icon: <CalculatorIcon className="h-6 w-6 text-white" />, color: 'bg-green-600' },
    { id: 3, title: 'Simuler projet', href: '/calculette-locative', icon: <ChartBarIcon className="h-6 w-6 text-white" />, color: 'bg-amber-600' },
    { id: 4, title: 'Documents', href: '/documents', icon: <DocumentTextIcon className="h-6 w-6 text-white" />, color: 'bg-purple-600' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header du dashboard */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {greeting}, {user?.given_name || 'utilisateur'}
          </h1>
          <p className="text-primary-100">
            Bienvenue sur votre espace personnel ImmoNova
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {quickActions.map((action) => (
            <Link 
              key={action.id} 
              href={action.href}
              className="rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
            >
              <div className={`${action.color} p-6 flex flex-col items-center justify-center text-white h-full`}>
                <div className="rounded-full p-3 bg-white/20 mb-3">
                  {action.icon}
                </div>
                <span className="font-medium text-center">{action.title}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('aperçu')}
              className={`py-4 px-6 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'aperçu' 
                  ? 'border-primary-600 text-primary-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Aperçu
            </button>
            <button
              onClick={() => setActiveTab('favoris')}
              className={`py-4 px-6 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'favoris' 
                  ? 'border-primary-600 text-primary-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Biens favoris
            </button>
            <button
              onClick={() => setActiveTab('recherches')}
              className={`py-4 px-6 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'recherches' 
                  ? 'border-primary-600 text-primary-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Historique de recherche
            </button>
            <button
              onClick={() => setActiveTab('calculatrices')}
              className={`py-4 px-6 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'calculatrices' 
                  ? 'border-primary-600 text-primary-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mes calculs
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'aperçu' && (
            <div className="space-y-8">
              {/* Statistiques */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Votre activité</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {statisticCards.map((stat) => (
                    <div key={stat.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-700">{stat.title}</h3>
                        {stat.icon}
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section "Biens enregistrés" */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Vos biens enregistrés</h2>
                  <Link href="/favoris" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    Voir tout
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedProperties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
                      <div className="md:w-1/3 bg-gray-200 h-full relative min-h-[160px]">
                        <div className="bg-primary-100 p-2 text-primary-800 absolute top-2 left-2 text-xs font-medium rounded">
                          {property.status}
                        </div>
                      </div>
                      <div className="p-4 md:w-2/3">
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        <p className="text-lg font-bold text-primary-600 mt-1">{property.price}</p>
                        <div className="mt-4 flex space-x-2">
                          <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700">
                            Voir détails
                          </button>
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                            Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section "Dernières recherches" */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Vos dernières recherches</h2>
                  <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    Voir tout
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type de bien
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Localisation
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentSearches.map((search) => (
                        <tr key={search.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {search.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {search.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {search.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {search.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900">
                              Reproduire
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section "Historique des calculatrices" */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Vos derniers calculs</h2>
                  <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    Voir tout
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calculatorHistory.map((calc) => (
                    <div key={calc.id} className="bg-white rounded-lg shadow p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <CalculatorIcon className="h-5 w-5 text-primary-600 mr-2" />
                            <h3 className="font-medium text-gray-900">Calculatrice {calc.type}</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{calc.date}</p>
                          <p className="text-sm text-gray-700 mt-2">{calc.details}</p>
                        </div>
                        <button className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                          Revoir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favoris' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Vos biens favoris</h2>
              <p className="text-gray-500">Ici, vous retrouverez tous les biens que vous avez marqués comme favoris.</p>
              
              {/* Contenu complet de l'onglet Favoris */}
            </div>
          )}

          {activeTab === 'recherches' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique de recherche</h2>
              <p className="text-gray-500">Consultez l'ensemble de vos recherches précédentes.</p>
              
              {/* Contenu complet de l'onglet Recherches */}
            </div>
          )}

          {activeTab === 'calculatrices' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique des calculatrices</h2>
              <p className="text-gray-500">Retrouvez ici l'ensemble de vos simulations et calculs immobiliers.</p>
              
              {/* Contenu complet de l'onglet Calculatrices */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}