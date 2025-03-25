"use client";

import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useSession } from "next-auth/react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: number;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  
  // Référence au champ de saisie
  const inputRef = useRef<HTMLInputElement>(null);

  // Charger l'historique de conversation quand le widget s'ouvre
  useEffect(() => {
    if (isOpen && !isHistoryLoaded) {
      fetchChatHistory();
    }
  }, [isOpen, isHistoryLoaded]);

  // Récupérer l'historique de conversation
  const fetchChatHistory = async () => {
    try {
      const response = await fetch("/api/chat/history");
      
      if (response.ok) {
        const data = await response.json();
        
        // Convertir les messages du format BDD au format local
        if (data.messages && Array.isArray(data.messages)) {
          const formattedMessages = data.messages.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            sender: msg.sender as "user" | "bot",
            timestamp: new Date(msg.timestamp).getTime()
          }));
          
          setMessages(formattedMessages);
        }
      }
      
      setIsHistoryLoaded(true);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique:", error);
      setIsHistoryLoaded(true); // Marquer comme chargé même en cas d'erreur
    }
  };

  // Gérer les clics en dehors du chat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        if (isOpen) setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll automatique vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Générer un ID unique pour le message
    const messageId = Date.now().toString();
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: messageId,
      content: inputValue,
      sender: "user",
      timestamp: Date.now()
    };
    
    // Mettre à jour les messages avec le message de l'utilisateur
    setMessages(currentMessages => [...currentMessages, userMessage]);
    
    const sentMessage = inputValue;
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Envoyer le message à notre API pour obtenir une réponse
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: sentMessage })
      });
      
      const data = await response.json();
      
      // Vérifier si la réponse contient un message d'erreur explicite
      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }
      
      // Ajouter la réponse du bot avec une valeur par défaut si la réponse est vide
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response || "Je suis désolé, je n'ai pas pu comprendre votre demande. Pourriez-vous reformuler votre question ?",
        sender: "bot",
        timestamp: Date.now()
      };
      
      // Mettre à jour les messages avec la réponse du bot
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      
      // Message d'erreur
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer avec une autre question.",
        sender: "bot",
        timestamp: Date.now()
      };
      
      // Mettre à jour les messages avec le message d'erreur
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Formatage de l'heure du message
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {/* Bouton de chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 max-h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header du chat */}
          <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-primary-700 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg font-bold">C</span>
              </div>
              <div>
                <h3 className="font-semibold">Claude</h3>
                <p className="text-xs text-primary-200">Assistant immobilier ImmoNova</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: "300px" }}>
            {messages && messages.length > 0 ? (
              messages.map(message => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}>
                    <div className="text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 text-right ${
                      message.sender === "user" ? "text-primary-200" : "text-gray-500"
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Bonjour, je suis Claude, votre assistant immobilier.</p>
                <p className="mt-2">Comment puis-je vous aider aujourd'hui ?</p>
              </div>
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-3 flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre message..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className={`px-4 py-2 rounded-r-md ${
                  isLoading || !inputValue.trim()
                    ? "bg-gray-300 text-gray-500"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                } transition-colors focus:outline-none`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              <p>Claude recherche les informations sur le web pour vous apporter les meilleures réponses.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 