// FolderCom.tsx
import { useState } from "react";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";
import { TFolder, TFile } from "./types";
import { FileCom } from "./FileCom";

export const FolderCom = ({ data }: { data: TFolder }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* Folder Header */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer hover:bg-gray-700 p-1 rounded flex gap-1 items-center"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
        <Folder className="h-4 w-4 text-gray-400" />
        <span>{data.name}</span>
      </div>
      {/* Folder Children */}
      {open && (
        <div className="pl-6">
          {data.children.map((child) => {
            if (child.type.toLowerCase() === "folder") {
              return <FolderCom key={child.id} data={child as TFolder} />;
            } else {
              return <FileCom key={child.id} data={child as TFile} />;
            }
          })}
        </div>
      )}
    </div>
  );
};
