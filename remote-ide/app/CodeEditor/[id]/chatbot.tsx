"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { fetchAIResponse } from "@/components/elements/ChatbotRes";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatbotProps {
  code: string;
}

export function Chatbot({ code }: ChatbotProps) {
  const AutoScrollRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // scrolls to bottom after the message is added by the bot
  const ScrollToBottom = () => {
    if (AutoScrollRef.current) {
      AutoScrollRef.current.scrollTo({
        top: AutoScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    ScrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    const thinkingMessage: Message = {
      id: messages.length + 2,
      text: "Thinking...",
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, thinkingMessage]);

    setLoading(true);

    const AIresponse = await fetchAIResponse({
      prompt: code + " " + inputMessage,
    });

    const aiMessage: Message = {
      id: messages.length + 3,
      text: AIresponse,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setInputMessage("");
    setLoading(false);
  };

  return (
    <div className="h-full flex items-center justify-center p-2">
      <div className="w-full h-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 p-4 h-1/5">
          <div className="flex items-center space-x-2">
            <Bot className="text-white" size={16} />
            <h1 className="text-lg font-semibold text-white">chat with code</h1>
          </div>
        </div>
        {/* Messages Container */}

        <div
          ref={AutoScrollRef}
          className="h-3/5 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2.5 ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`flex-shrink-0 rounded-full p-2 ${
                  message.sender === "user" ? "bg-indigo-100" : "bg-gray-100"
                }`}
              >
                {message.sender === "user" ? (
                  <User size={20} className="bg-blue-600" />
                ) : (
                  <Bot size={20} className="text-gray-600" />
                )}
              </div>
              <div
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-md ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {/* Using ReactMarkdown to render message.*/}
                  <ReactMarkdown className="prose prose-sm">
                    {message.text}
                  </ReactMarkdown>
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200"
        >
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:bg-blue-700 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              disabled={!inputMessage.trim() || loading}
            >
              <span>Send</span>
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
