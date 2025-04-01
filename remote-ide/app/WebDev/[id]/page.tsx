"use client";

import { useState, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Terminal } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Header } from "./Header";
import { THEMES } from "../../../components/Constants/constants";
import { Chatbot } from "./chatbot";
import { Button } from "@/components/ui/button";
import { FileExplorer } from "./FileExplorer/FileExplorer";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import React from "react";
import { default_code } from "@/components/Constants/constants"

export default function CodeEditor() {
  const [code, setCode] = useState<string>(default_code);
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }


  const scope = { React };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col text-xs">
      <Header />
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25} minSize={20}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={25} minSize={25}>
                <FileExplorer />
              </Panel>
              <PanelResizeHandle className="h-1 bg-gray-700 hover:bg-blue-500 transition-colors" />
              <Panel defaultSize={75} minSize={50}>
                <Chatbot code={code} />
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="w-0.5 hover:bg-blue-500 transition-colors bg-gray-700" />
          <Panel defaultSize={50} minSize={10}>
            <div className="flex flex-row gap-1">
              <Button className="m-1">node.js</Button>
              <Button className="m-1">index.html</Button>
            </div>
            <div className="h-full w-full rounded-xl overflow-auto">
              <Editor
                height="100%"
                width="100%"
                language="javascript"
                theme={THEMES[0]}
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
          <Panel defaultSize={25} minSize={10}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={60} minSize={20}>
                <div>
                  <Button className="m-1" variant="ghost">
                    localhost:3000
                  </Button>
                </div>
                <LiveProvider code={code} scope={scope} noInline={true}>
                  <div className="grid grid-cols-2 gap-4 bg-slate-700 h-full m-2 rounded-lg p-2">
                    <LivePreview />
                  </div>
                </LiveProvider>
              </Panel>
              <PanelResizeHandle className="h-1 bg-gray-700 hover:bg-blue-500 transition-colors" />
              <Panel defaultSize={40} minSize={20}>
                <div className="h-full bg-gray-800 border-r border-gray-700 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Terminal className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Terminal</span>
                  </div>
                  <LiveProvider code={code} scope={scope} noInline={true}>
                    <div className="p-2 text-red-800 rounded-md">
                      <LiveError />
                    </div>
                  </LiveProvider>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
