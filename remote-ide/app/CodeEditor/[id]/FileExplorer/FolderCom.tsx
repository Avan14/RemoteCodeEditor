import { useState } from "react";
import { Folder, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";
import { FileCom } from "./FileCom";

export const FolderCom = ({ folderId }: { folderId: string }) => {
  const [open, setOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"file" | "folder">("file");

  const { files, addFile, addFolder } = useFileStore();

  const children = files.filter((f) => f.parentId === folderId);
  const folder = files.find((f) => f.id === folderId);

  if (!folder) return null;

  const handleAdd = () => {
    if (!name.trim()) return;
    type === "file" ? addFile(name, folderId) : addFolder(name, folderId);
    setName("");
    setShowPopup(false);
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 cursor-pointer hover:bg-blue-900/50 p-1 rounded"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <Folder size={14} />
        <span>{folder.name}</span>
        <Plus 
          className="ml-auto  text-white p-1 rounded" 
          onClick={(e) => {
            e.stopPropagation();
            setShowPopup(true);
          }} 
        />
      </div>

      {open && (
        <div className="pl-4">
          {children.map((child) =>
            child.type === "folder" ? (
              <FolderCom key={child.id} folderId={child.id} />
            ) : (
              <FileCom key={child.id} fileId={child.id} />
            )
          )}
        </div>
      )}

      {showPopup && (
        <div className="bg-black p-2 rounded border">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <select onChange={(e) => setType(e.target.value as any)}>
            <option value="file">File</option>
            <option value="folder">Folder</option>
          </select>
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );
};
