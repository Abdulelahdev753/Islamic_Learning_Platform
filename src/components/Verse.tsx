import { getVerse, getRange } from "@/lib/quran";

type Props = {
  refId: string;
  showRef?: boolean;
};

export function Verse({ refId, showRef = true }: Props) {
  const verses = refId.includes("-") ? getRange(refId) : [getVerse(refId)].filter(Boolean);

  if (verses.length === 0) {
    return (
      <span className="inline-block bg-amber-100 text-amber-900 px-2 py-1 rounded text-sm">
        (آية غير متوفّرة: {refId})
      </span>
    );
  }

  return (
    <figure className="my-6 rounded-xl bg-brand-50/60 border border-brand-100 p-5 text-center">
      <div className="quran text-brand-900">
        {verses.map((v) => (
          <span key={`${v!.surah}:${v!.ayah}`}>
            {v!.text}{" "}
            <span className="text-brand-500 text-base align-middle">﴿{toArabicDigits(v!.ayah)}﴾</span>{" "}
          </span>
        ))}
      </div>
      {showRef && (
        <figcaption className="mt-3 text-sm text-brand-700">
          [سورة {surahName(verses[0]!.surah)} — {formatRef(refId)}]
        </figcaption>
      )}
    </figure>
  );
}

function toArabicDigits(n: number): string {
  const map = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(n)
    .split("")
    .map((d) => map[Number(d)] ?? d)
    .join("");
}

function formatRef(ref: string): string {
  return ref;
}

const SURAH_NAMES: Record<number, string> = {
  1: "الفاتحة", 2: "البقرة", 3: "آل عمران", 4: "النساء", 5: "المائدة",
  6: "الأنعام", 7: "الأعراف", 8: "الأنفال", 9: "التوبة", 10: "يونس",
  11: "هود", 12: "يوسف", 13: "الرعد", 14: "إبراهيم", 15: "الحجر",
  16: "النحل", 17: "الإسراء", 18: "الكهف", 19: "مريم", 20: "طه",
  93: "الضحى", 94: "الشرح", 95: "التين", 96: "العلق", 97: "القدر",
  98: "البينة", 99: "الزلزلة", 100: "العاديات", 101: "القارعة",
  102: "التكاثر", 103: "العصر", 104: "الهمزة", 105: "الفيل",
  106: "قريش", 107: "الماعون", 108: "الكوثر", 109: "الكافرون",
  110: "النصر", 111: "المسد", 112: "الإخلاص", 113: "الفلق", 114: "الناس",
};

function surahName(n: number): string {
  return SURAH_NAMES[n] ?? `رقم ${n}`;
}
