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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenue, {user?.given_name || 'utilisateur'}
            </h1>
            <p className="text-gray-600 mt-1">
              Votre espace personnel ImmoNova
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              {user?.picture ? (
                <Image
                  src={user.picture}
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="h-6 w-6 text-primary-600" />
              )}
            </div>
          </div>
        </div>

        {/* Calculatrices et outils */}
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculatrices et outils</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTools.map((tool) => (
              <div key={tool.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mr-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <Link
                  href={tool.href}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm flex items-center"
                >
                  Utiliser maintenant
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Ressources utiles */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ressources utiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usefulResources.map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-200 hover:bg-gray-50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-50 rounded-lg mr-3">
                    {resource.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <Link
                  href={resource.href}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm flex items-center"
                >
                  Consulter
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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