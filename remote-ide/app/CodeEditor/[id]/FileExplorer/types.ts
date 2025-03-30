
export type TFolder = {
    id: string,
    name: string,
    type: "Folder"
    children: TFolder[] | TFile[]
}

export type TFile = {
    id: string,
    name: string,
    type: "File"
}

export const Folder_Example = {
    id: "main",
    name: "main",
    type: "Folder",
    children: [{
        id: "main_inside1",
        name: "main_inside1",
        type: "Folder",
        children: [{
            id: "index.html",
            name: "index.html",
            type: "file"
        }, {
            id: "index.style",
            name: "index.style",
            type: "file"
        }]

    }, {
        id: "main_inside2",
        name: "main_inside2",
        type: "Folder",
         children: [{
            id: "index.html",
            name: "index.html",
            type: "file"
        }, {
            id: "index.style",
            name: "index.style",
            type: "file"
        }]
    }]
}