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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Neuf ou ancien : quel choix pour votre investissement ?</h3>
            <div className="space-y-4 text-gray-600">
              <p>Opter pour un bien neuf ou ancien est une décision majeure qui influence votre projet immobilier à long terme. Chaque option présente des avantages et inconvénients spécifiques qu'il convient d'analyser selon vos priorités.</p>
              
              <div>
                <h4 className="font-medium mb-2 text-blue-700">Les avantages du neuf</h4>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Performance énergétique optimale</strong> (normes RT2020)</li>
                  <li>• <strong>Frais de notaire réduits</strong> (2-3% contre 7-8% dans l'ancien)</li>
                  <li>• <strong>Garanties constructeur</strong> (décennale, biennale, etc.)</li>
                  <li>• <strong>Dispositifs fiscaux avantageux</strong> (PTZ, Pinel sous conditions)</li>
                  <li>• <strong>Aucuns travaux à prévoir</strong> à court et moyen terme</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">Les avantages de l'ancien</h4>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Prix au m² généralement plus attractif</strong></li>
                  <li>• <strong>Localisation souvent plus centrale</strong> (quartiers établis)</li>
                  <li>• <strong>Charme architectural</strong> et cachet du bâti ancien</li>
                  <li>• <strong>Disponibilité immédiate</strong> sans délai de construction</li>
                  <li>• <strong>Potentiel de plus-value</strong> après rénovation</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Tableau Ancien */}
                <div className="bg-gray-50 rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Achat dans l'ancien</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span>Prix d'achat</span>
                      <span className="font-medium">100 000 €</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Frais de notaire</span>
                      <span className="font-medium">7-8% (≈ 7 500 €)</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Travaux potentiels</span>
                      <span className="font-medium">≈ 15 000 €</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>DPE</span>
                      <span className="font-medium">Variable (A à G)</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Charges de copropriété</span>
                      <span className="font-medium">≈ 250 €/mois</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-700">
                      <span>Total approximatif</span>
                      <span>122 500 €</span>
                    </div>
                  </div>
                </div>

                {/* Tableau Neuf */}
                <div className="bg-gray-50 rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Achat dans le neuf</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span>Prix d'achat</span>
                      <span className="font-medium">100 000 €</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Frais de notaire</span>
                      <span className="font-medium">2-3% (≈ 2 500 €)</span>
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
                      <span className="font-medium">≈ 100 €/mois</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-700">
                      <span>Total approximatif</span>
                      <span>102 500 €</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Point d'attention :</strong> Dans le contexte actuel, la performance énergétique est devenue un critère majeur de valorisation immobilière. Les logements neufs bénéficient d'un avantage certain, mais certains biens anciens rénovés peuvent également offrir d'excellentes performances.
                </p>
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Bien définir son secteur géographique</h3>
            <div className="space-y-4 text-gray-600">
              <p>Le choix du secteur géographique est l'une des décisions les plus cruciales dans un projet d'achat immobilier. Il détermine non seulement votre qualité de vie au quotidien, mais aussi la valeur et l'évolution de votre patrimoine à long terme.</p>
          
              <div>
                <h4 className="font-medium mb-2 text-blue-700">1. Définir ses besoins et priorités</h4>
                <p>Avant de choisir un secteur, identifiez vos critères essentiels :</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Cadre de vie :</strong> urbain, périurbain ou rural selon votre style de vie</li>
                  <li>• <strong>Proximité des commodités :</strong> écoles, commerces, transports, services médicaux</li>
                  <li>• <strong>Temps de trajet domicile-travail :</strong> définir un temps maximal acceptable</li>
                  <li>• <strong>Budget disponible :</strong> les prix varient considérablement selon les secteurs</li>
                  <li>• <strong>Sécurité du quartier :</strong> consultez les statistiques locales</li>
                </ul>
              </div>
            
              <div>
                <h4 className="font-medium mb-2 text-blue-700">2. Étudier le marché immobilier local</h4>
                <p>Analysez en profondeur le marché du secteur qui vous intéresse :</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Prix au m² :</strong> comparez les prix entre différents quartiers</li>
                  <li>• <strong>Évolution des prix :</strong> consultez les historiques sur 5-10 ans</li>
                  <li>• <strong>Taux de demande :</strong> délais de vente moyens dans le secteur</li>
                  <li>• <strong>Projets d'urbanisme :</strong> futurs aménagements qui valoriseront le quartier</li>
                  <li>• <strong>Fiscalité locale :</strong> niveaux des taxes foncières et d'habitation</li>
                </ul>
              </div>
            
              <div>
                <h4 className="font-medium mb-2 text-blue-700">3. Explorer le quartier sur le terrain</h4>
                <p>Une visite approfondie est indispensable avant tout engagement :</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Visites à différentes heures :</strong> matin, soirée, week-end</li>
                  <li>• <strong>Test des trajets quotidiens :</strong> aux heures de pointe</li>
                  <li>• <strong>Rencontre avec les habitants :</strong> pour connaître l'ambiance réelle</li>
                  <li>• <strong>Vérification des nuisances :</strong> bruit, pollution, circulation</li>
                  <li>• <strong>Potentiel d'évolution :</strong> signes de dynamisme ou de déclin</li>
                </ul>
              </div>
            
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Conseil pratique :</strong> Les secteurs en développement avec l'arrivée prochaine de nouvelles infrastructures de transport ou de nouveaux services publics offrent souvent un excellent potentiel de valorisation. Renseignez-vous auprès de la mairie sur les projets d'urbanisme à 5-10 ans.
                </p>
              </div>
            
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-blue-700">Outils pour votre recherche</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="https://www.meilleursagents.com/prix-immobilier/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h5 className="font-medium text-indigo-700">Carte des prix immobiliers</h5>
                    <p className="text-sm text-gray-600">Consultez les prix au m² par quartier</p>
                  </a>
                  <a 
                    href="https://www.data.gouv.fr/fr/pages/donnees-geographiques/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h5 className="font-medium text-indigo-700">Données géographiques</h5>
                    <p className="text-sm text-gray-600">Accédez aux statistiques locales détaillées</p>
                  </a>
                </div>
              </div>
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Les conditions essentielles pour acheter un bien immobilier</h3>
            <div className="space-y-4 text-gray-600">
              <p>Acheter un bien immobilier représente souvent l'investissement le plus important d'une vie. Pour réussir cette démarche, plusieurs conditions doivent être réunies afin de sécuriser votre projet et d'obtenir le financement nécessaire.</p>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">1. Capacité financière solide</h4>
                <p>La base de tout projet immobilier repose sur une situation financière adaptée :</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Apport personnel</strong> : idéalement 10 à 20% du prix d'achat (les banques sont plus exigeantes depuis 2022)</li>
                  <li>• <strong>Taux d'endettement maîtrisé</strong> : maximum 35% des revenus (incluant toutes vos charges de crédit)</li>
                  <li>• <strong>Stabilité professionnelle</strong> : CDI confirmé ou activité indépendante pérenne avec au moins 2-3 ans d'historique</li>
                  <li>• <strong>Épargne de précaution</strong> : réserve financière pour les imprévus post-acquisition</li>
                  <li>• <strong>Absence d'incidents bancaires</strong> : pas d'inscription au FICP ou de retards de paiement</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">2. Financement optimisé</h4>
                <p>L'obtention d'un crédit immobilier aux meilleures conditions est déterminante :</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Comparaison des offres</strong> : consulter plusieurs établissements bancaires</li>
                  <li>• <strong>Assurance emprunteur</strong> : possibilité de délégation pour réduire les coûts</li>
                  <li>• <strong>Aides disponibles</strong> : PTZ, prêt Action Logement, prêts régionaux...</li>
                  <li>• <strong>Frais annexes anticipés</strong> : notaire (7-8% dans l'ancien, 2-3% dans le neuf), garantie, dossier</li>
                  <li>• <strong>Taux d'intérêt négocié</strong> : souvent possible en fonction de votre profil</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mt-4 mb-4">
                <p className="text-sm text-green-800">
                  <strong>Planifier son budget</strong>
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="font-medium">Prix d'achat</p>
                    <p>Prix du bien + frais de notaire</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-medium">Budget travaux</p>
                    <p>Prévoir 5-15% du prix pour la rénovation</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-medium">Frais de déménagement</p>
                    <p>Entre 800€ et 2000€ selon le volume</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-medium">Réserve d'urgence</p>
                    <p>3-6 mois de mensualités recommandés</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">3. Procédures administratives maîtrisées</h4>
                <p>L'achat immobilier suit un parcours administratif précis :</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Compromis/promesse de vente</strong> : engagement juridique avec conditions suspensives</li>
                  <li>• <strong>Délai de rétractation légal</strong> : 10 jours incompressibles après signature</li>
                  <li>• <strong>Demande de prêt</strong> : à soumettre dès la signature du compromis</li>
                  <li>• <strong>Validation des conditions suspensives</strong> : financement, urbanisme, état du bien</li>
                  <li>• <strong>Acte authentique</strong> : signé chez le notaire pour finaliser la vente</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Point important :</strong> Depuis 2022, les conditions d'octroi des crédits se sont durcies. Le Haut Conseil de Stabilité Financière (HCSF) impose aux banques de respecter un taux d'endettement maximal de 35% et une durée de prêt limitée à 25 ans (27 ans pour les biens neufs). Anticipez ces contraintes dans votre projet.
                </p>
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="/calculette"
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Estimer votre capacité d'emprunt
                </a>
              </div>
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Comment optimiser vos visites de biens immobiliers</h3>
            <div className="space-y-4 text-gray-600">
              <p>La visite d'un bien immobilier est une étape déterminante dans le processus d'achat. Elle vous permet de vérifier si la réalité correspond à l'annonce et de détecter d'éventuels problèmes qui pourraient affecter votre décision ou servir de base à une négociation.</p>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">1. Préparation avant la visite</h4>
                <p>Une bonne préparation est essentielle pour une visite efficace :</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Checklist personnalisée</strong> : préparez une liste des points importants à vérifier</li>
                  <li>• <strong>Questions ciblées</strong> : sur l'historique du bien, les travaux, le voisinage, les charges</li>
                  <li>• <strong>Outils pratiques</strong> : mètre, appareil photo (avec autorisation), boussole pour l'orientation</li>
                  <li>• <strong>Documents à demander</strong> : diagnostics techniques, charges de copropriété, taxe foncière</li>
                  <li>• <strong>Accompagnement utile</strong> : venez avec un proche pour un second avis objectif</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">2. Que vérifier pendant la visite</h4>
                <p>Soyez méthodique et attentif à ces éléments clés :</p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Structure et gros œuvre</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Fissures sur les murs porteurs</li>
                      <li>• Traces d'humidité ou moisissures</li>
                      <li>• État de la toiture et charpente</li>
                      <li>• Isolation thermique et phonique</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Installations techniques</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Système de chauffage et âge</li>
                      <li>• Tableau électrique et conformité</li>
                      <li>• Plomberie (pression, fuites)</li>
                      <li>• VMC et aération des pièces</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Confort et environnement</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Luminosité naturelle</li>
                      <li>• Nuisances sonores extérieures</li>
                      <li>• Voisinage immédiat</li>
                      <li>• Exposition et ensoleillement</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Aspects pratiques</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Rangements disponibles</li>
                      <li>• État des menuiseries</li>
                      <li>• Disposition des pièces</li>
                      <li>• Connexion internet/fibre</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">3. Questions essentielles à poser</h4>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Raison de la vente</strong> : peut révéler des informations importantes</li>
                  <li>• <strong>Durée sur le marché</strong> : un bien en vente depuis longtemps peut cacher des problèmes</li>
                  <li>• <strong>Travaux récents et à prévoir</strong> : pour évaluer les investissements futurs</li>
                  <li>• <strong>Vie du quartier</strong> : commerces, écoles, transports, projets urbains</li>
                  <li>• <strong>Charges précises</strong> : montant exact, ce qu'elles incluent, historique des augmentations</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-yellow-800">
                  <strong>Conseil pratique :</strong> N'hésitez pas à revenir visiter le bien à différentes heures de la journée pour évaluer l'ensoleillement, le bruit et l'ambiance du quartier. Une seconde visite est souvent plus révélatrice que la première, car vous serez plus attentif aux détails.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2 text-blue-700">Notre modèle de checklist de visite</h4>
                <div className="text-center mt-3">
                  <a 
                    href="#" 
                    onClick={(e) => {e.preventDefault(); alert('Cette fonctionnalité sera disponible prochainement')}}
                    className="inline-block bg-indigo-100 text-indigo-700 px-6 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    Télécharger la checklist complète (PDF)
                  </a>
                </div>
              </div>
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Les diagnostics immobiliers : guide complet pour les acheteurs</h3>
            <div className="space-y-4 text-gray-600">
              <p>Les diagnostics techniques constituent un dossier obligatoire que le vendeur doit fournir à l'acheteur. Savoir les interpréter vous permet d'évaluer l'état réel du bien et d'anticiper d'éventuels travaux ou négociations.</p>

              <div className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg">
                <span className="font-medium text-indigo-700">Diagnostic</span>
                <span className="text-sm text-indigo-600">Obligatoire depuis 2024</span>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">Diagnostics prioritaires à analyser</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border p-2 text-left">Diagnostic</th>
                        <th className="border p-2 text-left">Points d'attention</th>
                        <th className="border p-2 text-left">Impact sur votre achat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">
                          <span className="font-medium">DPE</span><br/>
                          <span className="text-xs">(Validité : 10 ans)</span>
                        </td>
                        <td className="border p-2">
                          <ul className="text-sm space-y-1">
                            <li>• Classes A à G (A = excellent)</li>
                            <li>• Consommation énergétique</li>
                            <li>• Émissions de gaz à effet de serre</li>
                          </ul>
                        </td>
                        <td className="border p-2 text-sm">
                          <span className="text-red-600 font-medium">Fort</span> - Les logements classés F et G perdent en valeur et seront interdits à la location d'ici 2028
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">
                          <span className="font-medium">Électricité</span><br/>
                          <span className="text-xs">(Validité : 3 ans)</span>
                        </td>
                        <td className="border p-2">
                          <ul className="text-sm space-y-1">
                            <li>• Conformité de l'installation</li>
                            <li>• Anomalies identifiées</li>
                            <li>• Risques pour la sécurité</li>
                          </ul>
                        </td>
                        <td className="border p-2 text-sm">
                          <span className="text-orange-600 font-medium">Modéré à fort</span> - Une installation non conforme nécessite une mise aux normes parfois coûteuse
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">
                          <span className="font-medium">Amiante</span><br/>
                          <span className="text-xs">(Illimité si négatif)</span>
                        </td>
                        <td className="border p-2">
                          <ul className="text-sm space-y-1">
                            <li>• Présence de matériaux amiantés</li>
                            <li>• État de conservation</li>
                            <li>• Préconisations de travaux</li>
                          </ul>
                        </td>
                        <td className="border p-2 text-sm">
                          <span className="text-red-600 font-medium">Fort</span> - Le désamiantage est très coûteux et peut rendre certains travaux impossibles
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-700">Impact des diagnostics sur le prix de vente</h4>
                <p className="mb-2">Les résultats des diagnostics peuvent justifier une négociation du prix :</p>
                <ul className="ml-6 space-y-1">
                  <li>• <strong>DPE F ou G</strong> : décote de 10 à 20% selon les régions</li>
                  <li>• <strong>Installation électrique vétuste</strong> : 5 000 à 15 000€ de travaux à prévoir</li>
                  <li>• <strong>Présence d'amiante</strong> : impact variable selon localisation et volume</li>
                  <li>• <strong>Plomb détecté</strong> : coût de traitement ou encapsulage à anticiper</li>
                  <li>• <strong>Termites</strong> : travaux potentiellement importants sur la structure</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-purple-800">
                  <strong>Ce qui change en 2024-2025 :</strong> À partir du 1er janvier 2025, la location des logements classés G au DPE sera interdite. Cette interdiction s'étendra aux logements F en 2028 puis E en 2034. Pour les acheteurs investisseurs, un DPE défavorable peut donc rendre un bien inexploitable à moyen terme sans rénovation énergétique.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-blue-700">Comment utiliser les diagnostics</h4>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>Demandez les diagnostics avant la visite</strong> quand c'est possible</li>
                  <li>• <strong>Vérifiez leur validité</strong> (date de réalisation)</li>
                  <li>• <strong>Consultez un professionnel</strong> pour estimer les coûts de remise aux normes</li>
                  <li>• <strong>Intégrez ces éléments dans votre offre</strong> et utilisez-les comme levier de négociation</li>
                  <li>• <strong>Prévoyez une condition suspensive</strong> dans le compromis pour des diagnostics manquants</li>
                </ul>
              </div>

              <div className="text-center mt-6">
                <a 
                  href="/diagnostics" 
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  En savoir plus sur les diagnostics
                </a>
              </div>
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
        <p className="text-gray-600 mt-2">Découvrez nos conseils et stratégies pour réussir votre projet d'achat immobilier</p>
      </div>

      <div className="grid gap-6 mb-8">
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${article.color} rounded-full flex items-center justify-center`}>
                <span className="text-2xl">{article.icon}</span>
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