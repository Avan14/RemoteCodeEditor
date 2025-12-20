// deletePopup.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useFileStore } from "../../../../hooks/useFileStore";

interface DeletePopupProps {
  itemId: string;
  itemName: string;
  itemType: "file" | "folder";
  onClose: () => void;
}

export const DeletePopup = ({
  itemId,
  itemName,
  itemType,
  onClose,
}: DeletePopupProps) => {
  const [error, setError] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const { deleteNode } = useFileStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleDelete = () => {
    setError("");
    const result = deleteNode(itemId);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onClose();
  };

  const title = itemType === "file" ? "Delete File" : "Delete Folder";
  const description =
    itemType === "folder"
      ? `Delete \"${itemName}\" and all its contents?`
      : `Delete \"${itemName}\"?`;

  return (
    <div
      ref={popupRef}
      className="bg-gray-800 border border-blue-500 rounded-lg p-3 shadow-lg min-w-[250px]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-400">{title}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="text-white text-sm mb-2">{description}</div>

      {error && <div className="text-red-400 text-xs mb-2">{error}</div>}

      <div className="flex gap-2 justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
