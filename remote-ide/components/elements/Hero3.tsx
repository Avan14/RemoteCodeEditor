// components/Hero3.tsx
import React, { useState, useEffect } from 'react';
import { Users, Code, MessageSquare } from 'lucide-react';

// Define a type for the user colors mapping
type UserColorMap = {
  [key: string]: string;
};

const Hero3 = () => {
  const [currentUser, setCurrentUser] = useState('Alex');
  const users = ['Alex', 'Sarah', 'Maria'];
  
  // Properly type the userColors object with an index signature
  const userColors: UserColorMap = {
    Alex: 'bg-blue-500',
    Sarah: 'bg-pink-500',
    Maria: 'bg-green-500'
  };

  const [typingEffect, setTypingEffect] = useState('');
  const codeString = "import { useState } from 'react';\nimport { Socket } from '@/lib/socket';\n\nfunction CodePulseEditor() {\n  const [code, setCode] = useState('');\n  const [collaborators, setCollaborators] = useState([]);\n\n  const syncChanges = (changes) => {\n    Socket.emit('code:update', changes);\n  };\n\n  // Realtime collaboration logic\n  return (\n    <div className=\"editor-container\">\n      {/* Editor implementation */}\n    </div>\n  )\n}";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < codeString.length) {
        setTypingEffect(codeString.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 30);

    return () => clearInterval(typing);
  }, []);

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Experience Collaborative Coding
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
          See how CodePulse transforms the way your team writes code together, with real-time
          edits, live cursors, and instant feedback.
        </p>

        {/* Editor Window */}
        <div className="relative mb-12 shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto">
          {/* Window Controls */}
          <div className="bg-gray-800 flex items-center justify-between px-4 py-2 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm">project/editor.js</div>
            <div className="text-gray-400 text-sm">JavaScript</div>
          </div>

          {/* Code Editor */}
          <div className="flex bg-gray-900 relative">
            {/* Line Numbers */}
            <div className="py-4 px-2 text-right text-gray-500 select-none bg-gray-800 border-r border-gray-700">
              {typingEffect.split('\n').map((_, i) => (
                <div key={i} className="h-6">{i + 1}</div>
              ))}
            </div>

            {/* Code Content */}
            <div className="p-4 font-mono text-sm text-left overflow-auto flex-grow">
              <pre className="text-gray-300">
                <code>
                  {typingEffect.split('\n').map((line, i) => (
                    <div key={i} className="h-6">
                      <span className="text-blue-400">
                        {line.includes('import') && line.split(' ')[0]}
                      </span>
                      <span className="text-yellow-300">
                        {line.includes('import') && line.includes('{') && 
                         line.substring(line.indexOf('{'), line.indexOf('}') + 1)}
                      </span>
                      <span className="text-blue-400">
                        {line.includes('import') && line.includes('from') && ' from '}
                      </span>
                      <span className="text-green-400">
                        {line.includes('from') && line.includes("'") && 
                         line.substring(line.indexOf("'"), line.lastIndexOf("'") + 1)}
                      </span>
                      <span className="text-purple-400">
                        {line.includes('function') && 'function '}
                      </span>
                      <span className="text-yellow-200">
                        {line.includes('function') && line.substring(line.indexOf(' ') + 1, line.indexOf('('))}
                      </span>
                      <span>
                        {!line.includes('import') && !line.includes('function') && line}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            {/* Collaborators */}
            <div className="absolute right-4 top-4 flex flex-col space-y-2">
              {users.map(user => (
                <div key={user} className={`flex items-center ${user === currentUser ? 'opacity-100' : 'opacity-70'}`}>
                  <div className={`w-8 h-8 ${userColors[user]} rounded-full flex items-center justify-center text-white font-medium`}>
                    {user.charAt(0)}
                  </div>
                  <div className={`ml-2 ${user === currentUser ? 'text-white' : 'text-gray-400'} text-xs`}>
                    <div>{user}</div>
                    <div>{user === currentUser ? 'editing' : user === 'Sarah' ? 'viewing' : 'joined'}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Bubble */}
            <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-90 p-3 rounded-lg max-w-xs border border-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                  S
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Sarah</div>
                  <div className="text-gray-300 text-sm">Let's add WebRTC support for the video calls next</div>
                  <div className="mt-2 p-2 bg-gray-900 rounded text-xs text-gray-300 font-mono">
                    import {`{ useVideoCall }`} from '@codepulse/video';
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">Seen</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Collaboration</h3>
            <p className="text-gray-400">Code together with your team members in real-time, see their cursors, and chat within the editor.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Cloud Workspaces</h3>
            <p className="text-gray-400">Access your projects from anywhere. All your code is synced to the cloud and available on any device.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Integrated Communication</h3>
            <p className="text-gray-400">Chat, video calls, and code reviews all in one place. No need to switch between different tools.</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300">
            Try CodePulse Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero3;