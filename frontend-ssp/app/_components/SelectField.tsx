import type { SelectOption } from "../predictpersistance/_types/predict";

type SelectFieldProps = {
  label: string;
  description?: string;
  value: number;
  options: SelectOption[];
  onChange: (value: number) => void;
};

export function SelectField({
  label,
  description,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        {description ? (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        ) : null}
      </div>

      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-black outline-none transition focus:border-slate-400"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}