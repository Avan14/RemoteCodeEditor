import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { useEditorStore } from "./useEditorStore";

function validateNodeName(
    files: FileNode[],
    parentId: string | null,
    name: string,
    nodeType: "file" | "folder",
    excludeId?: string
): string | null {
    const trimmed = name.trim();
    if (!trimmed) {
        return "Name cannot be empty";
    }
    if (trimmed.length > 255) {
        return "Name is too long (max 255 characters)";
    }
    if (INVALID_CHARS.test(trimmed)) {
        return "Name contains invalid characters: < > : \" / \\ | ? * and control characters";
    }
    if (nodeType === "folder" && trimmed.includes(".")) {
        return "Folders cannot contain a dot (.)";
    }
    if (trimmed.startsWith(".") || trimmed.endsWith(".") || trimmed.endsWith(" ")) {
        return "Name cannot start with a dot or end with a dot or space";
    }
    const siblings = files.filter(
        (f) => f.parentId === parentId && (excludeId ? f.id !== excludeId : true)
    );
    const siblingNames = siblings.map((c) => c.name.toLowerCase());
    if (siblingNames.includes(trimmed.toLowerCase())) {
        return "A file or folder with this name already exists";
    }
    return null;
}

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
export type FileNode = {
    id: string;
    name: string;
    type: "file" | "folder";
    parentId: string | null;
    language?: string;
};

type ActionResult =
    | { ok: true; id?: string }
    | { ok: false; error: string };

const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1f]/;


type BackendTreeNode = {
    id: string
    name: string
    type: "file" | "folder"
    extension?: string | null
    children?: BackendTreeNode[]
}

function flattenTree(
    node: BackendTreeNode,
    parentId: string | null,
    acc: FileNode[]
) {
    const language =
        node.type === "file" && node.extension
            ? inferLanguageFromFileName(`${node.name}.${node.extension}`)
            : undefined

    acc.push({
        id: node.id,
        name: node.type === "file" && node.extension
            ? `${node.name}.${node.extension}`
            : node.name,
        type: node.type,
        parentId,
        language,
    })

    if (node.children) {
        for (const child of node.children) {
            flattenTree(child, node.id, acc)
        }
    }
}

type FileStore = {
    files: FileNode[];
    activeFileId: string | null;

    addFile: (name: string, parentId: string) => ActionResult;
    addFolder: (name: string, parentId: string) => ActionResult;
    setActiveFile: (id: string) => void;
    updateFileLanguage: (fileId: string, language: string) => void;
    renameFile: (fileId: string, newName: string) => ActionResult;
    deleteNode: (nodeId: string) => ActionResult;
    hydrateFromBackend: (tree: BackendTreeNode) => void;
    reset: () => void;
};

function collectDescendantIds(files: FileNode[], nodeId: string): string[] {
    const ids: string[] = [nodeId];
    const children = files.filter((f) => f.parentId === nodeId);
    for (const child of children) {
        ids.push(...collectDescendantIds(files, child.id));
    }
    return ids;
}

export const useFileStore = create<FileStore>()(
    persist(
        (set, get) => ({
            files: [
                {
                    id: "root",
                    name: "SDE",
                    type: "folder",
                    parentId: null,
                },
            ],
            activeFileId: null,

            addFile: (name, parentId) => {
                const trimmedName = name.trim();
                const error = validateNodeName(
                    get().files,
                    parentId,
                    trimmedName
                    ,
                    "file"
                );
                if (error) return { ok: false, error };

                const id = uuid();
                const inferredLanguage = inferLanguageFromFileName(trimmedName);

                set((state) => ({
                    files: [
                        ...state.files,
                        {
                            id,
                            name: trimmedName,
                            type: "file",
                            parentId,
                            language: inferredLanguage,
                        },
                    ],
                }));

                return { ok: true, id };
            },

            addFolder: (name, parentId) => {
                const trimmedName = name.trim();
                const error = validateNodeName(
                    get().files,
                    parentId,
                    trimmedName
                    ,
                    "folder"
                );
                if (error) return { ok: false, error };

                const id = uuid();
                set((state) => ({
                    files: [
                        ...state.files,
                        {
                            id,
                            name: trimmedName,
                            type: "folder",
                            parentId,
                        },
                    ],
                }));

                return { ok: true, id };
            },

            setActiveFile: (id) => set({ activeFileId: id }),

            updateFileLanguage: (fileId, language) =>
                set((state) => ({
                    files: state.files.map((file) =>
                        file.id === fileId ? { ...file, language } : file
                    ),
                })),

            renameFile: (fileId, newName) => {
                const state = get();
                const existing = state.files.find((f) => f.id === fileId);
                if (!existing) return { ok: false, error: "Item not found" };

                const trimmedName = newName.trim();
                if (trimmedName === existing.name) return { ok: true, id: fileId };

                const error = validateNodeName(
                    state.files,
                    existing.parentId,
                    trimmedName,
                    existing.type,
                    fileId
                );
                if (error) return { ok: false, error };

                const inferredLanguage =
                    existing.type === "file"
                        ? inferLanguageFromFileName(trimmedName)
                        : undefined;

                set((prev) => ({
                    files: prev.files.map((file) =>
                        file.id === fileId
                            ? {
                                ...file,
                                name: trimmedName,
                                ...(file.type === "file"
                                    ? { language: inferredLanguage }
                                    : {}),
                            }
                            : file
                    ),
                }));

                return { ok: true, id: fileId };
            },

            deleteNode: (nodeId) => {
                if (nodeId === "root") return { ok: false, error: "Root folder cannot be deleted" };

                const state = get();
                const existing = state.files.find((f) => f.id === nodeId);
                if (!existing) return { ok: false, error: "Item not found" };

                const idsToDelete = collectDescendantIds(state.files, nodeId);
                const idsSet = new Set(idsToDelete);

                const fileIdsToDelete = state.files
                    .filter((f) => f.type === "file" && idsSet.has(f.id))
                    .map((f) => f.id);

                set((prev) => {
                    const nextFiles = prev.files.filter((f) => !idsSet.has(f.id));
                    const nextActive =
                        prev.activeFileId && idsSet.has(prev.activeFileId)
                            ? null
                            : prev.activeFileId;
                    return { files: nextFiles, activeFileId: nextActive };
                });

                if (fileIdsToDelete.length) {
                    useEditorStore.getState().deleteContents(fileIdsToDelete);
                }

                return { ok: true, id: nodeId };
            },

            hydrateFromBackend: (tree) => {
                const flattened: FileNode[] = []
                flattenTree(tree, null, flattened)
                console.log("Hydrating with", flattened)
                set({
                    files: flattened,
                    activeFileId: null,
                })
            },

            reset: () => {
                set({ files: [], activeFileId: null })
            }
        }),
        {
            name: "rce-file-store",
        }
    )
);
