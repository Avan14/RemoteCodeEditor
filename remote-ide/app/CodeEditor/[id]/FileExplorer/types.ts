
export type FileTree = {
    id: string,
    name: string,
    type: "Folder" | "File"
    children: FileTree[] 
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