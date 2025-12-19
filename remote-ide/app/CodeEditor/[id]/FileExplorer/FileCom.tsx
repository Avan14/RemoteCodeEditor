"use client";

import { useState } from "react";
import { File, Pencil } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";
import { RenamePopup } from "./RenamePopup";

export const FileCom = ({ fileId }: { fileId: string }) => {
  const [showRenamePopup, setShowRenamePopup] = useState(false);
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
    </div>
  );
};
