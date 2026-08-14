"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function ActionMenu({
  onEdit,
  onDelete,
  isDeleting = false,
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex size-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <MoreHorizontal className="size-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-slate-200 bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Edit2 className="size-4" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setIsOpen(false);
            }}
            disabled={isDeleting}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-700 transition hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="size-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
