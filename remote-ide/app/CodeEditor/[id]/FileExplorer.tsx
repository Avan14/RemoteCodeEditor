import { useState } from "react";
import { File, FilePlus, Folder, FolderPlus, Search, ChevronRight, ChevronDown } from "lucide-react";

export const FileExplorer = () => {
  const [isFolderOpen, setIsFolderOpen] = useState(true); 

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

      {/* File Structure */}
      <div className="text-sm text-gray-400">
        {/* Collapsible Folder */}
        <div
          onClick={() => setIsFolderOpen(!isFolderOpen)}
          className="cursor-pointer hover:bg-gray-700 p-1 rounded flex gap-1 items-center"
        >
          {isFolderOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
          <Folder className="h-4 w-4 text-gray-400" /> App
        </div>

        {/* Nested Files (Visible only when folder is open) */}
        {isFolderOpen && (
          <div className="pl-6 space-y-1">
            <div className="flex items-center">
              <File className="h-4 w-4 text-gray-400" /> index.html
            </div>
            <div className="flex items-center">
              <File className="h-4 w-4 text-gray-400" /> style.css
            </div>
            <div className="flex items-center">
              <File className="h-4 w-4 text-gray-400" /> script.js
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
