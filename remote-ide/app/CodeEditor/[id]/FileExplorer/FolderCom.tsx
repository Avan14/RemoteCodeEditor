import { useState } from "react";
import { Folder, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { FileTree } from "./types";
import { FileCom } from "./FileCom";

export const FolderCom = ({ data }: { data: FileTree }) => {
  const [open, setOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("File");

  const add_To_FileTree = () => {
    setShowPopup(true);
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const newItem: FileTree = {
      id: Math.random().toString(36),
      name: newItemName,
      type: newItemType as "Folder" | "File",
      children: [],
    };

    data.children.push(newItem);
    setNewItemName("");
    setShowPopup(false);
  };

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        onAuxClick={add_To_FileTree}
        className="cursor-pointer hover:bg-blue-900/50 p-1 rounded flex gap-1 items-center transition"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 text-blue-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-blue-400" />
        )}
        <Folder className="h-4 w-4 text-blue-400" />
        <span className="text-white">{data.name}</span>
        <Plus
          className="h-4 w-4 text-white ml-auto cursor-pointer"
          onClick={add_To_FileTree}
        />
      </div>
      {open && (
        <div className="pl-6 border-l border-blue-900 ml-2">
          {data.children.map((child) => {
            if (child.type === "Folder") {
              return <FolderCom key={child.id} data={child as FileTree} />;
            } else {
              return <FileCom key={child.id} data={child as FileTree} />;
            }
          })}
        </div>
      )}

      {showPopup && (
        <div className="absolute bg-gray-800 p-4 gap-2 items-center text-white flex flex-col bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] rounded-lg shadow-md border border-blue-900">
          <input
            type="text"
            placeholder="Enter name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="p-1 rounded text-black"
          />
          <select
            value={newItemType}
            onChange={(e) => setNewItemType(e.target.value)}
            className="p-1 rounded text-black ml-2"
          >
            <option value="File">File</option>
            <option value="Folder">Folder</option>
          </select>
          <div>
            <button
              onClick={handleAddItem}
              className="bg-blue-500 p-1 rounded ml-2"
            >
              Add
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-500 p-1 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
