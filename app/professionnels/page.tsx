import Navigation from "../components/Navigation";

export default function Professionnels() {
  const categories = [
    {
      name: "Santé",
      icon: "🏥",
      color: "#e67e22",
      professionals: [
        {
          name: "Dr. Martin",
          profession: "Médecin généraliste",
          address: "15 rue des Lilas, 75020",
          phone: "01 42 XX XX XX",
          rating: 4.8,
          notes: "Accueille les nouveaux patients, rendez-vous en ligne disponible"
        },
        {
          name: "Dr. Dupont",
          profession: "Pédiatre",
          address: "3 avenue des Roses, 75020",
          phone: "01 43 XX XX XX",
          rating: 4.9,
          notes: "Plus de 20 ans d'expérience, spécialiste des jeunes enfants"
        },
        {
          name: "Cabinet Santé Plus",
          profession: "Dentiste",
          address: "27 boulevard Saint-Michel, 75020",
          phone: "01 44 XX XX XX",
          rating: 4.5,
          notes: "Plusieurs praticiens, urgences acceptées"
        }
      ]
    },
    {
      name: "Éducation",
      icon: "👶",
      color: "#2980b9",
      professionals: [
        {
          name: "Crèche Les Petits Loups",
          profession: "Crèche privée",
          address: "10 rue du Commerce, 75020",
          phone: "01 45 XX XX XX",
          rating: 4.7,
          notes: "Accueil de 7h30 à 19h, 30 places"
        },
        {
          name: "Nounou & Vous",
          profession: "Agence garde d'enfants",
          address: "5 rue de la Paix, 75020",
          phone: "01 46 XX XX XX",
          rating: 4.6,
          notes: "Garde à domicile, service d'urgence disponible"
        }
      ]
    },
    {
      name: "Services",
      icon: "🔧",
      color: "#27ae60",
      professionals: [
        {
          name: "Électricité Martin",
          profession: "Électricien",
          address: "23 rue Oberkampf, 75020",
          phone: "01 47 XX XX XX",
          rating: 4.8,
          notes: "Intervention rapide, devis gratuit"
        },
        {
          name: "Plomberie Express",
          profession: "Plombier",
          address: "8 rue des Pyrénées, 75020",
          phone: "01 48 XX XX XX",
          rating: 4.5,
          notes: "Dépannage 7j/7, tarifs transparents"
        },
        {
          name: "Clean & Fresh",
          profession: "Service de ménage",
          address: "12 rue de Belleville, 75020",
          phone: "01 49 XX XX XX",
          rating: 4.6,
          notes: "Personnel qualifié, produits écologiques"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9f7f5] text-[#34495e]">
      <Navigation />
      
      <div className="pt-20 p-8 sm:p-20">
        <section className="max-w-5xl mx-auto mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-[#2c3e50] font-['Montserrat']">Professionnels Recommandés</h1>
          <p className="text-xl text-[#5d6d7e] text-center mb-12 font-['Nunito']">
            Découvrez les professionnels de confiance dans votre quartier pour faciliter votre installation.
          </p>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Entrez votre code postal ou quartier" 
                className="w-full px-4 py-3 rounded-lg bg-[#f0eeec] text-[#34495e] border border-[#ddd]"
              />
              <button className="bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-3 rounded-lg font-bold transition">
                Rechercher
              </button>
            </div>
          </div>
          
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-[#2c3e50] font-['Montserrat']">{category.name}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.professionals.map((pro, proIndex) => (
                    <div key={proIndex} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-l-4" style={{borderLeftColor: category.color}}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold" style={{color: category.color}}>{pro.name}</h3>
                        <div className="flex items-center bg-[#f0eeec] px-2 py-1 rounded">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{pro.rating}</span>
                        </div>
                      </div>
                      <p className="text-[#34495e] font-medium mt-1 font-['Nunito']">{pro.profession}</p>
                      <p className="text-[#5d6d7e] mt-3 font-['Nunito']">{pro.address}</p>
                      <p className="text-[#5d6d7e] font-['Nunito']">{pro.phone}</p>
                      <p className="mt-3 text-sm text-[#5d6d7e] font-['Nunito']">{pro.notes}</p>
                      
                      <div className="flex gap-2 mt-4">
                        <button className="bg-[#27ae60] hover:bg-[#219653] text-white px-3 py-1 rounded text-sm">
                          Appeler
                        </button>
                        <button className="bg-[#2980b9] hover:bg-[#2471a3] text-white px-3 py-1 rounded text-sm">
                          Site web
                        </button>
                        <button className="bg-[#8e44ad] hover:bg-[#703688] text-white px-3 py-1 rounded text-sm">
                          Itinéraire
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md border-t-4 border-[#e67e22]">
            <h2 className="text-2xl font-bold mb-4 text-[#2c3e50] font-['Montserrat']">Suggestions de la communauté</h2>
            <p className="text-[#5d6d7e] mb-6 font-['Nunito']">
              Connaissez-vous un professionnel de qualité dans le quartier ? Partagez-le avec les autres membres !
            </p>
            <button className="bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-3 rounded-lg font-bold transition">
              Suggérer un professionnel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
} 