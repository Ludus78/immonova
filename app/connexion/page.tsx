"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConnexionPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Une erreur est survenue');
      }
      
      setForgotPasswordSuccess(true);
    } catch (error) {
      let message = 'Une erreur est survenue lors de l\'envoi de l\'email de récupération';
      if (error instanceof Error) {
        message = error.message;
      }
      setError(message);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {showForgotPassword ? "Récupération de mot de passe" : "Connexion à votre compte"}
          </h2>
          {!showForgotPassword && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{" "}
              <Link href="/inscription" className="font-medium text-indigo-600 hover:text-indigo-500">
                créez un compte
              </Link>
            </p>
          )}
        </div>
        
        {!showForgotPassword ? (
          // Formulaire de connexion
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </div>
          </form>
        ) : (
          // Formulaire de récupération de mot de passe
          <div className="mt-8 space-y-6">
            {forgotPasswordSuccess ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Si un compte existe avec cette adresse email, vous recevrez un email de récupération de mot de passe.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="rounded-md shadow-sm">
                  <div>
                    <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse email
                    </label>
                    <input
                      id="forgot-email"
                      name="email"
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Votre adresse email"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-2 text-red-500 text-sm text-center">{error}</div>
                )}

                <p className="mt-2 text-sm text-gray-500">
                  Entrez l'adresse email associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>

                <div className="mt-4 flex flex-col space-y-3">
                  <button
                    type="submit"
                    disabled={forgotPasswordLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {forgotPasswordLoading ? "Envoi en cours..." : "Envoyer le lien de récupération"}
                  </button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setError(null);
                      }}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                    >
                      Retour à la connexion
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 