
// types.ts

// user
export type UserType = {
  id: string;
  name: string;
};
// projects
export type ProjectState = {
  id: string
  name: string
  slug?: string
  track: 'WebDevelopment' | 'SoftWareDevelopment'
  isPrivate: boolean
  createdAt: string
}
// files and folders
export type DocumentNode = {
  id: string
  projectId: string
  parentId: string | null
  type: 'file' | 'folder'
  name: string
  extension: string | null
  isDeleted: boolean
}


// folder tree made from doc node
export type TreeNode = {
  id: string
  type: DocumentType
  name: string
  extension: string | null
  children?: TreeNode[]
}
// file content
export type FileContentState = {
  fileId: string
  content: string
  language: string | null
  isDirty: boolean
  lastSavedAt: string | null
}

export type EditorState = {
  activeFileId: string | null
  openFileIds: string[]
}

export type ProjectWorkspaceState = {
  project: ProjectState
  documents: Record<string, DocumentNode>
  tree: TreeNode
  files: Record<string, FileContentState>
  editor: EditorState
}

export const Folder_Example = {
  "id": "root",
  "name": "SDE",
  "type": "Folder",
  "children": [
    {
      "id": "main.cpp",
      "name": "main.cpp",
      "type": "File"
    },
  ]
}