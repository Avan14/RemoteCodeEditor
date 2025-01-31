"use client";

import  { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, Settings, Terminal, Code2, Folder } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CodeEditor() {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('Terminal output will appear here...');
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');

  const handleRun = () => {
    // Simulate code execution
    setOutput(`Running code...\n${code}\n\nExecution complete!`);
  };

  const toggleLayout = () => {
    setLayout(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Code2 className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold">Online IDE</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="javascript">
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={handleRun}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Run</span>
            </button>
            <button
              onClick={toggleLayout}
              className="p-2 hover:bg-gray-700 rounded-md"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction={layout === 'horizontal' ? 'horizontal' : 'vertical'}>
          {/* File Explorer */}
          <Panel defaultSize={15} minSize={10}>
            <div className="h-full bg-gray-800 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Folder className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Files</span>
              </div>
              <div className="text-sm text-gray-400">
                <div className="cursor-pointer hover:bg-gray-700 p-1 rounded">index.js</div>
                <div className="cursor-pointer hover:bg-gray-700 p-1 rounded">styles.css</div>
                <div className="cursor-pointer hover:bg-gray-700 p-1 rounded">package.json</div>
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-blue-500 transition-colors" />

          <Panel defaultSize={50} minSize={30}>
            <div className="h-full">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-gray-800 text-white p-4 font-mono resize-none focus:outline-none"
                spellCheck="false"
              />
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-blue-500 transition-colors" />

          <Panel defaultSize={35} minSize={20}>
            <div className="h-full bg-gray-800">
              <div className="flex items-center space-x-2 p-2 border-b border-gray-700">
                <Terminal className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">Terminal</span>
              </div>
              <pre className="p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

