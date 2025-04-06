
// types.ts

export type FileTree = {
    id: string;
    name: string;
    type: "Folder" | "File";
    code?: string;
    children?: FileTree[];
  };
  
  export type ProjectType = {
    project_id: string;
    name: string;
    type: string;
    date: Date;
    language: string;
    folder: FileTree;
  };
  
  export type UserType = {
    id: string;
    name: string;
    projects: ProjectType[];
  };
  

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