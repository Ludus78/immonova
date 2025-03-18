import Navigation from "../components/Navigation";

export default function Ecoles() {
  const schools = [
    {
      name: "École Maternelle Henri Wallon",
      type: "Maternelle (Public)",
      address: "10 rue des Vignes, 75020 Paris",
      distance: "450m",
      rating: 4.2,
      capacity: "180 élèves",
      sections: "Petite, Moyenne et Grande section",
      activities: ["Éveil musical", "Activités artistiques", "Jardin pédagogique"],
      notes: "Cantine bio, accueil de 8h à 18h30"
    },
    {
      name: "École Primaire Jean Jaurès",
      type: "Élémentaire (Public)",
      address: "24 avenue de la République, 75020 Paris",
      distance: "800m",
      rating: 4.5,
      capacity: "350 élèves",
      sections: "CP au CM2",
      activities: ["Anglais renforcé", "Classe découverte annuelle", "Théâtre"],
      notes: "Projet pédagogique axé sur l'environnement, bibliothèque fournie"
    },
    {
      name: "Collège Françoise Dolto",
      type: "Collège (Public)",
      address: "15 rue des Pyrénées, 75020 Paris",
      distance: "1.2km",
      rating: 4.0,
      capacity: "520 élèves",
      sections: "6ème à 3ème, SEGPA",
      activities: ["Section sportive football", "Chinois en LV2", "Club robotique"],
      notes: "Bons résultats au brevet, accompagnement personnalisé"
    },
    {
      name: "Lycée Maurice Ravel",
      type: "Lycée (Public)",
      address: "89 cours de Vincennes, 75020 Paris",
      distance: "1.5km",
      rating: 4.4,
      capacity: "950 élèves",
      sections: "Seconde à Terminale, BTS",
      activities: ["Section européenne", "Prépa scientifique", "Théâtre et arts plastiques"],
      notes: "Taux de réussite au bac: 95%, nombreuses options"
    },
    {
      name: "École Montessori de l'Est Parisien",
      type: "Maternelle & Primaire (Privé)",
      address: "35 rue Saint-Blaise, 75020 Paris",
      distance: "950m",
      rating: 4.8,
      capacity: "80 élèves",
      sections: "De 3 à 11 ans",
      activities: ["Pédagogie Montessori", "Anglais quotidien", "Sorties culturelles hebdomadaires"],
      notes: "Petits effectifs, suivi personnalisé, frais de scolarité élevés"
    },
    {
      name: "École Sainte-Claire",
      type: "Maternelle & Primaire (Privé sous contrat)",
      address: "8 rue de Buzenval, 75020 Paris",
      distance: "700m",
      rating: 4.6,
      capacity: "280 élèves",
      sections: "Maternelle et Élémentaire",
      activities: ["Catéchisme (optionnel)", "Chorale", "Échecs"],
      notes: "Établissement catholique, uniforme, bonne réputation"
    }
  ];

  const filterOptions = [
    { label: "Distance", options: ["< 500m", "< 1km", "< 2km", "Tous"] },
    { label: "Type", options: ["Maternelle", "Élémentaire", "Collège", "Lycée", "Tous"] },
    { label: "Statut", options: ["Public", "Privé sous contrat", "Privé hors contrat", "Tous"] },
    { label: "Pédagogie", options: ["Classique", "Montessori", "Freinet", "Steiner", "Tous"] }
  ];

  return (
    <div className="min-h-screen bg-[#f9f7f5] text-[#34495e]">
      <Navigation />
      
      <div className="pt-20 p-8 sm:p-20">
        <section className="max-w-6xl mx-auto mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-[#2c3e50] font-['Montserrat']">Établissements Scolaires</h1>
          <p className="text-xl text-[#5d6d7e] text-center mb-12 font-['Nunito']">
            Visualisez les écoles, collèges et lycées à proximité pour choisir le meilleur environnement pour vos enfants.
          </p>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Entrez l'adresse du bien immobilier" 
                className="w-full px-4 py-3 rounded-lg bg-[#f0eeec] text-[#34495e] border border-[#ddd]"
              />
              <button className="bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-3 rounded-lg font-bold transition whitespace-nowrap">
                Rechercher
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {filterOptions.map((filter, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-[#34495e] mb-2 font-medium font-['Nunito']">{filter.label}</label>
                  <select className="w-full bg-[#f0eeec] p-3 rounded-lg text-[#34495e] border border-[#ddd]">
                    {filter.options.map((option, optIndex) => (
                      <option key={optIndex}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2980b9] h-full">
                <h2 className="text-2xl font-bold mb-4 text-[#2c3e50] font-['Montserrat']">Carte des Établissements Scolaires</h2>
                <div className="bg-[#f0eeec] h-96 rounded-lg flex items-center justify-center mb-6">
                  <p className="text-[#5d6d7e]">Carte interactive des établissements scolaires</p>
                </div>
                <p className="text-[#5d6d7e] mb-4 font-['Nunito']">
                  La carte montre tous les établissements dans un rayon de 2km autour de l'adresse spécifiée.
                </p>
                <div className="flex flex-wrap gap-3 text-sm font-['Nunito']">
                  <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span> Maternelle</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> Élémentaire</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span> Collège</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> Lycée</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-1"></span> Privé</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#27ae60]">
                <h2 className="text-2xl font-bold mb-4 text-[#2c3e50] font-['Montserrat']">Statistiques Scolaires</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-medium text-[#2980b9] mb-2 font-['Montserrat']">Secteur Public</h3>
                    <p className="flex justify-between mb-1 font-['Nunito']">
                      <span className="text-[#5d6d7e]">Taux de réussite brevet:</span>
                      <span className="font-bold text-[#34495e]">89%</span>
                    </p>
                    <p className="flex justify-between mb-1 font-['Nunito']">
                      <span className="text-[#5d6d7e]">Taux de réussite bac:</span>
                      <span className="font-bold text-[#34495e]">93%</span>
                    </p>
                    <p className="flex justify-between mb-1 font-['Nunito']">
                      <span className="text-[#5d6d7e]">Élèves par classe (moyenne):</span>
                      <span className="font-bold text-[#34495e]">24</span>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-[#2980b9] mb-2 font-['Montserrat']">Secteur Privé</h3>
                    <p className="flex justify-between mb-1 font-['Nunito']">
                      <span className="text-[#5d6d7e]">Taux de réussite brevet:</span>
                      <span className="font-bold text-[#34495e]">97%</span>
                    </p>
                    <p className="flex justify-between mb-1 font-['Nunito']">
                      <span className="text-[#5d6d7e]">Taux de réussite bac:</span>
                      <span className="font-bold text-[#34495e]">99%</span>
                    </p>
                    <p className="flex justify-between mb-1 font-['Nunito']">
                      <span className="text-[#5d6d7e]">Élèves par classe (moyenne):</span>
                      <span className="font-bold text-[#34495e]">18</span>
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-[#eee]">
                    <p className="text-sm text-[#5d6d7e] font-['Nunito']">
                      Données basées sur les statistiques officielles de l'Éducation Nationale pour l'année scolaire 2022-2023.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#2c3e50] font-['Montserrat']">Établissements à Proximité</h2>
            <div className="space-y-4">
              {schools.map((school, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg border-l-4 border-[#2980b9] transition">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-[#2980b9] font-['Montserrat']">{school.name}</h3>
                    <div className="flex items-center bg-[#f0eeec] px-2 py-1 rounded">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{school.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <p className="text-[#34495e] font-medium font-['Nunito']">{school.type}</p>
                      <p className="text-[#5d6d7e] mt-1 font-['Nunito']">{school.address}</p>
                      <p className="text-green-600 text-sm mt-1 font-['Nunito']">À {school.distance} de l'adresse</p>
                      
                      <div className="mt-4">
                        <p className="text-[#5d6d7e] font-['Nunito']"><span className="font-medium">Effectif:</span> {school.capacity}</p>
                        <p className="text-[#5d6d7e] font-['Nunito']"><span className="font-medium">Niveaux:</span> {school.sections}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[#34495e] font-medium mb-2 font-['Nunito']">Points forts:</p>
                      <ul className="list-disc list-inside text-[#5d6d7e] text-sm space-y-1 font-['Nunito']">
                        {school.activities.map((activity, actIndex) => (
                          <li key={actIndex}>{activity}</li>
                        ))}
                      </ul>
                      
                      <p className="text-sm text-[#5d6d7e] mt-3 font-['Nunito']">{school.notes}</p>
                      
                      <div className="flex gap-2 mt-4">
                        <button className="bg-[#2980b9] hover:bg-[#2471a3] text-white px-3 py-1 rounded text-sm">
                          Fiche détaillée
                        </button>
                        <button className="bg-[#27ae60] hover:bg-[#219653] text-white px-3 py-1 rounded text-sm">
                          Itinéraire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 