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
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user } = useKindeBrowserClient();
  const [greeting, setGreeting] = useState('');
  const [activeTab, setActiveTab] = useState('apercu');

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
  const calculatorHistory = [
    { id: 1, type: 'Achat', date: '24/03/2025', details: 'Budget: 350 000 € - Mensualité: 1 450 €' },
    { id: 2, type: 'Locatif', date: '22/03/2025', details: 'Rendement: 4.8% - Prix: 210 000 €' },
  ];

  const statisticCards = [
    { id: 1, title: 'Calculs effectués', value: '12', icon: <CalculatorIcon className="h-6 w-6 text-primary-500" />, change: '+3 cette semaine' },
    { id: 2, title: 'Documents consultés', value: '8', icon: <DocumentTextIcon className="h-6 w-6 text-primary-500" />, change: '+2 depuis hier' },
    { id: 3, title: 'Taux moyen actuel', value: '3.2%', icon: <ChartBarIcon className="h-6 w-6 text-primary-500" />, change: '-0.1% ce mois-ci' },
  ];

  const quickActions = [
    { id: 1, title: 'Calculer capacité', href: '/calculette', icon: <CalculatorIcon className="h-6 w-6 text-white" />, color: 'bg-primary-600' },
    { id: 2, title: 'Simuler locatif', href: '/calculette-locative', icon: <ChartBarIcon className="h-6 w-6 text-white" />, color: 'bg-green-600' },
    { id: 3, title: 'Simuler viager', href: '/calculette-viager', icon: <CalculatorIcon className="h-6 w-6 text-white" />, color: 'bg-amber-600' },
    { id: 4, title: 'Documents', href: '/documents', icon: <DocumentTextIcon className="h-6 w-6 text-white" />, color: 'bg-purple-600' },
  ];

  const personalTips = [
    {
      id: 1,
      title: "Optimisez votre capacité d'emprunt",
      content: "D'après vos simulations récentes, vous pourriez augmenter votre capacité d'emprunt de 15% en prolongeant la durée de remboursement à 25 ans.",
      icon: <LightBulbIcon className="h-5 w-5 text-amber-500" />
    },
    {
      id: 2,
      title: "Réduisez votre taux d'intérêt",
      content: "Avez-vous pensé à intégrer un apport personnel ? 10% d'apport pourrait vous faire économiser jusqu'à 15 000€ sur le coût total de votre crédit.",
      icon: <LightBulbIcon className="h-5 w-5 text-amber-500" />
    },
    {
      id: 3,
      title: "Explorez le viager comme option",
      content: "Basé sur vos centres d'intérêt, le viager pourrait représenter une alternative intéressante pour votre stratégie d'investissement.",
      icon: <LightBulbIcon className="h-5 w-5 text-amber-500" />
    }
  ];

  const userAlerts = [
    {
      id: 1,
      title: "Nouvelle calculatrice disponible",
      content: "Notre calculatrice de prêt à taux zéro est maintenant disponible. Découvrez si vous êtes éligible !",
      date: "24/03/2025",
      status: "info",
      icon: <BellAlertIcon className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      title: "Taux d'intérêt mis à jour",
      content: "Nos simulateurs utilisent maintenant les derniers taux du marché (Mars 2025).",
      date: "20/03/2025",
      status: "success",
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />
    },
    {
      id: 3,
      title: "Changement réglementaire",
      content: "La réglementation sur les prêts immobiliers a changé. Cela pourrait affecter vos simulations.",
      date: "15/03/2025",
      status: "warning",
      icon: <ExclamationCircleIcon className="h-5 w-5 text-amber-500" />
    }
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
              onClick={() => setActiveTab('apercu')}
              className={`py-4 px-6 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'apercu' 
                  ? 'border-primary-600 text-primary-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Aperçu
            </button>
            <button
              onClick={() => setActiveTab('conseils')}
              className={`py-4 px-6 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'conseils' 
                  ? 'border-primary-600 text-primary-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Conseils personnalisés
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
          {activeTab === 'apercu' && (
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

              {/* Section "Notifications et alertes" */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Notifications et alertes</h2>
                  <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    Gérer les notifications
                  </button>
                </div>
                
                <div className="space-y-4">
                  {userAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`bg-white rounded-lg shadow p-4 border-l-4 ${
                        alert.status === 'info' ? 'border-blue-500' : 
                        alert.status === 'success' ? 'border-green-500' : 
                        'border-amber-500'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {alert.icon}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                            <p className="text-xs text-gray-500">{alert.date}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{alert.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section "Derniers calculs" résumé */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Vos derniers calculs</h2>
                  <button 
                    onClick={() => setActiveTab('calculatrices')} 
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    Voir tous vos calculs
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

          {activeTab === 'conseils' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Conseils personnalisés</h2>
              <p className="text-gray-500 mb-6">Des recommandations basées sur vos simulations et préférences pour optimiser vos projets immobiliers.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalTips.map((tip) => (
                  <div key={tip.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {tip.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-gray-900">{tip.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{tip.content}</p>
                        <div className="mt-3">
                          <button className="text-primary-600 text-sm font-medium hover:text-primary-800">
                            En savoir plus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Besoin d'un conseil personnalisé ?</h3>
                    <p className="text-gray-600 mt-1">Posez vos questions à notre assistant IA Claude pour obtenir des réponses adaptées à votre situation.</p>
                    <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                      Discuter avec Claude
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calculatrices' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique des calculatrices</h2>
              <p className="text-gray-500 mb-6">Retrouvez ici l'ensemble de vos simulations et calculs immobiliers.</p>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {calculatorHistory.concat([
                      { id: 3, type: 'Viager', date: '20/03/2025', details: 'Bouquet: 120 000 € - Rente: 800 €/mois' },
                      { id: 4, type: 'Achat', date: '15/03/2025', details: 'Budget: 280 000 € - Mensualité: 1 200 €' }
                    ]).map((calc) => (
                      <div key={calc.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <CalculatorIcon className="h-5 w-5 text-primary-600 mr-2" />
                              <h3 className="font-medium text-gray-900">Calculatrice {calc.type}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{calc.date}</p>
                            <p className="text-sm text-gray-700 mt-2">{calc.details}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                              Revoir
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">
                              Exporter
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Comparaison des simulations</h3>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 mb-4">Comparez vos différentes simulations pour prendre la meilleure décision.</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                    Nouvelle comparaison
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}