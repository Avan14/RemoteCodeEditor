// FileExplorer.tsx

import { useState } from "react";
import { FilePlus, FolderPlus, Search } from "lucide-react";
import { FolderCom } from "./FolderCom";
import { AddItemPopup } from "./AddItemPopup";

export const FileExplorer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"file" | "folder">("file");

  return (
    <div className="h-full p-4 bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] rounded-lg shadow-md border border-blue-900">
      <div className="flex items-center space-x-2 mb-4 justify-between border-b-2 border-gray-500 relative">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-medium text-base text-blue-400">Files</span>
        </div>
        <div className="flex items-center space-x-2">
          <FolderPlus 
            className="h-4 w-4 text-blue-400 cursor-pointer hover:opacity-80 transition" 
            onClick={() => {
              setPopupType("folder");
              setShowPopup(true);
            }}
          />
          <FilePlus 
            className="h-4 w-4 text-blue-400 cursor-pointer hover:opacity-80 transition" 
            onClick={() => {
              setPopupType("file");
              setShowPopup(true);
            }}
          />
          <Search className="h-4 w-4 text-blue-400 cursor-pointer hover:opacity-80 transition" />
        </div>
        {showPopup && (
          <AddItemPopup 
            parentId="root"
            initialType={popupType}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
      <FolderCom folderId="root" />
    </div>
  );
};