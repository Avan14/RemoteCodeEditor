import { create } from "zustand";

type EditorStore = {
  contents: Record<string, string>;
  updateContent: (fileId: string, code: string) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  contents: {},
  updateContent: (fileId, code) =>
    set((state) => ({
      contents: {
        ...state.contents,
        [fileId]: code,
      },
    })),
}));
