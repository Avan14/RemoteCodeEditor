// FileExplorer.tsx

import { FilePlus, FolderPlus, Search } from "lucide-react";
import { FolderCom } from "./FolderCom";

export const FileExplorer = () => {
  return (
    <div className="h-full p-4 bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] rounded-lg shadow-md border border-blue-900">
      <div className="flex items-center space-x-2 mb-4 justify-between  border-b-2 border-gray-500 ">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-medium text-base text-blue-400 ">Files</span>
        </div>
        <div className="flex items-center space-x-2">
          <FolderPlus className="h-4 w-4 text-blue-400 cursor-pointer hover:opacity-80 transition" />
          <FilePlus className="h-4 w-4 text-blue-400 cursor-pointer hover:opacity-80 transition" />
          <Search className="h-4 w-4 text-blue-400 cursor-pointer hover:opacity-80 transition" />
        </div>
      </div>
      <FolderCom folderId="root" />
    </div>
  );
};