import { Camera, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

type ProfileAvatarProps = {
  image: string;
  fullName: string;
};

const ProfileAvatar = ({ image, fullName }: ProfileAvatarProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(image);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();

      formData.append("image", file);

      const res = await fetch("/api/profile/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload profile image");
      }

      const data = await res.json();

      setPreview(data.image);

      console.log(file);
      toast.success("Image selected");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <button
        onClick={() => inputRef.current?.click()}
        type="button"
        disabled={uploading}
        className="relative group h-24 w-24 shrink-0 rounded-full ring-4 ring-slate-100 hover:ring-indigo-200 transition-all"
      >
        {/* Avatar content */}
        <div className="h-full w-full overflow-hidden rounded-full">
          {preview ? (
            <Image
              src={preview}
              alt={fullName}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-2xl font-semibold text-indigo-700">
              {getInitials(fullName)}
            </div>
          )}
        </div>

        {/* Pencil icon – shown only when no image */}
        {!preview && (
          <div className="absolute bottom-2 right-2 rounded-full bg-white p-1 shadow-md ring-2 ring-white">
            <Pencil className="h-4 w-4 text-indigo-600" />
          </div>
        )}

        {/* Camera overlay – shown on hover */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
        </div>

        {/* Uploading overlay */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 text-xs font-medium text-white">
            Uploading...
          </div>
        )}
      </button>
    </>
  );
};

function getInitials(name: string) {
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default ProfileAvatar;
