import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";

// Invalid characters for file/folder names (Windows + Unix)
const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1f]/;
const INVALID_NAMES = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];

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

  const parentId = item.parentId;
  const siblings = files.filter(f => f.parentId === parentId && f.id !== itemId);

  const validateName = (fileName: string): string | null => {
    const trimmed = fileName.trim();
    
    if (!trimmed) {
      return "Name cannot be empty";
    }

    if (trimmed.length > 255) {
      return "Name is too long (max 255 characters)";
    }

    if (INVALID_CHARS.test(trimmed)) {
      return "Name contains invalid characters: < > : \" / \\ | ? * and control characters";
    }

    // Check for invalid Windows names
    const nameUpper = trimmed.toUpperCase();
    if (INVALID_NAMES.includes(nameUpper) || INVALID_NAMES.some(invalid => nameUpper.startsWith(invalid + '.'))) {
      return "This name is reserved and cannot be used";
    }

    // Check for leading/trailing spaces or dots (Windows)
    if (trimmed.startsWith('.') || trimmed.endsWith('.') || trimmed.endsWith(' ')) {
      return "Name cannot start with a dot or end with a dot or space";
    }

    // Check for duplicate names in the same folder
    const siblingNames = siblings.map(c => c.name.toLowerCase());
    if (siblingNames.includes(trimmed.toLowerCase())) {
      return "A file or folder with this name already exists";
    }

    return null;
  };

  const handleRename = () => {
    if (name.trim() === currentName) {
      onClose();
      return;
    }

    const validationError = validateName(name);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    renameFile(itemId, name.trim());
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
      className="absolute z-50 bg-gray-800 border border-blue-500 rounded-lg p-3 shadow-lg min-w-[250px]"
      style={{ top: '100%', left: 0, marginTop: '4px' }}
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

