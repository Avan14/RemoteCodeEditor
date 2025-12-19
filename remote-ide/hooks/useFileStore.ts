import { create } from "zustand";
import { v4 as uuid } from "uuid";

export type FileNode = {
    id: string;
    name: string;
    type: "file" | "folder";
    parentId: string | null;
    language?: string;
};

// Helper function to infer language from file extension
function inferLanguageFromFileName(fileName: string): string | undefined {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (!ext) return undefined;

    const extensionMap: Record<string, string> = {
        'cpp': 'cpp',
        'cc': 'cpp',
        'cxx': 'cpp',
        'c': 'c',
        'js': 'javascript',
        'jsx': 'javascript',
        'py': 'python',
        'java': 'java',
        'cs': 'csharp',
        'ts': 'typescript',
        'tsx': 'typescript',
        'php': 'php',
        'go': 'go',
        'rb': 'ruby',
        'rs': 'rust',
        'kt': 'kotlin',
        'swift': 'swift',
        'sql': 'sqlite3',
        'ps1': 'powershell',
        'sh': 'bash',
        'm': 'matl',
        'dart': 'dart',
    };

    return extensionMap[ext];
}

type FileStore = {
    files: FileNode[];
    activeFileId: string | null;

    addFile: (name: string, parentId: string) => void;
    addFolder: (name: string, parentId: string) => void;
    setActiveFile: (id: string) => void;
    updateFileLanguage: (fileId: string, language: string) => void;
    renameFile: (fileId: string, newName: string) => void;
};

export const useFileStore = create<FileStore>((set) => ({
    files: [
        {
            id: "root",
            name: "SDE",
            type: "folder",
            parentId: null,
        },
    ],
    activeFileId: null,

    addFile: (name, parentId) =>
        set((state) => {
            const inferredLanguage = inferLanguageFromFileName(name);
            return {
                files: [
                    ...state.files,
                    {
                        id: uuid(),
                        name,
                        type: "file",
                        parentId,
                        language: inferredLanguage || "cpp", // Default to cpp if can't infer
                    },
                ],
            };
        }),

    addFolder: (name, parentId) =>
        set((state) => ({
            files: [
                ...state.files,
                {
                    id: uuid(),
                    name,
                    type: "folder",
                    parentId,
                },
            ],
        })),

    setActiveFile: (id) => set({ activeFileId: id }),

    updateFileLanguage: (fileId, language) =>
        set((state) => ({
            files: state.files.map((file) =>
                file.id === fileId ? { ...file, language } : file
            ),
        })),

    renameFile: (fileId, newName) =>
        set((state) => {
            // Update language if it's a file and extension changed
            const file = state.files.find((f) => f.id === fileId);
            const inferredLanguage = file?.type === "file" 
                ? inferLanguageFromFileName(newName) 
                : undefined;
            
            return {
                files: state.files.map((file) =>
                    file.id === fileId
                        ? {
                              ...file,
                              name: newName,
                              ...(inferredLanguage && { language: inferredLanguage }),
                          }
                        : file
                ),
            };
        }),
}));
