//FileCom.tsx
"use client";

import { useState } from "react";
import { File, Pencil, Trash2 } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";
import { RenamePopup } from "./RenamePopup";
import { DeletePopup } from "./DeletePopup";

export const FileCom = ({ fileId }: { fileId: string }) => {
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { files, setActiveFile } = useFileStore();
  const file = files.find((f) => f.id === fileId);

  if (!file) return null;

  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 cursor-pointer hover:text-blue-400 group"
        onClick={() => setActiveFile(fileId)}
      >
        <File size={14} />
        <span>{file.name}</span>
        <Pencil 
          size={18}
          className="ml-auto opacity-0 group-hover:opacity-100 text-white hover:text-blue-400 p-1 rounded transition-all" 
          onClick={(e) => {
            e.stopPropagation();
            setShowRenamePopup(true);
          }} 
        />
        <Trash2
          size={18}
          className="opacity-0 group-hover:opacity-100 text-white hover:text-red-400 p-1 rounded transition-all"
          onClick={(e) => {
            e.stopPropagation();
            setShowDeletePopup(true);
          }}
        />
      </div>

      {showRenamePopup && (
        <div className="absolute left-0 top-full mt-1 z-50">
          <RenamePopup
            itemId={fileId}
            currentName={file.name}
            onClose={() => setShowRenamePopup(false)}
          />
        </div>
      )}

      {showDeletePopup && (
        <div className="absolute left-0 top-full mt-1 z-50">
          <DeletePopup
            itemId={fileId}
            itemName={file.name}
            itemType="file"
            onClose={() => setShowDeletePopup(false)}
          />
        </div>
      )}
    </div>
  );
};
