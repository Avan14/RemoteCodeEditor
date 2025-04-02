import { File } from "lucide-react";
import { FileTree} from "./types";

export const FileCom = ({ data }: { data: FileTree }) => {
  return (
    <div className="flex items-center gap-1 pt-1  text-white hover:text-blue-400 transition">
      <File className="h-4 w-4 text-blue-400" />
      <span>{data.name}</span>
    </div>
  );
};
