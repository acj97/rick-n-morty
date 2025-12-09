import { useState } from 'react';

type NeonDropdownProps = {
  options: { label: string; value: string | null }[];
  value: string | null;
  onChange: (value: string | null) => void;
};

export default function Dropdown({ options, value, onChange }: NeonDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string | null) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full md:w-fit">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="neon-input w-full flex justify-between items-center cursor-pointer"
      >
        {options.find((opt) => opt.value === value)?.label || 'Select status'}
        <span className="ml-2">▾</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="w-fit absolute left-0 right-0 mt-1 bg-black/70 backdrop-blur-md border-neon-white rounded-md shadow-lg z-50">
          {options.map((opt) => (
            <li
              key={opt.value ?? 'null'}
              onClick={() => handleSelect(opt.value)}
              className={`text-white px-4 py-2 cursor-pointer hover:bg-white/20 ${
                value === opt.value ? 'bg-white/20' : ''
              } neon-text`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
