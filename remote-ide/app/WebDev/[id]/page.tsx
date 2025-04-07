"use client";

import { useState, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Terminal } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Header } from "./Header";
import { THEMES } from "../../../components/Constants/constants";
import { Button } from "@/components/ui/button";
import { FileExplorer } from "./FileExplorer/FileExplorer";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import React from "react";
import { default_code } from "@/components/Constants/constants";
import { FileTree } from "./FileExplorer/types";
import { useUserdata } from "@/app/context/UserDataContext";
import { useParams } from "next/navigation";

export default function WebDev() {

  const [code, setCode] = useState<string>(default_code);
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: { focus: () => void }) {
    editorRef.current = editor;
    editor.focus();
  }

  const scope = { React };

  return (
    <div className="h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] text-white flex flex-col text-xs">
      <Header />
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25} minSize={20} className="bg-gray-900">
            <FileExplorer  />
          </Panel>
          <PanelResizeHandle className=" hover:bg-blue-500 transition-colors " />
          <Panel
            defaultSize={50}
            minSize={10}
            className="bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000]  shadow-md border border-blue-900 border-r-4 border-l-4"
          >
            <div className="flex flex-row gap-1">
              <Button className="m-1">node.js</Button>
              <Button className="m-1">index.html</Button>
            </div>
            <div className="h-full w-full rounded-xl overflow-auto  ">
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
          <PanelResizeHandle className=" hover:bg-blue-500 transition-colors " />
          <Panel defaultSize={25} minSize={10} className="bg-gray-900">
            <PanelGroup direction="vertical">
              <Panel
                defaultSize={60}
                minSize={20}
                className="bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000]  shadow-md border border-blue-900"
              >
                <div>
                  <Button className="m-1" variant="ghost">
                    localhost:3000
                  </Button>
                </div>
                <LiveProvider code={code} scope={scope} noInline={true}>
                  <div className="grid grid-cols-2 gap-4 bg-gray-800 h-full m-2 rounded-lg p-2">
                    <LivePreview />
                  </div>
                </LiveProvider>
              </Panel>
              <PanelResizeHandle className=" hover:bg-blue-500 transition-colors" />
              <Panel defaultSize={40} minSize={20} className="">
                <div className="h-full bg-gray-800 border-r bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000]  shadow-md border border-blue-900">
                  <div className="flex items-center  mb-2 border-b-2 w-5/6 m-auto border-gray-500 h-9">
                    <Terminal className="h-4 w-4 text-gray-400 m-4" />
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
