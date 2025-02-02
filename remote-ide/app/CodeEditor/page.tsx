"use client";

import { useState, useRef, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Terminal, Folder, Users, Plus } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Header } from "./Header";
import { CODE_SNIPPETS, FILE_NAMES, THEMES } from "./constants";

export interface HeaderProps {
  code: string;
  setLanguage: React.Dispatch<React.SetStateAction<keyof typeof FILE_NAMES>>;
  Language: string;
  setoutput: (output: string) => void;
  seterror: (error: boolean) => void;
}

export default function CodeEditor() {
  const [Language, setLanguage] = useState<keyof typeof FILE_NAMES>("cpp");
  const [code, setCode] = useState<string>("");
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState("Terminal output will appear here...");
  const [error, setError] = useState(false);
  useEffect(() => {
    //@ts-ignore
    setCode(CODE_SNIPPETS[Language]);
  }, [Language]);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <Header
        code={code}
        setLanguage={setLanguage}
        Language={Language}
        setoutput={setOutput}
        seterror={setError}
      />
      <div className="flex-1 overflow-hidden">
        {/* Editor and Terminal */}
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25} minSize={20}>
            {/* File Explorer and Group Chat */}
            <PanelGroup direction="vertical">
              {/* File Explorer */}
              
              <Panel defaultSize={25} minSize={25}>
                <div className="h-full bg-gray-800 border-r border-gray-700 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Folder className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Files</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="cursor-pointer hover:bg-gray-700 p-1 rounded">
                      {FILE_NAMES[Language]}
                    </div>
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-gray-700 hover:bg-blue-500 transition-colors" />
              {/* Group Chat */}
              <Panel defaultSize={75} minSize={50}>
                <div className="h-full bg-gray-800 p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Group Chat</span>
                    </div>
                    <button
                      className="p-1 hover:bg-gray-700 rounded-md text-blue-400"
                      title="Add Group"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4 flex-1 overflow-y-auto text-gray-400 text-sm">
                    <div className="italic">No group chats available.</div>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-blue-500 transition-colors" />
          {/* Editor and Terminal */}
          <Panel defaultSize={75} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Editor */}
              <Panel defaultSize={60} minSize={20}>
                <div className="h-full bg-gray-800 border-b border-gray-700">
                  <Editor
                    height="100%"
                    language={Language}
                    theme={THEMES[0]}
                    defaultValue="Start typing your code here..."
                    onMount={handleEditorDidMount}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                  />
                </div>
              </Panel>
              <PanelResizeHandle className="h-1 bg-gray-700 hover:bg-blue-500 transition-colors" />
              <Panel defaultSize={40} minSize={20}>
                {/* Terminal */}
                <div className="h-full bg-gray-800 border-r border-gray-700 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Terminal className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Terminal</span>
                  </div>
                  <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    {error ? (
                      <div className="text-red-500">{output}</div>
                    ) : (
                      <div>{output}</div>
                    )}
                  </pre>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
