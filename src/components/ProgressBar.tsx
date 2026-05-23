export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{value} / {max}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-brand-50 rounded-full h-3 overflow-hidden border border-brand-100">
        <div
          className="bg-brand-500 h-full transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
