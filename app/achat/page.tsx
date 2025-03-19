"use client";

import Link from 'next/link';
import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  content: React.ReactNode;
}

export default function AchatPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'neuf-ancien',
      title: 'Neuf ou ancien : quel choix pour votre investissement ?',
      description: 'Comparez les avantages et inconvénients de l\'achat neuf et ancien pour faire le meilleur choix.',
      icon: '🏗️',
      color: 'bg-red-100 text-red-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Comparatif détaillé : Neuf vs Ancien</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tableau Ancien */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Achat dans l'ancien</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Prix d'achat</span>
                  <span className="font-medium">Variable selon l'état</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Frais de notaire</span>
                  <span className="font-medium">7-8% du prix</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Travaux potentiels</span>
                  <span className="font-medium">À prévoir</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>DPE</span>
                  <span className="font-medium">Variable</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Charges de copropriété</span>
                  <span className="font-medium">Variables</span>
                </div>
              </div>
            </div>

            {/* Tableau Neuf */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Achat dans le neuf</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Prix d'achat</span>
                  <span className="font-medium">Prix fixe</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Frais de notaire</span>
                  <span className="font-medium">2-3% du prix</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Travaux</span>
                  <span className="font-medium">Non nécessaires</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>DPE</span>
                  <span className="font-medium">A</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Charges de copropriété</span>
                  <span className="font-medium">Modérées</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="https://www.service-public.fr/particuliers/vosdroits/F32112" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Vérifier mon éligibilité au PTZ
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'comment-bien-vendre',
      title: 'Comment bien vendre',
      description: 'Découvrez les meilleures pratiques pour mettre en valeur votre bien et maximiser vos chances de vente.',
      icon: '📈',
      color: 'bg-blue-100 text-blue-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Guide complet pour vendre votre bien</h2>
          
          <div className="prose max-w-none">
            <h3>1. Préparation du bien</h3>
            <p>La première étape consiste à préparer votre bien pour la vente. Voici les points essentiels à considérer :</p>
            <ul>
              <li>Nettoyage approfondi et désencombrement</li>
              <li>Petits travaux de rénovation si nécessaire</li>
              <li>Mise en valeur des points forts</li>
              <li>Optimisation de l'éclairage</li>
            </ul>

            <h3>2. Estimation du prix</h3>
            <p>Une estimation précise est cruciale pour une vente réussie. Considérez :</p>
            <ul>
              <li>Le marché local</li>
              <li>Les caractéristiques du bien</li>
              <li>Les biens comparables récemment vendus</li>
              <li>L'état général du bien</li>
            </ul>

            <h3>3. Présentation marketing</h3>
            <p>Pour attirer les acheteurs potentiels :</p>
            <ul>
              <li>Photos professionnelles de qualité</li>
              <li>Description détaillée et attractive</li>
              <li>Visites virtuelles si possible</li>
              <li>Mise en avant des avantages spécifiques</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'estimation',
      title: 'L\'estimation un vrai sujet',
      description: 'Comprenez l\'importance d\'une bonne estimation et les facteurs qui influencent la valeur de votre bien.',
      icon: '💰',
      color: 'bg-green-100 text-green-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Guide de l\'estimation immobilière</h2>
          
          <div className="prose max-w-none">
            <h3>Les facteurs clés de l\'estimation</h3>
            <p>Plusieurs éléments influencent la valeur d\'un bien immobilier :</p>
            <ul>
              <li>Localisation et accessibilité</li>
              <li>Surface habitable et configuration</li>
              <li>État du bien et travaux nécessaires</li>
              <li>Caractéristiques spécifiques (balcon, jardin, etc.)</li>
              <li>DPE et performance énergétique</li>
            </ul>

            <h3>Méthodes d'estimation</h3>
            <p>Les professionnels utilisent différentes approches :</p>
            <ul>
              <li>Méthode comparative</li>
              <li>Méthode du revenu</li>
              <li>Méthode du coût</li>
              <li>Analyse du marché local</li>
            </ul>

            <h3>Conseils pour une estimation précise</h3>
            <ul>
              <li>Faire appel à plusieurs experts</li>
              <li>Étudier les ventes récentes similaires</li>
              <li>Prendre en compte les tendances du marché</li>
              <li>Considérer les projets d'aménagement locaux</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'travaux-avant-vente',
      title: 'Les travaux avant la vente sont-ils pertinents ?',
      description: 'Analysez si les travaux de rénovation sont rentables avant de mettre votre bien en vente.',
      icon: '🔨',
      color: 'bg-yellow-100 text-yellow-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Guide des travaux avant vente</h2>
          
          <div className="prose max-w-none">
            <h3>Travaux prioritaires</h3>
            <p>Certains travaux peuvent significativement augmenter la valeur de votre bien :</p>
            <ul>
              <li>Rénovation énergétique (isolation, fenêtres)</li>
              <li>Mise aux normes de sécurité</li>
              <li>Rénovation de la cuisine ou de la salle de bain</li>
              <li>Rafraîchissement des peintures</li>
            </ul>

            <h3>Analyse coût-bénéfice</h3>
            <p>Avant de lancer des travaux, évaluez :</p>
            <ul>
              <li>Le coût total des travaux</li>
              <li>La plus-value potentielle</li>
              <li>Le temps de retour sur investissement</li>
              <li>Les aides disponibles</li>
            </ul>

            <h3>Travaux à éviter</h3>
            <p>Certains travaux peuvent ne pas être rentables :</p>
            <ul>
              <li>Transformations majeures</li>
              <li>Travaux personnalisés</li>
              <li>Aménagements coûteux</li>
              <li>Extensions complexes</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics immobilier, que faire !',
      description: 'Guide complet sur les diagnostics obligatoires et leur importance dans la vente d\'un bien.',
      icon: '📋',
      color: 'bg-purple-100 text-purple-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Guide des diagnostics immobiliers</h2>
          
          <div className="prose max-w-none">
            <h3>Diagnostics obligatoires</h3>
            <p>Les diagnostics obligatoires lors de la vente d\'un bien :</p>
            <ul>
              <li>DPE (Diagnostic de Performance Énergétique)</li>
              <li>ERNMT (État des Risques Naturels, Miniers et Technologiques)</li>
              <li>Diagnostic Amiante</li>
              <li>Diagnostic Plomb</li>
              <li>Diagnostic Termites</li>
              <li>Diagnostic Électricité</li>
              <li>Diagnostic Gaz</li>
            </ul>

            <h3>Validité des diagnostics</h3>
            <p>Durée de validité des différents diagnostics :</p>
            <ul>
              <li>DPE : illimité</li>
              <li>ERNMT : 6 mois</li>
              <li>Amiante : illimité</li>
              <li>Plomb : illimité</li>
              <li>Termites : 6 mois</li>
              <li>Électricité : 3 ans</li>
              <li>Gaz : 3 ans</li>
            </ul>

            <h3>Conseils pratiques</h3>
            <ul>
              <li>Faire réaliser les diagnostics par des professionnels certifiés</li>
              <li>Conserver les rapports pour les futures ventes</li>
              <li>Anticiper les travaux nécessaires</li>
              <li>Inclure les coûts dans le budget de vente</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-indigo-700 hover:underline mb-4">
          <span className="mr-1">←</span> Retour à l'accueil
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Guide de l\'achat immobilier</h1>
        <p className="text-gray-600 mt-2">Découvrez nos conseils et guides pour réussir votre projet d\'achat immobilier</p>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${article.color} rounded-full flex items-center justify-center text-2xl`}>
                {article.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <span className="text-indigo-600 hover:underline font-medium">
                  Lire l'article →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour afficher l'article */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedArticle.title}</h2>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedArticle.content}
          </div>
        </div>
      )}
    </div>
  );
} 