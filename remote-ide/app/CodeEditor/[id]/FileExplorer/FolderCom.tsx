import { useState } from "react";
import { Folder, ChevronDown, ChevronRight, Plus, Pencil } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";
import { FileCom } from "./FileCom";
import { AddItemPopup } from "./AddItemPopup";
import { RenamePopup } from "./RenamePopup";

export const FolderCom = ({ folderId }: { folderId: string }) => {
  const [open, setOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showRenamePopup, setShowRenamePopup] = useState(false);

  const { files } = useFileStore();

  const children = files.filter((f) => f.parentId === folderId);
  const folder = files.find((f) => f.id === folderId);

  if (!folder) return null;

  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 cursor-pointer hover:bg-blue-900/50 p-1 rounded group"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <Folder size={14} />
        <span>{folder.name}</span>
        <div className=" ml-auto flex items-center gap-1  group-hover:opacity-100 transition-opacity">
          <Pencil 
            size={18}
            className="text-white opacity-0 group-hover:opacity-100 hover:text-blue-400 p-1 rounded transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              setShowRenamePopup(true); 
            }} 
          />
          <Plus 
            size={18}
            className="text-white  hover:text-blue-400 p-1 rounded transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              setShowPopup(true);
            }} 
          />
        </div>
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
        <div className="relative pl-4 mt-1">
          <AddItemPopup 
            parentId={folderId}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}

      {showRenamePopup && (
        <div className="absolute left-0 top-full mt-1 z-50">
          <RenamePopup
            itemId={folderId}
            currentName={folder.name}
            onClose={() => setShowRenamePopup(false)}
          />
        </div>
      )}
    </div>
  );
};
