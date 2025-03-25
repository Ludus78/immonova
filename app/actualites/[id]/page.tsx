"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaTag, FaArrowLeft, FaUser } from 'react-icons/fa';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  publishedAt?: Date | string;
  formattedDate?: string;
  authorName?: string;
  imageUrl?: string;
};

export default function ArticleDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.email === "admin@immonova.fr";
  
  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/news/${id}`);
        
        if (!response.ok) {
          throw new Error("Impossible de récupérer l'article");
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'article:", err);
        setError("Nous n'avons pas pu charger l'article demandé. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchArticle();
    }
  }, [id]);
  
  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error("Impossible de supprimer l'article");
      }
      
      // Rediriger vers le dashboard après la suppression
      router.push('/dashboard?tab=actualites');
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert("Une erreur est survenue lors de la suppression de l'article");
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">Chargement de l'article...</p>
        </div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Article introuvable</h1>
          <p className="text-gray-600 mb-6">{error || "L'article que vous recherchez n'existe pas ou a été supprimé."}</p>
          <Link 
            href="/dashboard?tab=actualites" 
            className="inline-flex items-center text-primary-600 hover:text-primary-800"
          >
            <FaArrowLeft className="mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }
  
  // Définition des couleurs de catégories
  const categoryColors: Record<string, string> = {
    'marché': 'bg-blue-100 text-blue-800',
    'financement': 'bg-green-100 text-green-800',
    'législation': 'bg-purple-100 text-purple-800',
    'réglementation': 'bg-purple-100 text-purple-800',
    'tendances': 'bg-orange-100 text-orange-800',
    'investissement': 'bg-amber-100 text-amber-800', 
    'conseils': 'bg-teal-100 text-teal-800',
    'default': 'bg-gray-100 text-gray-800'
  };
  
  const categoryColor = categoryColors[article.category.toLowerCase()] || categoryColors.default;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Lien de retour */}
      <div className="mb-6">
        <Link 
          href="/dashboard?tab=actualites" 
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          <FaArrowLeft className="mr-2" />
          Retour aux actualités
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image d'en-tête */}
        <div className="relative h-64 w-full">
          <Image
            src={article.imageUrl || '/images/default-news.jpg'}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-6 md:p-8">
          {/* Méta-informations */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <span className={`${categoryColor} text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center mb-2 md:mb-0`}>
              <FaTag className="mr-1" size={10} />
              {article.category}
            </span>
            
            <div className="flex items-center space-x-4">
              {article.authorName && (
                <span className="text-sm text-gray-600 flex items-center">
                  <FaUser className="mr-1" size={12} />
                  {article.authorName}
                </span>
              )}
              
              <span className="text-sm text-gray-600 flex items-center">
                <FaCalendarAlt className="mr-1" size={12} />
                {article.formattedDate || 
                 (typeof article.publishedAt === 'string' 
                  ? new Date(article.publishedAt).toLocaleDateString('fr-FR') 
                  : article.publishedAt instanceof Date 
                  ? article.publishedAt.toLocaleDateString('fr-FR') 
                  : 'Date inconnue')}
              </span>
            </div>
          </div>
          
          {/* Titre */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          {/* Résumé */}
          <div className="text-lg text-gray-700 font-medium mb-6 italic">
            {article.excerpt}
          </div>
          
          {/* Contenu */}
          <div className="prose prose-lg max-w-none text-gray-700">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
            ) : (
              <p>{article.excerpt}</p>
            )}
          </div>
          
          {/* Actions admin */}
          {isAdmin && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end space-x-4">
                <Link
                  href={`/dashboard?tab=actualites&edit=${article.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Modifier l'article
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
} 