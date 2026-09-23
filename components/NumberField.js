"use client";

/** Right-aligned numeric input that tolerates an empty value while typing. */
export default function NumberField({ value, onChange, className = "", ...rest }) {
  return (
    <input
      type="number"
      step="0.01"
      className={`form-control num ${className}`}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => e.target.select()}
      onWheel={(e) => e.target.blur()}
      {...rest}
    />
  );
}
