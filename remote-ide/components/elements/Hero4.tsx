// components/Hero4.tsx
import React, { useState, useEffect } from "react";
import { MessageSquare, Send, X } from "lucide-react";

const Hero4 = () => {
  const [typingEffect, setTypingEffect] = useState("");
  const codeString = "Start typing your code here...";

  const [chatVisible, setChatVisible] = useState(true);
  const [messageText, setMessageText] = useState("Help me with my code");

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < codeString.length) {
        setTypingEffect(codeString.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);

    return () => clearInterval(typing);
  }, []);

  return (
    <div className="w-full  py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-5xl font-bold text-white mb-4 font-[Redwing-M]">
          AI-Powered Coding Assistant
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
          Get instant help with your code, debug issues, and learn new concepts
          with CodePulse's integrated AI coding assistant.
        </p>
      </div>

      {/* Editor with Chat */}
      <div className="max-w-5xl mx-auto relative">
        {/* Editor */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gray-800 flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="flex items-center">
              <div className="text-white text-xl font-semibold mr-4">
                CodePulse
              </div>
            </div>
            <div>
              <button className="bg-gray-700 text-gray-300 px-4 py-1 rounded text-sm">
                Cpp
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 border-r border-gray-700 h-96">
              <div className="p-4">
                <div className="text-blue-400 mb-2">Files</div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <button className="text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                      </svg>
                    </button>
                    <button className="text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </button>
                    <button className="text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </button>
                  </div>
                  <button className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>

                {/* File Tree */}
                <div>
                  <div className="flex items-center mb-1 text-blue-400 cursor-pointer hover:bg-gray-800 rounded px-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                    <span>SDE</span>
                  </div>
                  <div className="ml-5 text-blue-300">
                    <div className="flex items-center text-sm py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      <span>main.cpp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 bg-gray-900">
              <div className="flex">
                <div className="py-4 px-3 text-right text-gray-600 select-none border-r border-gray-800 bg-gray-900">
                  <div>1</div>
                </div>
                <div className="bg-black/30 rounded-md p-3 border border-gray-800 font-mono text-sm overflow-auto text-white">
                  <pre className="whitespace-pre-wrap">
                    <code>
                      <span className="text-blue-400">#include</span>{" "}
                      <span className="text-green-400">&lt;iostream&gt;</span>
                      {"\n"}
                      <span className="text-blue-400">#include</span>{" "}
                      <span className="text-green-400">&lt;thread&gt;</span>
                      {"\n"}
                      <span className="text-blue-400">#include</span>{" "}
                      <span className="text-green-400">&lt;chrono&gt;</span>
                      {"\n\n"}
                      <span className="text-purple-400">
                        void
                      </span> fetchData() {"{\n"}
                      &nbsp;&nbsp;std::cout &lt;&lt;{" "}
                      <span className="text-green-400">
                        "Fetching data..."
                      </span>{" "}
                      &lt;&lt; std::endl;{"\n"}
                      &nbsp;&nbsp;std::this_thread::sleep_for(std::chrono::seconds(2));
                      {"\n"}
                      &nbsp;&nbsp;std::cout &lt;&lt;{" "}
                      <span className="text-green-400">
                        "Data received!"
                      </span>{" "}
                      &lt;&lt; std::endl;{"\n"}
                      {"}"}
                      {"\n\n"}
                      <span className="text-purple-400">int</span> main(){" "}
                      {"{\n"}
                      &nbsp;&nbsp;std::thread t(fetchData);{"\n"}
                      &nbsp;&nbsp;t.join();{"\n"}
                      &nbsp;&nbsp;<span className="text-blue-400">
                        return
                      </span>{" "}
                      0;{"\n"}
                      {"}"}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`absolute ${
            chatVisible ? "bottom-0 right-0" : "bottom-16 right-4"
          } transition-all duration-200`}
        >
          {!chatVisible && (
            <button
              onClick={() => setChatVisible(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
            >
              <MessageSquare size={24} />
            </button>
          )}

          {chatVisible && (
            <div className="w-80 bg-blue-600 rounded-t-lg overflow-hidden shadow-xl">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center">
                  <MessageSquare size={20} className="text-white mr-2" />
                  <span className="text-white font-medium">Chat with Code</span>
                </div>
                <button
                  onClick={() => setChatVisible(false)}
                  className="text-white hover:bg-blue-700 p-1 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="bg-white h-64 overflow-y-auto p-4">
                <div className="flex mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <MessageSquare size={16} className="text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg py-2 px-3 max-w-xs">
                    <p className="text-gray-700 text-sm">
                      Hello! How can I assist you today?
                    </p>
                    <span className="text-gray-500 text-xs mt-1 block">
                      07:55 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="bg-gray-50 p-3 flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  className="ml-2 bg-blue-600 text-white p-2 rounded-lg"
                  onClick={() => setMessageText("")}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
<div className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
  {[
    {
      title: 'Instant Code Help',
      desc: 'Get solutions to coding problems and debugging assistance without leaving your editor.',
      gradient: 'from-pink-500 to-yellow-400'
    },
    {
      title: 'Contextual Learning',
      desc: 'Learn new coding concepts with explanations that understand your exact context and project.',
      gradient: 'from-sky-500 to-blue-400'
    },
    {
      title: 'AI Code Generation',
      desc: 'Generate boilerplate code, test cases, or entire functions based on natural language descriptions.',
      gradient: 'from-purple-500 to-indigo-400'
    }
  ].map((feature, index) => (
    <div
      key={index}
      className="relative bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-all hover:scale-[1.03] hover:shadow-2xl duration-300 overflow-hidden"
    >
      <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-30 blur-2xl rounded-full`} />
      <h3 className={`text-3xl font-[Redwing-L] font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`}>
        {feature.title}
      </h3>
      <p className="text-gray-300 text-sm z-10 relative">{feature.desc}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default Hero4;
