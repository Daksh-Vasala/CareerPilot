type ProfileFieldProps = {
  label: string;
  value?: string | number | null;
};

export default function ProfileField({
  label,
  value,
}: ProfileFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>

      <p className={value ? "text-black" : "text-gray-400 italic"}>
        {value || "Not added yet"}
      </p>
    </div>
  );
}