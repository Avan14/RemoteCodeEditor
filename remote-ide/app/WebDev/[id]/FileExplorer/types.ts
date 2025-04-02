
export type FileTree = {
    id: string,
    name: string,
    type: "Folder" | "File"
    children: FileTree[] 
}

export const Folder_Example = {
    "id": "root",
    "name": "react_project",
    "type": "Folder",
    "children": [
        {
            "id": "public",
            "name": "public",
            "type": "Folder",
            "children": [
                {
                    "id": "index.html",
                    "name": "index.html",
                    "type": "File"
                },
                {
                    "id": "favicon.ico",
                    "name": "favicon.ico",
                    "type": "File"
                }
            ]
        },
        {
            "id": "src",
            "name": "src",
            "type": "Folder",
            "children": [
                {
                    "id": "components",
                    "name": "components",
                    "type": "Folder",
                    "children": [
                        {
                            "id": "Header.jsx",
                            "name": "Header.jsx",
                            "type": "File"
                        },
                        {
                            "id": "Footer.jsx",
                            "name": "Footer.jsx",
                            "type": "File"
                        }
                    ]
                },
                {
                    "id": "pages",
                    "name": "pages",
                    "type": "Folder",
                    "children": [
                        {
                            "id": "Home.jsx",
                            "name": "Home.jsx",
                            "type": "File"
                        },
                        {
                            "id": "About.jsx",
                            "name": "About.jsx",
                            "type": "File"
                        }
                    ]
                },
                {
                    "id": "App.jsx",
                    "name": "App.jsx",
                    "type": "File"
                },
                {
                    "id": "index.js",
                    "name": "index.js",
                    "type": "File"
                },
                {
                    "id": "styles.css",
                    "name": "styles.css",
                    "type": "File"
                }
            ]
        },
        {
            "id": "package.json",
            "name": "package.json",
            "type": "File"
        },
        {
            "id": ".gitignore",
            "name": ".gitignore",
            "type": "File"
        },
        {
            "id": "README.md",
            "name": "README.md",
            "type": "File"
        }
    ]
}