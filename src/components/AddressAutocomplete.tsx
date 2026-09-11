"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Suggestion = { id: string; label: string };

export function AddressAutocomplete({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const errorId = `${id}-error`;
  const listboxId = `${id}-listbox`;

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
    <div ref={containerRef} className="iq-field">
      <label className="iq-label" htmlFor={id}>
        {label}
        {required ? (
          <span className="iq-req" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onBlur={onBlur}
        className="iq-input"
        autoComplete="off"
        role="combobox"
        aria-expanded={open && suggestions.length > 0}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      <AnimatePresence>
        {open && suggestions.length > 0 ? (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label={`${label} suggestions`}
            className="iq-suggestions"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(suggestion.label);
                    setOpen(false);
                  }}
                  className="iq-suggestion"
                >
                  {suggestion.label}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
      {error ? (
        <span id={errorId} role="alert" className="iq-field-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
