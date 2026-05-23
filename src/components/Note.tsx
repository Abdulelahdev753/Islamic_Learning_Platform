export function Note({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "tip" | "warning";
}) {
  const styles = {
    info: "bg-sky-50 border-sky-300 text-sky-900",
    tip: "bg-emerald-50 border-emerald-300 text-emerald-900",
    warning: "bg-amber-50 border-amber-300 text-amber-900",
  }[type];
  const label = { info: "ملاحظة", tip: "فائدة", warning: "تنبيه" }[type];
  return (
    <aside className={`my-5 border-r-4 rounded-l-md p-4 ${styles}`}>
      <div className="font-bold mb-1">{label}</div>
      <div className="leading-8">{children}</div>
    </aside>
  );
}
