// RenamePopup.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";

interface RenamePopupProps {
  itemId: string;
  currentName: string;
  onClose: () => void;
}

export const RenamePopup = ({ itemId, currentName, onClose }: RenamePopupProps) => {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const { files, renameFile } = useFileStore();

  // Focus input when popup opens and select the name part (without extension for files)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Select name without extension for easier renaming
      const lastDotIndex = currentName.lastIndexOf('.');
      if (lastDotIndex > 0) {
        inputRef.current.setSelectionRange(0, lastDotIndex);
      } else {
        inputRef.current.select();
      }
    }
  }, [currentName]);

  // Close popup when clicking outside
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const item = files.find(f => f.id === itemId);
  if (!item) return null;

  const handleRename = () => {
    if (name.trim() === currentName) {
      onClose();
      return;
    }

    const result = renameFile(itemId, name);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRename();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div 
      ref={popupRef}
      className="bg-gray-800 border border-blue-500 rounded-lg p-3 shadow-lg min-w-[250px]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-400">
          Rename {item.type === "file" ? "File" : "Folder"}
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
        placeholder="Enter new name"
        className="w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm mb-2 focus:outline-none focus:border-blue-500"
      />

      {error && (
        <div className="text-red-400 text-xs mb-2">{error}</div>
      )}

      <div className="flex gap-2 justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleRename}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Rename
        </button>
      </div>
    </div>
  );
};

