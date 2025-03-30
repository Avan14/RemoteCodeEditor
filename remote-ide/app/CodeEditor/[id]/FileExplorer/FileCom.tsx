
import { File } from "lucide-react";
import { TFile } from "./types";

export const FileCom = ({ data }: { data: TFile }) => {
  return (
    <div className="flex items-center gap-1">
      <File className="h-4 w-4 text-gray-400" />
      <span>{data.name}</span>
    </div>
  );
};
