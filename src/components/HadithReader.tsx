"use client";

import { useEffect, useMemo, useState, useDeferredValue, useRef } from "react";
import Link from "next/link";
import type {
  HadithBookData,
  HadithBookMeta,
  HadithEntry,
} from "@/lib/hadith";

// Strip Arabic diacritics & tatweel and unify a few letter forms so the
// search matches even when the query is unvocalised.
function normalizeArabic(input: string): string {
  if (!input) return "";
  return input
    .replace(/[ً-ٰٟـ]/g, "") // tashkeel + tatweel
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

type IndexedHadith = HadithEntry & { _norm: string };

export function HadithReader({ book }: { book: HadithBookMeta }) {
  const [data, setData] = useState<HadithBookData | null>(null);
  const [indexed, setIndexed] = useState<IndexedHadith[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [chapterId, setChapterId] = useState<number | "all">("all");
  const [visible, setVisible] = useState(30);
  const deferredQuery = useDeferredValue(query);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setData(null);
    setIndexed(null);
    fetch(book.file)
      .then((r) => {
        if (!r.ok) throw new Error(`فشل تحميل الكتاب (${r.status})`);
        return r.json() as Promise<HadithBookData>;
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
        // Pre-compute normalized text once for fast filtering.
        const idx: IndexedHadith[] = json.hadiths.map((h) => ({
          ...h,
          _norm: normalizeArabic(h.arabic),
        }));
        setIndexed(idx);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "حدث خطأ غير متوقَّع");
      });
    return () => {
      cancelled = true;
    };
  }, [book.file]);

  const chapterTitle = useMemo(() => {
    if (!data) return new Map<number, string>();
    return new Map(data.chapters.map((c) => [c.id, c.arabic]));
  }, [data]);

  const results = useMemo(() => {
    if (!indexed) return [];
    const q = normalizeArabic(deferredQuery);
    const filtered = indexed.filter((h) => {
      if (chapterId !== "all" && h.chapterId !== chapterId) return false;
      if (!q) return true;
      return h._norm.includes(q);
    });
    return filtered;
  }, [indexed, deferredQuery, chapterId]);

  // Reset visible count when filters change.
  useEffect(() => {
    setVisible(30);
    if (resultsRef.current) resultsRef.current.scrollTop = 0;
  }, [deferredQuery, chapterId]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/library" className="text-brand-700 hover:underline">
          ← المكتبة
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">كتب الحديث</span>
      </div>

      <header className="flex items-start gap-4">
        <div className="text-5xl leading-none">{book.cover}</div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-800">
            {book.titleAr}
          </h1>
          <p className="text-gray-700 mt-1">{book.authorAr}</p>
          <p className="text-gray-600 text-sm mt-1">
            {data ? (
              <>
                عدد الأحاديث: {data.hadiths.length.toLocaleString("ar-EG")} ·
                {" "}عدد الأبواب: {data.chapters.length.toLocaleString("ar-EG")}
              </>
            ) : (
              "جارٍ تحميل بيانات الكتاب..."
            )}
          </p>
        </div>
      </header>

      <div className="card space-y-3">
        <label className="block">
          <span className="block text-sm font-bold text-brand-800 mb-1">
            البحث في الكتاب
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اكتب كلمة أو جملة بالعربية..."
            dir="rtl"
            className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </label>

        {data && data.chapters.length > 1 && (
          <label className="block">
            <span className="block text-sm font-bold text-brand-800 mb-1">
              تصفية حسب الباب
            </span>
            <select
              value={chapterId}
              onChange={(e) =>
                setChapterId(
                  e.target.value === "all" ? "all" : Number(e.target.value),
                )
              }
              className="w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              <option value="all">جميع الأبواب</option>
              {data.chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.arabic || c.english || `باب رقم ${c.id}`}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="text-sm text-gray-600">
          {indexed ? (
            <>
              النتائج:{" "}
              <span className="font-bold text-brand-800">
                {results.length.toLocaleString("ar-EG")}
              </span>{" "}
              حديث
              {query && (
                <>
                  {" "}— البحث عن: <span className="font-bold">{query}</span>
                </>
              )}
            </>
          ) : (
            "جارٍ تجهيز فهرس البحث..."
          )}
        </div>
      </div>

      {error && (
        <div className="card border-red-300 bg-red-50 text-red-800">
          {error}
        </div>
      )}

      <div ref={resultsRef} className="space-y-3">
        {!indexed && !error && (
          <div className="card text-center text-gray-600">
            جارٍ التحميل، يُرجى الانتظار...
          </div>
        )}

        {indexed && results.length === 0 && (
          <div className="card text-center text-gray-600">
            لا توجد نتائج مطابقة لبحثك.
          </div>
        )}

        {results.slice(0, visible).map((h) => (
          <article key={h.id} className="card">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-bold text-brand-700">
                #{h.idInBook.toLocaleString("ar-EG")}
              </span>
              {chapterTitle.get(h.chapterId) && (
                <span className="text-xs text-gray-500 truncate">
                  {chapterTitle.get(h.chapterId)}
                </span>
              )}
            </div>
            <p
              dir="rtl"
              className="mt-2 leading-9 text-gray-900 text-lg whitespace-pre-wrap"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {highlight(h.arabic, query)}
            </p>
          </article>
        ))}

        {indexed && results.length > visible && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 30)}
              className="btn btn-secondary"
            >
              عرض المزيد ({(results.length - visible).toLocaleString("ar-EG")}{" "}
              متبقّي)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Highlight the matched substring inside the original (non-normalised) text by
// walking the normalised form in parallel.
function highlight(text: string, query: string) {
  const q = normalizeArabic(query);
  if (!q) return text;
  const norm = normalizeArabic(text);
  // Build a map from each character in the original text to its position in
  // the normalised string (only chars that survive normalization map here).
  const original = text;
  const positions: number[] = [];
  let normCursor = 0;
  for (let i = 0; i < original.length; i++) {
    const ch = normalizeArabic(original[i]);
    if (ch.length === 0) {
      positions.push(-1);
    } else {
      positions.push(normCursor);
      normCursor += ch.length;
    }
  }
  const matchStart = norm.indexOf(q);
  if (matchStart === -1) return text;
  const matchEnd = matchStart + q.length;
  let origStart = -1;
  let origEnd = -1;
  for (let i = 0; i < positions.length; i++) {
    if (origStart === -1 && positions[i] !== -1 && positions[i] >= matchStart)
      origStart = i;
    if (positions[i] !== -1 && positions[i] < matchEnd) origEnd = i + 1;
  }
  if (origStart === -1 || origEnd === -1) return text;
  return (
    <>
      {original.slice(0, origStart)}
      <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">
        {original.slice(origStart, origEnd)}
      </mark>
      {original.slice(origEnd)}
    </>
  );
}
