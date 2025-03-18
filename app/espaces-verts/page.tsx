import Navigation from "../components/Navigation";

export default function EspacesVerts() {
  const places = [
    {
      name: "Parc des Buttes-Chaumont",
      type: "Parc",
      address: "1 Rue Botzaris, 75019 Paris",
      distance: "800m",
      rating: 4.9,
      features: ["Lac", "Aires de jeux", "Tables de pique-nique", "Toilettes"],
      image: "https://placehold.co/600x400/252525/FFFFFF/png?text=Parc+Buttes-Chaumont",
      description: "Un des plus grands et des plus charmants espaces verts de Paris, avec collines, grottes, cascades et un temple romantique."
    },
    {
      name: "Square de Belleville",
      type: "Jardin",
      address: "47 Rue des Couronnes, 75020 Paris",
      distance: "1.2km",
      rating: 4.6,
      features: ["Fontaine", "Aire de jeux", "Terrain de pétanque"],
      image: "https://placehold.co/600x400/252525/FFFFFF/png?text=Square+Belleville",
      description: "Offre une vue exceptionnelle sur Paris et dispose d'espaces de jeux pour les enfants."
    },
    {
      name: "Base de loisirs de Jablines",
      type: "Base de loisirs",
      address: "77450 Jablines",
      distance: "35km",
      rating: 4.7,
      features: ["Baignade", "Voile", "Plage", "Activités nautiques"],
      image: "https://placehold.co/600x400/252525/FFFFFF/png?text=Base+Jablines",
      description: "Idéale pour les journées d'été, cette base de loisirs propose de nombreuses activités nautiques."
    },
    {
      name: "Ludothèque Les Petits Joueurs",
      type: "Ludothèque",
      address: "10 Rue des Lilas, 75019 Paris",
      distance: "500m",
      rating: 4.5,
      features: ["Jeux de société", "Animations", "Évènements"],
      image: "https://placehold.co/600x400/252525/FFFFFF/png?text=Ludothèque",
      description: "Espace dédié aux jeux avec des animations régulières pour les enfants de tous âges."
    },
    {
      name: "Piscine Georges Vallerey",
      type: "Piscine",
      address: "148 Avenue Gambetta, 75020 Paris",
      distance: "1.5km",
      rating: 4.3,
      features: ["Bassin olympique", "Bassin d'apprentissage", "Cours de natation"],
      image: "https://placehold.co/600x400/252525/FFFFFF/png?text=Piscine",
      description: "Piscine olympique proposant des cours pour tous les niveaux et des créneaux familiaux le week-end."
    },
    {
      name: "Centre d'animation Louis Lumière",
      type: "Centre d'animation",
      address: "46 Rue Louis Lumière, 75020 Paris",
      distance: "1.3km",
      rating: 4.4,
      features: ["Activités culturelles", "Sport", "Ateliers créatifs"],
      image: "https://placehold.co/600x400/252525/FFFFFF/png?text=Centre+Animation",
      description: "Propose de nombreuses activités culturelles et sportives pour toute la famille."
    }
  ];

  const activities = [
    {
      name: "Ateliers Créatifs pour Enfants",
      location: "Centre Culturel de Belleville",
      schedule: "Mercredi 14h-16h et Samedi 10h-12h",
      ageRange: "4-12 ans",
      price: "10€ la séance",
      description: "Ateliers de peinture, poterie et autres activités manuelles adaptés à différentes tranches d'âge."
    },
    {
      name: "Cours de Cirque Familial",
      location: "Association CircoFamille",
      schedule: "Dimanche 10h-12h",
      ageRange: "Parents et enfants",
      price: "25€/famille par séance",
      description: "Initiation aux arts du cirque pour parents et enfants, favorisant la complicité familiale."
    },
    {
      name: "Éveil Musical",
      location: "Conservatoire du 20ème",
      schedule: "Samedi 9h30-10h30",
      ageRange: "2-5 ans",
      price: "120€/trimestre",
      description: "Découverte des instruments et initiation à la musique pour les tout-petits."
    }
  ];

  return (
    <div className="min-h-screen bg-[#131316] text-white">
      <Navigation />
      
      <div className="pt-20 p-8 sm:p-20">
        <section className="max-w-6xl mx-auto mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center">Espaces Verts & Activités Familiales</h1>
          <p className="text-xl text-gray-300 text-center mb-12">
            Découvrez les parcs, aires de jeux et activités familiales à proximité pour améliorer votre qualité de vie quotidienne.
          </p>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Entrez votre adresse ou quartier" 
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a35] text-white"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition whitespace-nowrap">
                Rechercher
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-full text-sm transition">
                Parcs et jardins
              </button>
              <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-full text-sm transition">
                Aires de jeux
              </button>
              <button className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-full text-sm transition">
                Activités enfants
              </button>
              <button className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-full text-sm transition">
                Piscines
              </button>
              <button className="px-4 py-2 bg-yellow-700 hover:bg-yellow-800 rounded-full text-sm transition">
                Bases de loisirs
              </button>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Espaces Verts et Loisirs à Proximité</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place, index) => (
                <div key={index} className="bg-[#1e1e24] rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-blue-400">{place.name}</h3>
                      <div className="flex items-center bg-blue-900 px-2 py-1 rounded text-sm">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span>{place.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-1">{place.type}</p>
                    <p className="text-gray-400 text-sm">{place.address}</p>
                    <p className="text-green-500 text-sm mb-3">À {place.distance} de votre recherche</p>
                    
                    <p className="text-gray-300 text-sm mb-3">{place.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {place.features.map((feature, featureIndex) => (
                        <span 
                          key={featureIndex} 
                          className="text-xs bg-[#2a2a35] px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-sm">
                        Itinéraire
                      </button>
                      <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm">
                        Plus d'infos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Activités Régulières pour Familles</h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="bg-[#1e1e24] p-5 rounded-lg hover:bg-[#24242c] transition">
                  <h3 className="text-xl font-bold text-purple-400">{activity.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p><span className="text-gray-400">Lieu:</span> {activity.location}</p>
                      <p><span className="text-gray-400">Horaires:</span> {activity.schedule}</p>
                      <p><span className="text-gray-400">Âge:</span> {activity.ageRange}</p>
                      <p><span className="text-gray-400">Tarif:</span> {activity.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">{activity.description}</p>
                      <button className="mt-3 bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded text-sm">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#1e1e24] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Carte des Espaces Verts</h2>
            <div className="bg-[#2a2a35] h-96 rounded-lg flex items-center justify-center mb-6">
              <p className="text-gray-400">Carte interactive des espaces verts et aires de jeux</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-300">
                Voir tous les espaces verts dans un rayon de 2km autour de votre adresse.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition">
                Ouvrir en plein écran
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 