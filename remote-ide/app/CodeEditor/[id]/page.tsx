"use client";

import { useState, useRef, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  Terminal
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { Header } from "./Header";
import { CODE_SNIPPETS, FILE_NAMES, THEMES } from "./constants";

import { Button } from "@/components/ui/button";
import { FileExplorer } from "./FileExplorer/FileExplorer";

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
    <div className="h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] text-white flex flex-col text-xs">
      <Header
        code={code}
        setLanguage={setLanguage}
        Language={Language}
        setoutput={setOutput}
        seterror={setError}
      />
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <Panel
            defaultSize={25}
            minSize={20}
            className="bg-gray-900 bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] rounded-lg shadow-md border border-blue-900"
          >
           <FileExplorer></FileExplorer>
          </Panel>
          <PanelResizeHandle className="w-0.5 hover:bg-blue-500 transition-colors bg-gray-700" />
          {/* Main Editor Panel updated with gradient, shadow, and side borders */}
          <Panel
            defaultSize={50}
            minSize={10}
            className="bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] shadow-md border border-blue-900 border-r-4 border-l-4"
          >
            <div className="flex flex-row gap-1">
              <Button className="m-1 border-[1px] border-zinc-500">
                {FILE_NAMES[Language as keyof typeof FILE_NAMES]}
              </Button>
            </div>
            <div className="h-full text-xs w-full rounded-xl overflow-auto">
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
                  minimap: { enabled: false },
                  padding: { bottom: 4, top: 6 },
                }}
              />
            </div>
          </Panel>
          <PanelResizeHandle className="w-0.5 bg-gray-700 hover:bg-blue-500 transition-colors mx-2" />
          {/* Right Terminal Panel updated to use gradient and matching borders */}
          <Panel
            defaultSize={25}
            minSize={10}
            className="bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] shadow-md border border-blue-900"
          >
            <PanelGroup direction="vertical">
              <Panel
                defaultSize={40}
                minSize={20}
                className="bg-gray-800 border-r bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] shadow-md border border-blue-900"
              >
                <div className="h-full p-4">
                  <div className="flex items-center space-x-2 mb-2 border-b-2 border-gray-700">
                    <Terminal className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Terminal</span>
                  </div>
                  <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-y-auto h-full">
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
