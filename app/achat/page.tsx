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
            <h3>1. Fixez le juste prix de votre bien</h3>
            <p>Comme pour l'achat, vous pouvez procéder à la vente de votre bien seul ou avec un professionnel :</p>
            <ul>
              <li>Demandez plusieurs évaluations gratuites à des professionnels</li>
              <li>Attention à ne pas surévaluer votre bien (risque de déconsidération)</li>
              <li>Consultez les prix pratiqués dans votre quartier</li>
              <li>Utilisez les outils d'estimation en ligne en complément</li>
            </ul>

            <h3>2. Soignez la présentation de votre bien</h3>
            <p>La présentation est cruciale pour séduire les acheteurs potentiels :</p>
            <ul>
              <li>Nettoyage approfondi et désencombrement des pièces</li>
              <li>Petits travaux de rafraîchissement (peintures, moquettes)</li>
              <li>Optimisation de la luminosité</li>
              <li>Dépersonnalisation des espaces (home staging)</li>
            </ul>

            <h3>3. Constituez un dossier de vente complet</h3>
            <p>Anticipez les demandes des acheteurs et préparez :</p>
            <ul>
              <li>Tous les diagnostics obligatoires (DPE, amiante, plomb, etc.)</li>
              <li>Les dernières factures énergétiques</li>
              <li>Les documents concernant la copropriété si applicable</li>
              <li>Des photos professionnelles et/ou une visite virtuelle</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-blue-800">
                <strong>Conseil d'expert :</strong> Un bien proposé à un prix de départ manifestement surévalué se déconsidère et devient invendable. N'hésitez pas à consulter les notes de conjoncture immobilière publiées régulièrement par les notaires de France pour avoir une bonne idée de l'état du marché.
              </p>
            </div>
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
          <h2 className="text-2xl font-bold text-gray-800">Guide de l'estimation immobilière</h2>
          
          <div className="prose max-w-none">
            <h3>Les facteurs clés de l'estimation</h3>
            <p>Plusieurs éléments influencent la valeur d'un bien immobilier :</p>
            <ul>
              <li>Localisation et accessibilité (proximité des commerces, transports)</li>
              <li>Surface habitable et configuration des pièces</li>
              <li>État général du bien et travaux nécessaires</li>
              <li>Caractéristiques spécifiques (balcon, jardin, stationnement)</li>
              <li>DPE et performance énergétique (critère devenu essentiel)</li>
              <li>Tendances du marché local (offre et demande)</li>
            </ul>

            <h3>Méthodes d'estimation professionnelles</h3>
            <p>Les professionnels utilisent différentes approches complémentaires :</p>
            <ul>
              <li><strong>Méthode comparative :</strong> analyse des prix de vente récents de biens similaires</li>
              <li><strong>Méthode du revenu :</strong> valeur basée sur les loyers potentiels</li>
              <li><strong>Méthode du coût :</strong> prix du terrain + coût de construction - vétusté</li>
              <li><strong>Analyse prospective :</strong> prise en compte des projets d'aménagement locaux</li>
            </ul>

            <h3>Conseils pour une estimation précise</h3>
            <ul>
              <li>Faites appel à plusieurs professionnels (agents, notaires)</li>
              <li>Comparez avec les ventes récentes similaires</li>
              <li>Prenez en compte les tendances actuelles du marché</li>
              <li>Soyez objectif sur l'état de votre bien et ses points faibles</li>
              <li>Anticipez l'impact des nouvelles réglementations énergétiques</li>
            </ul>

            <div className="bg-green-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-green-800">
                <strong>À savoir :</strong> Depuis les réformes du DPE en 2021 et 2024, la performance énergétique d'un logement est devenue un facteur déterminant dans sa valeur. Les "passoires thermiques" (classes F et G) subissent une décote importante, tandis que les logements économes en énergie bénéficient d'une prime à la valeur.
              </p>
            </div>
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
            <h3>Travaux à fort retour sur investissement</h3>
            <p>Certains travaux peuvent significativement valoriser votre bien :</p>
            <ul>
              <li><strong>Rafraîchissement des peintures</strong> (coût modéré pour un impact visuel important)</li>
              <li><strong>Rénovation énergétique</strong> (isolation, fenêtres double vitrage)</li>
              <li><strong>Mise aux normes électriques</strong> (sécurité et conformité)</li>
              <li><strong>Rénovation légère de la cuisine ou salle de bain</strong> (pièces décisives)</li>
              <li><strong>Optimisation des espaces</strong> (abattage de cloisons non porteuses)</li>
            </ul>

            <h3>Analyse coût-bénéfice essentielle</h3>
            <p>Avant de lancer des travaux, évaluez soigneusement :</p>
            <ul>
              <li>Le coût total des travaux (devis détaillés)</li>
              <li>La plus-value potentielle (consultation d'agents immobiliers)</li>
              <li>Le délai de réalisation (impact sur votre calendrier de vente)</li>
              <li>Les aides financières disponibles (MaPrimeRénov', etc.)</li>
              <li>La demande locale (attentes des acheteurs dans votre secteur)</li>
            </ul>

            <h3>Travaux généralement déconseillés</h3>
            <p>Certains investissements risquent de ne pas être rentabilisés :</p>
            <ul>
              <li>Rénovations complètes coûteuses</li>
              <li>Aménagements très personnalisés (goûts spécifiques)</li>
              <li>Extensions complexes (permis, délais importants)</li>
              <li>Équipements haut de gamme dans un quartier moyen</li>
              <li>Travaux purement esthétiques sans amélioration fonctionnelle</li>
            </ul>

            <div className="bg-yellow-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-yellow-800">
                <strong>Conseil pratique :</strong> Dans le contexte actuel, les travaux d'amélioration énergétique sont souvent les plus rentables. Un bien avec un bon DPE se vend plus rapidement et à un meilleur prix, d'autant plus avec les nouvelles restrictions pour la location des logements énergivores (classes F et G).
              </p>
            </div>
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
          <h2 className="text-2xl font-bold text-gray-800">Guide des diagnostics immobiliers 2024</h2>
          
          <div className="prose max-w-none">
            <h3>Le Dossier de Diagnostic Technique (DDT) obligatoire</h3>
            <p>Pour toute vente immobilière en 2024, vous devez fournir un DDT contenant les diagnostics suivants :</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="border p-2 text-left">Diagnostic</th>
                    <th className="border p-2 text-left">Concerne</th>
                    <th className="border p-2 text-left">Validité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">DPE</td>
                    <td className="border p-2">Tous les logements >50m²</td>
                    <td className="border p-2">10 ans</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Audit énergétique</td>
                    <td className="border p-2">Logements classés E, F ou G</td>
                    <td className="border p-2">5 ans</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Plomb (CREP)</td>
                    <td className="border p-2">Logements avant 1949</td>
                    <td className="border p-2">1 an ou illimité si négatif</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Amiante</td>
                    <td className="border p-2">Permis avant 1997</td>
                    <td className="border p-2">Illimité si négatif</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Électricité</td>
                    <td className="border p-2">Installation > 15 ans</td>
                    <td className="border p-2">3 ans</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Gaz</td>
                    <td className="border p-2">Installation > 15 ans</td>
                    <td className="border p-2">3 ans</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Termites</td>
                    <td className="border p-2">Zones à risque</td>
                    <td className="border p-2">6 mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">État des risques</td>
                    <td className="border p-2">Zones à risques</td>
                    <td className="border p-2">6 mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Diagnostic bruit</td>
                    <td className="border p-2">Proximité aéroports</td>
                    <td className="border p-2">Illimité</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Assainissement</td>
                    <td className="border p-2">Installation non collective</td>
                    <td className="border p-2">3 ans</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Carnet d'Information du Logement</td>
                    <td className="border p-2">Logements avec travaux depuis 2023</td>
                    <td className="border p-2">Permanent</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-6">Points essentiels à retenir</h3>
            <ul>
              <li>Les diagnostics doivent être réalisés par un <strong>diagnostiqueur certifié</strong></li>
              <li>Les frais sont à la charge du <strong>vendeur</strong></li>
              <li>Le coût total se situe entre <strong>200€ et 800€</strong> selon le bien</li>
              <li>L'absence de diagnostics peut entraîner <strong>l'annulation de la vente</strong></li>
              <li>Depuis 2024, le DPE a fait l'objet d'une révision particulière pour les <strong>petites surfaces</strong></li>
            </ul>

            <div className="bg-purple-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-purple-800">
                <strong>Actualité 2024 :</strong> Depuis le 1er janvier 2025, il n'est plus possible de louer un logement classé G au DPE, et cette restriction s'étendra aux classes F en 2028 puis E en 2034. Cette nouvelle réglementation a un impact direct sur la valeur des biens et doit être prise en compte dans toute transaction immobilière.
              </p>
            </div>
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
        <h1 className="text-3xl font-bold text-gray-800">Guide de l'achat immobilier</h1>
        <p className="text-gray-600 mt-2">Découvrez nos conseils et guides pour réussir votre projet d'achat immobilier</p>
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

      {/* Section Premium */}
      <div className="mt-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">Formule Premium ImmoNova</h2>
            <p className="text-white/80 mb-6">Accédez à des documents et des informations exclusifs pour réussir votre projet immobilier</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Modèles de documents personnalisables</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Analyses de marché détaillées par quartier</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Accès illimité à notre base documentaire</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Accompagnement personnalisé par un expert</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <p className="text-white/80 text-sm">À partir de</p>
              <div className="flex items-end">
                <span className="text-4xl font-bold">149</span>
                <span className="text-xl">€</span>
              </div>
            </div>
            <button className="bg-white text-indigo-600 font-medium py-3 px-6 rounded-full hover:bg-indigo-50 transition-colors">
              Découvrir notre offre
            </button>
          </div>
        </div>
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