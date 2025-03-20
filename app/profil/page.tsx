"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      setSuccess("Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error) {
      setError("Une erreur est survenue lors de la mise à jour du profil");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Informations du compte</h2>
          <p className="text-gray-600">{session?.user?.email}</p>
          <p className="text-gray-600">
            Statut : {session?.user?.isPremium ? "Premium" : "Standard"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-600">{session?.user?.name || "Non défini"}</p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}

          {success && (
            <div className="text-green-500 text-sm mb-4">{success}</div>
          )}

          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setName(session?.user?.name || "");
                    setError(null);
                    setSuccess(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Modifier
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 