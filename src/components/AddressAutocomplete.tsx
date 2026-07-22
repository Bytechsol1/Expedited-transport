"use client";

import { useEffect, useRef, useState } from "react";

type Suggestion = { id: string; label: string };

export function AddressAutocomplete({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  const handleChange = (next: string) => {
    onChange(next);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (next.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const response = await fetch(`/api/address-suggestions?q=${encodeURIComponent(next)}`);
      const data = await response.json().catch(() => ({ suggestions: [] }));
      setSuggestions(data.suggestions ?? []);
      setOpen(true);
    }, 300);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        autoComplete="off"
      />
      {open && suggestions.length > 0 ? (
        <ul className="absolute top-full z-20 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(suggestion.label);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-100"
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
