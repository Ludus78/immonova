"use client";

import { useState } from "react";

type Message = {
    content: string;
    isUser: boolean;
};

export default function ChatWidget() {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue;
        setMessages(prev => [...prev, { content: userMessage, isUser: true }]);
        setIsLoading(true);
        setInputValue("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { content: data, isUser: false }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, { content: "Sorry, there was an error. Please try again.", isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="flex flex-col gap-4">
                <div className="bg-white rounded-lg shadow-lg p-4 max-h-[400px] overflow-y-auto w-[300px]">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}
                        >
                            <div
                                className={`inline-block p-3 rounded-lg ${message.isUser
                                    ? "bg-primary-600 text-white"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="text-left">
                            <div className="inline-block p-3 rounded-lg bg-gray-100 text-gray-800">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type your message..."
                        className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className={`px-4 py-2 rounded-r-md ${isLoading || !inputValue.trim()
                            ? "bg-gray-300 text-gray-500"
                            : "bg-primary-600 text-white hover:bg-primary-700"
                            } transition-colors focus:outline-none`}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
