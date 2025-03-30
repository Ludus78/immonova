"use client";

import { useState } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from 'next/image';
import Link from 'next/link';
import { 
  HomeIcon, 
  UserIcon, 
  CalculatorIcon, 
  ChartBarIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user } = useKindeBrowserClient();

  // Outils disponibles sur le site
  const availableTools = [
    { id: 1, title: 'Calculer achat', href: '/calculette', icon: <CalculatorIcon className="h-6 w-6 text-white" />, color: 'bg-primary-600', description: 'Calculez votre capacité d\'emprunt et simulez votre achat immobilier' },
    { id: 2, title: 'Simuler locatif', href: '/calculette-locative', icon: <ChartBarIcon className="h-6 w-6 text-white" />, color: 'bg-green-600', description: 'Évaluez la rentabilité de votre investissement locatif' },
    { id: 3, title: 'Calculer viager', href: '/calculette-viager', icon: <CalculatorIcon className="h-6 w-6 text-white" />, color: 'bg-amber-600', description: 'Estimez les modalités de votre investissement en viager' },
  ];

  // Ressources utiles
  const usefulResources = [
    { 
      id: 1, 
      title: 'Guide achat immobilier', 
      href: '/achat', 
      icon: <HomeIcon className="h-6 w-6 text-primary-600" />,
      description: 'Découvrez les étapes clés pour réussir votre achat immobilier'
    },
    { 
      id: 2, 
      title: 'Actualités immobilières', 
      href: '/actualites', 
      icon: <NewspaperIcon className="h-6 w-6 text-primary-600" />,
      description: 'Restez informé des dernières tendances du marché immobilier'
    },
    { 
      id: 3, 
      title: 'Documents essentiels', 
      href: '/documents', 
      icon: <NewspaperIcon className="h-6 w-6 text-primary-600" />,
      description: 'Accédez aux documents nécessaires pour vos démarches immobilières'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header du dashboard */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 bg-gradient-to-r from-primary-600 to-primary-500 p-6 rounded-lg shadow-lg text-white">
          <div>
            <h1 className="text-3xl font-bold">
              Bienvenue, {user?.given_name || 'utilisateur'}
            </h1>
            <p className="mt-2 text-primary-100">
              Votre espace personnel ImmoNova
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md flex items-center justify-center">
              {user?.picture ? (
                <Image
                  src={user.picture}
                  alt="Avatar"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-primary-600" />
              )}
            </div>
          </div>
        </div>

        {/* Calculatrices et outils */}
        <div className="bg-white shadow rounded-lg mb-8 p-6 border-t-4 border-primary-600">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculatrices et outils</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTools.map((tool) => (
              <div key={tool.id} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mr-4 shadow-md`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Utiliser maintenant
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Ressources utiles */}
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-primary-600">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ressources utiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usefulResources.map((resource) => (
              <div key={resource.id} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg mr-3 shadow-sm">
                    {resource.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <Link
                  href={resource.href}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-700 bg-primary-100 rounded-md hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Consulter
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}