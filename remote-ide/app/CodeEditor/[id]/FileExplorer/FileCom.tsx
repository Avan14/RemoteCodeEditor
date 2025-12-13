import { File } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";

export const FileCom = ({ fileId }: { fileId: string }) => {
  const { files, setActiveFile } = useFileStore();
  const file = files.find((f) => f.id === fileId);

  if (!file) return null;

  return (
    <div
      className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
      onClick={() => setActiveFile(fileId)}
    >
      <File size={14} />
      <span>{file.name}</span>
    </div>
  );
};
