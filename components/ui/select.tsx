import clsx from "clsx";

type Option = { value: string; label: string };

export function Select({ options, className, defaultValue }: { options: Option[]; className?: string; defaultValue?: string }) {
  return (
    <select defaultValue={defaultValue} className={clsx("h-10 rounded-xl border px-3 bg-background", className)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
