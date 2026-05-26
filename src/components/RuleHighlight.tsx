type Rule = "idhhar" | "idgham" | "iqlab" | "ikhfa" | "qalqalah" | "madd" | "tafkheem" | "tarqeeq";

const LABELS: Record<Rule, string> = {
  idhhar: "إظهار",
  idgham: "إدغام",
  iqlab: "إقلاب",
  ikhfa: "إخفاء",
  qalqalah: "قلقلة",
  madd: "مدّ",
  tafkheem: "تفخيم",
  tarqeeq: "ترقيق",
};

export function RuleHighlight({
  rule,
  children,
  showLabel = false,
}: {
  rule: Rule;
  children: React.ReactNode;
  showLabel?: boolean;
}) {
  return (
    <span className={`rule-${rule} rule-pill font-bold`}>
      {children}
      {showLabel && (
        <sub className="mr-1 text-xs font-normal opacity-80">({LABELS[rule]})</sub>
      )}
    </span>
  );
}
