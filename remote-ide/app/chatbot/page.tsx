import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "I'm an AI assistant simulation. I can't actually process your request, but in a real implementation, I would provide a helpful response here.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-indigo-600 p-4">
          <div className="flex items-center space-x-2">
            <Bot className="text-white" size={24} />
            <h1 className="text-xl font-semibold text-white">AI Assistant</h1>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2.5 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 rounded-full p-2 ${
                message.sender === 'user' ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>
                {message.sender === 'user' ? (
                  <User size={20} className="text-indigo-600" />
                ) : (
                  <Bot size={20} className="text-gray-600" />
                )}
              </div>
              <div className={`flex flex-col ${
                message.sender === 'user' ? 'items-end' : 'items-start'
              }`}>
                <div className={`rounded-2xl px-4 py-2 max-w-md ${
                  message.sender === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
              disabled={!inputMessage.trim()}
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

export default App;