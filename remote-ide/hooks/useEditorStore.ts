import { create } from "zustand";
import { persist } from "zustand/middleware";

type EditorStore = {
  contents: Record<string, string>;
  updateContent: (fileId: string, code: string) => void;
  deleteContents: (fileIds: string[]) => void;
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      contents: {},
      updateContent: (fileId, code) =>
        set((state) => ({
          contents: {
            ...state.contents,
            [fileId]: code,
          },
        })),
      deleteContents: (fileIds) =>
        set((state) => {
          const next = { ...state.contents };
          for (const id of fileIds) {
            delete next[id];
          }
          return { contents: next };
        }),
    }),
    {
      name: "rce-editor-store",
    }
  )
);
