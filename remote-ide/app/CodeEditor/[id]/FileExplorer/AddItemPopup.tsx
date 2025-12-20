//AddItemPopup.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";

interface AddItemPopupProps {
  parentId: string;
  initialType?: "file" | "folder";
  onClose: () => void;
}

export const AddItemPopup = ({
  parentId,
  initialType = "file",
  onClose,
}: AddItemPopupProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"file" | "folder">(initialType);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const { addFile, addFolder } = useFileStore();

  // Focus input when popup opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAdd = () => {
    const result =
      type === "file" ? addFile(name, parentId) : addFolder(name, parentId);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      ref={popupRef}
      className="absolute z-50 bg-gray-800 border border-blue-500 rounded-lg p-3 shadow-lg min-w-[250px]"
      style={{ top: "100%", left: 0, marginTop: "8px" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-400">
          New {type === "file" ? "File" : "Folder"}
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        onKeyDown={handleKeyDown}
        placeholder={`Enter ${type === "file" ? "file" : "folder"} name`}
        className="w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm mb-2 focus:outline-none focus:border-blue-500"
      />

      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value as "file" | "folder");
          setError("");
        }}
        className="w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm mb-2 focus:outline-none focus:border-blue-500"
      >
        <option value="file">File</option>
        <option value="folder">Folder</option>
      </select>

      {error && <div className="text-red-400 text-xs mb-2">{error}</div>}

      <div className="flex gap-2 justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleAdd}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};
