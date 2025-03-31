// FileExplorer.tsx
import { FilePlus, FolderPlus, Search } from "lucide-react";
import { FolderCom } from "./FolderCom";
import { Folder_Example, TFolder } from "./types";

export const FileExplorer = () => {
  return (
    <div className="h-full p-4">
      {/* Top Header Section */}
      <div className="flex items-center space-x-2 mb-4 justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-sm">Files</span>
        </div>
        <div className="flex items-center space-x-2">
          <FolderPlus className="h-4 w-4 text-gray-400" />
          <FilePlus className="h-4 w-4 text-gray-400" />
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {/* file tree recursive call */}
      <FolderCom data={Folder_Example as TFolder} />
    </div>
  );
};
