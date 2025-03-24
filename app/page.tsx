"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        {/* Image de fond avec un overlay sombre */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-real-estate.jpg"
            alt="Image immobilier de luxe"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Contenu du hero */}
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">ImmoNova</span>
              <span className="block text-blue-300">Votre partenaire immobilier</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Découvrez nos outils et services pour vous accompagner dans tous vos projets immobiliers.
            </p>
          </div>
        </div>
      </div>

      {/* Calculettes Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos calculettes immobilières
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Des outils gratuits pour estimer vos projets immobiliers
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Calculette d'achat */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Calculette d'achat immobilier</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Estimez votre capacité d'emprunt et le prix maximum d'un bien immobilier
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/calculette" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Utiliser la calculette
                </Link>
              </div>
            </div>
          </div>

          {/* Calculette locative */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Calculette d'investissement locatif</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Calculez la rentabilité de votre investissement locatif
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/calculette-locative" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Utiliser la calculette
                </Link>
              </div>
            </div>
          </div>

          {/* Calculette viager */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Calculette d'investissement en viager</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Estimez la rentabilité de votre investissement en viager
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/calculette-viager" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Utiliser la calculette
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos services
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Des solutions adaptées à vos besoins
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Achat */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Acheter un bien</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Guide complet pour l'achat de votre bien immobilier
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/achat" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>

          {/* Vente */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Vendre un bien</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Conseils et étapes pour vendre votre bien immobilier
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/vente" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>

          {/* Investissement */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Investir</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Stratégies d'investissement immobilier
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/investissement" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 