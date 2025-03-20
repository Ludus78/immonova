import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg text-indigo-700 mb-4">ImmoNova</h3>
          <p className="text-gray-600 mb-4">Votre partenaire pour un investissement immobilier réussi</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.956 6.293c.609-.001 1.126.21 1.524.582.443-.09.861-.26 1.237-.514.055-.03.11-.06.164-.089-.146.45-.437.83-.832 1.07l-.121.057c.405-.05.786-.152 1.143-.308l-.099.06c-.21.3-.477.566-.784.784-.083.057-.129.132-.129.229.001 3.225-2.463 6.946-6.963 6.946-1.38 0-2.668-.396-3.75-1.077.192.023.387.034.584.034 1.146 0 2.201-.388 3.036-1.038-1.067-.02-1.967-.71-2.279-1.658.149.028.303.043.461.043.223 0 .438-.03.644-.084-1.117-.225-1.953-1.21-1.953-2.391v-.031c.329.182.705.292 1.105.305-.655-.437-1.086-1.184-1.086-2.031 0-.448.12-.866.328-1.226 1.198 1.466 2.989 2.43 5.009 2.533-.041-.179-.063-.366-.063-.557 0-1.347 1.094-2.44 2.441-2.44.703 0 1.338.295 1.785.768.556-.11 1.08-.313 1.553-.594l-.183.068z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3.464 14.476h-2.31v-4.466h.77v3.695h1.54v.771zm.768-6.39H13.8v-.77h2.431v.77zm-5.031 4.23v2.16h-.77v-2.931h3.466v.77h-2.696zm.539-3.081v2.621h-.77v-2.621h-1.156v-.77H13.8v.77h-2.06zm-1.925 2.387v2.16h-.77v-2.621h1.156v-.77h-2.312v-.77h3.466v1.541h-1.54z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-800">Services</h4>
          <ul className="space-y-2">
            <li><Link href="/estimation" className="text-gray-600 hover:text-indigo-700">Estimation</Link></li>
            <li><Link href="/diagnostics" className="text-gray-600 hover:text-indigo-700">Diagnostics</Link></li>
            <li><Link href="/mise-en-valeur" className="text-gray-600 hover:text-indigo-700">Mise en valeur</Link></li>
            <li><Link href="/calculette" className="text-gray-600 hover:text-indigo-700">Calculette d'achat</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-800">Outils</h4>
          <ul className="space-y-2">
            <li><Link href="/frais-annexes" className="text-gray-600 hover:text-indigo-700">Frais annexes</Link></li>
            <li><Link href="/documents" className="text-gray-600 hover:text-indigo-700">Documents</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-800">Contact</h4>
          <p className="text-gray-600 mb-2">123 Avenue des Immobiliers</p>
          <p className="text-gray-600 mb-2">75001 Paris, France</p>
          <p className="text-gray-600 mb-2">contact@immonova.fr</p>
          <p className="text-gray-600">+33 1 23 45 67 89</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        © 2024 ImmoNova. Tous droits réservés.
      </div>
    </footer>
  );
} 