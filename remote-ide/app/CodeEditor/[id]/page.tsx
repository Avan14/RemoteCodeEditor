// CodeEditor/page.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Terminal } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Header } from "./Header";
import {
  CODE_SNIPPETS,
  DEFAULT_TEXT_FOR_FILE,
  DEFAULT_WARNING_UNKNOWN_FILES,
  FILE_NAMES,
  OPEN_FILE_WARNNING,
  PLAINTEXT,
  THEMES,
} from "./constants";

import { Button } from "@/components/ui/button";
import { FileExplorer } from "./FileExplorer/FileExplorer";
import { useFileStore } from "@/hooks/useFileStore";
import { useEditorStore } from "@/hooks/useEditorStore";
import { useParams } from "next/navigation";

export default function CodeEditor() {

  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState(DEFAULT_TEXT_FOR_FILE);
  const [error, setError] = useState(false);

  const activeFileId = useFileStore((state) => state.activeFileId);
  const resetFileStore = useFileStore(s => s.reset);
  const files = useFileStore((state) => state.files);
  const hydrateFromBackend = useFileStore((state) => state.hydrateFromBackend);

  const { contents, updateContent } = useEditorStore();
  const { id: projectId } = useParams<{ id: string }>();

  const code = activeFileId ? contents[activeFileId] ?? "" : "";
  // Get the active file
  const activeFile = activeFileId
    ? files.find((f) => f.id === activeFileId)
    : null;


  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  const language = activeFile?.language ?? "";
  const editorLanguage = language || PLAINTEXT;
  const isRunnable = Boolean(language);

  useEffect(() => {
    if (!activeFileId) return;

    if (!activeFile) {
      setError(false);
      setOutput(OPEN_FILE_WARNNING);
      return;
    }

    if (!isRunnable) {
      setError(true);
      setOutput(DEFAULT_WARNING_UNKNOWN_FILES);
    }
  }, [activeFileId, activeFile?.name, isRunnable]);

  // Initialize code snippet when file is first opened
  useEffect(() => {
    if (!activeFileId || !activeFile) return;

    // Only initialize if file has no content and has a language
    if (contents[activeFileId] === undefined && activeFile.language) {
      const snippet =
        CODE_SNIPPETS[activeFile.language as keyof typeof CODE_SNIPPETS] ?? "";
      if (snippet) {
        updateContent(activeFileId, snippet);
      }
    }
  }, [activeFileId, activeFile?.language]);

  useEffect(() => {
    if (!projectId) return;

    resetFileStore(); // flush old folder structure

    const loadProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) return;

        const data = await res.json();
        console.log(data);
        hydrateFromBackend(data.tree);
      } catch (err) {
        console.error("Failed to load project", err);
      }
    };

    loadProject();
  }, [projectId]);

  return (
    <div className="h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] text-white flex flex-col text-xs">
      <Header
        code={code}
        language={language}
        fileName={activeFile?.name}
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
                {activeFile?.name ||
                  (language
                    ? FILE_NAMES[language as keyof typeof FILE_NAMES]
                    : "No file selected")}
              </Button>
            </div>
            <div className="h-full text-xs w-full rounded-xl overflow-auto">
              <Editor
                height="100%"
                width="100%"
                language={editorLanguage}
                theme={THEMES[0]}
                defaultValue="Start typing your code here..."
                onMount={handleEditorDidMount}
                value={code}
                onChange={(val) =>
                  activeFileId && updateContent(activeFileId, val || "")
                }
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
