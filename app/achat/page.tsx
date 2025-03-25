"use client";

import Link from 'next/link';
import { useState } from 'react';
import EmailPopup from '../components/EmailPopup';

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
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  const articles: Article[] = [
    {
      id: 'neuf-ancien',
      title: 'Neuf ou ancien : quel choix pour votre investissement ?',
      description: 'Comparez les avantages et inconvénients de l\'achat neuf et ancien pour faire le meilleur choix.',
      icon: '🏗️',
      color: 'bg-red-100 text-red-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-lg text-gray-800">Opter pour un bien neuf permet de bénéficier d'un logement aux normes actuelles, avec une meilleure performance énergétique et des frais de notaire réduits. De plus, certains dispositifs fiscaux comme le PTZ (Prêt à Taux Zéro) peuvent faciliter l'achat. En revanche, les prix sont plus élevés et les délais de livraison peuvent s'étendre sur plusieurs mois. À l'inverse, l'achat dans l'ancien offr un prix au mètre carré plus attractif et un charme architectural, avec la possibilité d'emménager rapidement. Toutefois, il peut impliquer des travaux de rénovation et une isolation moins performante.(base de calcul : 100k €)</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tableau Ancien */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Achat dans l'ancien</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Prix d'achat</span>
                  <span className="font-medium">100 000 €</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Frais de notaire</span>
                  <span className="font-medium">7-8% du prix</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Travaux potentiels</span>
                  <span className="font-medium">En moyenne 15 000€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>DPE</span>
                  <span className="font-medium">de A à G</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Charges de copropriété</span>
                  <span className="font-medium">En moyenne 250€/mois</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Total</span>
                  <span className="font-medium">123 000 €</span>
                </div>
              </div>
            </div>

            {/* Tableau Neuf */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Achat dans le neuf</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Prix d'achat</span>
                  <span className="font-medium">100 000 €</span>
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
                  <span className="font-medium">A ou B</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Charges de copropriété</span>
                  <span className="font-medium">En moyenne 100€/mois</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Total</span>
                  <span className="font-medium">103 000 €</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="https://www.service-public.fr/particuliers/vosdroits/F10871" 
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
      title: 'Bien définir son secteur géographique',
      description: 'Le choix du secteur géographique est une étape clé dans un projet d\'achat immobilier.',
      icon: '🗺️',
      color: 'bg-blue-100 text-blue-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Comment bien définir son secteur géographique pour un achat immobilier ?</h2>
          
          <div className="prose max-w-none">
            <h3><strong>1. Définir ses besoins et priorités</strong></h3>
            <p>{'\u00A0'}</p>
            <p>Avant de choisir un secteur, il est important d'identifier vos critères essentiels :</p>
            <ul>
                <li><strong>Cadre de vie :</strong> Préférez-vous un environnement urbain, périurbain ou rural ?</li>
                <li><strong>Proximité des commodités :</strong> Écoles, commerces, transports en commun, espaces verts, services médicaux…</li>
                <li><strong>Temps de trajet :</strong> Quelle distance êtes-vous prêt à parcourir pour aller au travail ou aux activités ?</li>
                <li><strong>Budget :</strong> Certains quartiers sont plus accessibles que d'autres selon votre budget d'achat.</li>
            </ul>
            <p>{'\u00A0'}</p>
            <h3><strong>2. Étudier le marché immobilier local</strong></h3>
            <p>{'\u00A0'}</p>
            <p>Une fois vos priorités définies, il est crucial d'analyser le marché du secteur qui vous intéresse :</p>
            <ul>
                <li><strong>Prix au m² :</strong> Comparez les prix entre différents quartiers et villes.</li>
                <li><strong>Évolution du marché :</strong> Certains secteurs sont en pleine expansion et peuvent offrir un bon potentiel d'investissement.</li>
                <li><strong>Taux de demande :</strong> Un quartier très recherché peut signifier une plus-value à long terme, mais aussi une concurrence plus forte.</li>
            </ul>
            <p>{'\u00A0'}</p>
            <h3><strong>3. Explorer le quartier sur le terrain</strong></h3>
            <p>{'\u00A0'}</p>
            <p>Une visite sur place permet de se faire une idée réelle du cadre de vie :</p>
            <ul>
                <li><strong>Tester les trajets :</strong> Essayez le parcours domicile-travail aux heures de pointe.</li>
                <li><strong>Observer l'ambiance :</strong> Le quartier est-il calme, dynamique, familial ?</li>
                <li><strong>Vérifier les infrastructures :</strong> Écoles, transports, commerces, loisirs…</li>
            </ul>
            <p>{'\u00A0'}</p>
            <h3><strong>4. Anticiper l'avenir du quartier</strong></h3>
            <p>{'\u00A0'}</p>
            <p>Consultez les projets d'urbanisme :</p>
            <ul>
                <li>Nouvelles infrastructures de transport.</li>
                <li>Développements immobiliers et urbains.</li>
                <li>Évolutions des équipements publics.</li>
            </ul>
            <p>{'\u00A0'}</p>
            <h3><strong>5. Comparer plusieurs secteurs</strong></h3>
            <p>{'\u00A0'}</p>
            <p>Avoir plusieurs options permet de faire le meilleur choix. Comparez les avantages et inconvénients de chaque zone avant de vous engager.</p>
            
            <h2>Conclusion</h2>
            <p>Choisir un bon secteur géographique est une étape clé dans votre projet immobilier. Prenez le temps d'analyser vos besoins, de visiter les quartiers et d'étudier le marché pour faire un choix éclairé.</p>

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
      title: 'Quelles sont les conditions pour acheter un bien immobilier ?',
      description: 'Acheter un bien immobilier nécessite de remplir plusieurs conditions essentielles.',
      icon: '💰',
      color: 'bg-green-100 text-green-600',
      content: (
        <div className="space-y-6">
  <div className="prose max-w-none">
    <h3>1. Avoir une capacité financière suffisante</h3>
    <p>Pour acheter un bien immobilier, il est essentiel d'avoir une bonne situation financière :</p>
    <ul>
      <li><strong>Apport personnel :</strong> Généralement entre 10 et 20 % du prix du bien.</li>
      <li><strong>Capacité d'endettement :</strong> Le taux d'endettement ne doit pas dépasser 35 % des revenus.</li>
      <li><strong>Situation stable :</strong> Un CDI ou une activité pérenne est souvent requis.</li>
    </ul>

    <h3>2. Obtenir un financement</h3>
    <p>Un prêt immobilier est souvent nécessaire pour finaliser l'achat :</p>
    <ul>
      <li>Comparer les offres de crédit pour trouver les meilleures conditions.</li>
      <li>Préparer un dossier solide avec justificatifs de revenus et relevés bancaires.</li>
      <li>Anticiper les frais annexes : notaire, agence, travaux éventuels.</li>
    </ul>

    <h3>3. Choisir un bien adapté</h3>
    <p>Le choix du bien doit répondre à plusieurs critères :</p>
    <ul>
      <li>Définir ses besoins : type de bien, localisation, superficie.</li>
      <li>Visiter plusieurs biens pour comparer les options.</li>
      <li>Vérifier l'état du bien : DPE, amiante, travaux nécessaires.</li>
    </ul>

    <h3>4. Passer par les étapes administratives</h3>
    <p>Plusieurs démarches légales sont nécessaires :</p>
    <ul>
      <li>Signer un compromis ou une promesse de vente.</li>
      <li>Obtenir un accord bancaire et respecter le délai de réflexion de 10 jours.</li>
      <li>Signer l'acte authentique chez le notaire pour officialiser l'achat.</li>
    </ul>

    <div className="bg-blue-50 p-4 rounded-lg mt-6">
      <p className="text-sm text-blue-800">
        <strong>Bon à savoir :</strong> Il est recommandé de se faire accompagner par un professionnel de l'immobilier pour sécuriser son achat et éviter les erreurs.
      </p>
    </div>
  </div>
</div>

      )
    },
    {
      id: 'travaux-avant-vente',
      title: "Comment bien se comporter lors de la visite d'un bien immobilier ?",
      description: "La visite d'un bien immobilier est une étape clé dans le processus d'achat.",
      icon: '🔨',
      color: 'bg-yellow-100 text-yellow-600',
      content: (
        <div className="space-y-6">
  <h2 className="text-2xl font-bold text-gray-800">Comment bien se comporter lors de la visite d'un bien immobilier ?</h2>

  <div className="prose max-w-none">
    <h3>1. Se préparer avant la visite</h3>
    <p>Avant même de visiter un bien, il est important d'arriver bien préparé :</p>
    <ul>
      <li><strong>Analyser l'annonce en détail :</strong> Vérifiez la surface, l'emplacement, les charges et les éventuels travaux mentionnés.</li>
      <li><strong>Lister les critères essentiels :</strong> Définissez vos besoins en termes de nombre de pièces, exposition, transports à proximité, etc.</li>
      <li><strong>Prévoir les bonnes questions :</strong> Renseignez-vous sur l'état du bien, le voisinage, la copropriété et les frais annexes.</li>
    </ul>

    <h3>2. Adopter une attitude observatrice</h3>
    <p>Lors de la visite, il est essentiel d'être attentif aux moindres détails :</p>
    <ul>
      <li><strong>Vérifier l'état général :</strong> Examinez les murs, sols, plafonds et installations électriques.</li>
      <li><strong>Tester les équipements :</strong> Ouvrez les robinets, allumez les lumières et vérifiez les fenêtres.</li>
      <li><strong>Évaluer l'isolation :</strong> Vérifiez l'état des murs, des fenêtres et des portes.</li>
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
      description: 'Guide complet sur les diagnostics, commment lire un diagnostic.',
      icon: '📋',
      color: 'bg-purple-100 text-purple-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Guide des diagnostics immobiliers 2025</h2>
          
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
                    <td className="border p-2">Tous les logements &gt;50m²</td>
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
                    <td className="border p-2">Installation &gt; 15 ans</td>
                    <td className="border p-2">3 ans</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Gaz</td>
                    <td className="border p-2">Installation &gt; 15 ans</td>
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

  // Fonction pour gérer la soumission du formulaire email
  const handleEmailSubmit = async (email: string, acceptNewsletter: boolean) => {
    // Enregistrer le lead
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          calculatorType: 'calculette_achat',
          acceptNewsletter
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }
      
      // Rediriger vers la calculette après soumission réussie
      window.location.href = '/calculette';
    } catch (error) {
      console.error('Error submitting lead:', error);
      throw error;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-indigo-700 hover:underline mb-4">
          <span className="mr-1">←</span> Retour à l'accueil
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Guide de l'achat immobilier</h1>
          <button 
            onClick={() => setIsEmailPopupOpen(true)}
            className="flex items-center gap-3 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 border-2 border-indigo-700"
            title="Calculette d'achat immobilier"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
              <rect x="3" y="2" width="18" height="20" rx="2" fill="#333" />
              <rect x="5" y="4" width="14" height="4" rx="1" fill="#9DE0BC" />
              <rect x="5" y="10" width="3" height="3" rx="0.5" fill="#F6B266" />
              <rect x="10" y="10" width="3" height="3" rx="0.5" fill="#F6B266" />
              <rect x="15" y="10" width="3" height="3" rx="0.5" fill="#F6B266" />
              <rect x="5" y="15" width="3" height="3" rx="0.5" fill="#F6B266" />
              <rect x="10" y="15" width="3" height="3" rx="0.5" fill="#F6B266" />
              <rect x="15" y="15" width="3" height="3" rx="0.5" fill="#F39C4F" />
            </svg>
            <span className="font-semibold text-lg">Calculer votre budget</span>
          </button>
        </div>
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
      {/* Temporairement masqué
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">Formule Premium ImmoNova</h2>
          <p className="text-white/80 mb-6">Accédez à des documents et des informations exclusifs pour réussir votre projet immobilier</p>
          <ul className="space-y-2 mb-8">
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
          <div className="flex flex-col items-center">
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
        
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">Offre Illimitée</h2>
          <p className="text-white/80 mb-6">Profitez d'un accès complet à tous nos services premium sans restriction de durée</p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Accès illimité à notre base documentaire</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Assistance prioritaire 7j/7</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Alertes personnalisées sur le marché</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Consultations illimitées avec nos experts</span>
            </li>
          </ul>
          <div className="flex flex-col items-center">
            <div className="text-center mb-4">
              <p className="text-white/80 text-sm">Offre exclusive</p>
              <div className="flex items-end">
                <span className="text-4xl font-bold">299</span>
                <span className="text-xl">€</span>
                <span className="text-sm ml-1">/an</span>
              </div>
            </div>
            <button className="bg-white text-orange-600 font-medium py-3 px-6 rounded-full hover:bg-orange-50 transition-colors">
              Accéder à l'offre illimitée
            </button>
          </div>
        </div>
      </div>
      */}

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

      {/* Popup de demande d'email */}
      <EmailPopup 
        isOpen={isEmailPopupOpen} 
        onClose={() => setIsEmailPopupOpen(false)} 
        onSubmit={handleEmailSubmit}
        targetCalculator="estimer votre budget d'achat"
      />
    </div>
  );
} 