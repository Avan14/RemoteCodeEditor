"use client";

import { useState, useRef, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Terminal, Folder, Users, Plus, Ghost } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Header } from "./Header";
import { CODE_SNIPPETS, FILE_NAMES, THEMES } from "./constants";
import { Chatbot } from "./chatbot";
import { Button } from "@/components/ui/button";
import { FileExplorer } from "./FileExplorer";

export interface HeaderProps {
  code: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  Language: string;
  setoutput: (output: string) => void;
  seterror: (error: boolean) => void;
}

export default function CodeEditor() {
  const [Language, setLanguage] = useState<string>("");
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
    <div className="h-screen bg-gray-900 text-white flex flex-col text-xs">
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
                <FileExplorer></FileExplorer>
              </Panel>

              <PanelResizeHandle className="h-1 bg-gray-700 hover:bg-blue-500 transition-colors" />
              {/* Group Chat / chat bot*/}
              <Panel defaultSize={75} minSize={50}>
                <Chatbot code={code} />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-0.5 hover:bg-blue-500 transition-colors  bg-gray-700" />
          {/*Editor*/}
          <Panel defaultSize={50} minSize={10}>
            {/*files*/}
            <div className="flex flex-row gap-1 ">
              <Button className="m-1">node.js</Button>
              <Button className="m-1">index.html</Button>
            </div>
            <div className="h-full text-xs   w-full rounded-xl overflow-auto ">
              <Editor
                height="100%"
                width="100%"
                language={Language}
                theme={THEMES[0]}
                defaultValue="Start typing your code here..."
                onMount={handleEditorDidMount}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: {
                    enabled: false,
                  },
                  padding: {
                    bottom: 4,
                    top: 6,
                  },
                }}
              />
            </div>
          </Panel>
          <PanelResizeHandle className="w-0.5 bg-gray-700 hover:bg-blue-500 transition-colors mx-2 " />

          {/* code preview and  Terminal */}
          <Panel defaultSize={25} minSize={10}>
            <PanelGroup direction="vertical">
              {/*preview */}
              <Panel defaultSize={60} minSize={20}>
                <div>
                  <Button className="m-1 " variant="ghost">
                    localhost:3000
                  </Button>
                </div>
                <div className="flex flex-col gap-4 p-4 rounded-lg">
                  <div className="border rounded-md p-4 bg-white shadow-md">
                    <iframe
                      title="Live Preview"
                      className="w-full h-60 border-none"
                    />
                  </div>
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
                  <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-y-auto h-full ">
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
