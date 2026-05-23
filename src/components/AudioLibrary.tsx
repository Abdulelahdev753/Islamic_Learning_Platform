"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  SURAHS,
  RECITERS,
  HAFS_REWAYA_ID,
  reciterApiUrl,
  surahAudioUrl,
  type Reciter,
} from "@/lib/surahs";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

type ReciterMoshaf = {
  // Resolved server URL for the reciter's hafs/murattal moshaf.
  server: string;
  // True if we had to fall back because the API call failed.
  fallback: boolean;
};

export function AudioLibrary() {
  // One server URL per reciter, resolved lazily as the user selects them.
  const [moshafs, setMoshafs] = useState<Record<string, ReciterMoshaf>>({});
  const [selectedKey, setSelectedKey] = useState<string>(RECITERS[0].key);
  const [query, setQuery] = useState("");

  // Playback state.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentReciterKey, setCurrentReciterKey] = useState<string | null>(
    null,
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const selectedReciter = useMemo(
    () => RECITERS.find((r) => r.key === selectedKey) ?? RECITERS[0],
    [selectedKey],
  );

  // Resolve a reciter's moshaf server from the API on first need; cache it.
  useEffect(() => {
    if (moshafs[selectedReciter.key]) return;
    let cancelled = false;

    fetch(reciterApiUrl(selectedReciter.reciterId))
      .then((res) => {
        if (!res.ok) throw new Error(`API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const reciter = data?.reciters?.[0];
        // Prefer رواية حفص عن عاصم - المصحف المرتَّل (rewaya_id = 1); fall
        // back to the first moshaf if not present.
        const moshaf =
          reciter?.moshaf?.find(
            (m: { rewaya_id: number; name?: string }) =>
              m.rewaya_id === HAFS_REWAYA_ID && /مرتل|Murattal/i.test(m.name ?? ""),
          ) ??
          reciter?.moshaf?.find(
            (m: { rewaya_id: number }) => m.rewaya_id === HAFS_REWAYA_ID,
          ) ??
          reciter?.moshaf?.[0];
        if (!moshaf?.server) throw new Error("no moshaf");
        setMoshafs((prev) => ({
          ...prev,
          [selectedReciter.key]: {
            server: moshaf.server as string,
            fallback: false,
          },
        }));
      })
      .catch(() => {
        if (cancelled) return;
        setMoshafs((prev) => ({
          ...prev,
          [selectedReciter.key]: {
            server: selectedReciter.fallbackServer,
            fallback: true,
          },
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [selectedReciter, moshafs]);

  const selectedMoshaf = moshafs[selectedReciter.key];

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return SURAHS;
    return SURAHS.filter(
      (s) => s.name.includes(q) || String(s.id) === q,
    );
  }, [query]);

  // Display the currently-playing surah (which may belong to a different
  // reciter than the one being browsed).
  const currentReciter = currentReciterKey
    ? RECITERS.find((r) => r.key === currentReciterKey) ?? null
    : null;
  const current =
    currentId !== null ? SURAHS.find((s) => s.id === currentId) ?? null : null;

  function playSurah(id: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const moshaf = moshafs[selectedReciter.key];
    if (!moshaf) return;

    // Toggle play/pause when the same reciter+sura is already loaded.
    if (currentReciterKey === selectedReciter.key && currentId === id) {
      if (audio.paused) audio.play();
      else audio.pause();
      return;
    }

    setCurrentReciterKey(selectedReciter.key);
    setCurrentId(id);
    setLoading(true);
    setCurrentTime(0);
    setDuration(0);
    audio.src = surahAudioUrl(moshaf.server, id);
    audio.play().catch(() => setLoading(false));
  }

  function step(delta: number) {
    if (currentId == null || !currentReciter) return;
    const next = currentId + delta;
    if (next < 1 || next > 114) return;
    // Stepping plays within whichever reciter is currently playing.
    const moshaf = moshafs[currentReciter.key];
    const audio = audioRef.current;
    if (!moshaf || !audio) return;
    setCurrentId(next);
    setLoading(true);
    setCurrentTime(0);
    setDuration(0);
    audio.src = surahAudioUrl(moshaf.server, next);
    audio.play().catch(() => setLoading(false));
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const t = (Number(e.target.value) / 100) * duration;
    audio.currentTime = t;
    setCurrentTime(t);
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Reciter selector */}
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-brand-800">القرّاء</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {RECITERS.map((r) => {
            const active = r.key === selectedKey;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelectedKey(r.key)}
                className={`flex items-center gap-2 rounded-xl border p-3 text-right transition-colors ${
                  active
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200"
                    : "border-brand-100 bg-white hover:border-brand-300 hover:bg-brand-50/50"
                }`}
              >
                <span className="text-2xl">{r.emoji}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-brand-800 truncate">
                    {r.nameAr}
                  </span>
                  <span className="block text-[11px] text-gray-500">
                    حفص عن عاصم · مرتَّل
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected reciter header + search */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{selectedReciter.emoji}</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-brand-800">
              {selectedReciter.nameAr}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              المصحف المرتَّل · رواية حفص عن عاصم · ١١٤ سورة
            </p>
          </div>
        </div>
        {selectedMoshaf?.fallback && (
          <p className="text-amber-700 text-sm mt-3">
            تعذّر الاتصال بواجهة mp3quran.net، يتم استخدام الخادم الاحتياطي.
          </p>
        )}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن سورة بالاسم أو الرقم…"
          className="mt-4 w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500"
        />
      </div>

      {/* Sura grid for the selected reciter */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-32">
        {filtered.map((s) => {
          const isCurrent =
            s.id === currentId && currentReciterKey === selectedReciter.key;
          const isPlaying = isCurrent && playing;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => playSurah(s.id)}
              disabled={!selectedMoshaf}
              className={`flex items-center gap-3 rounded-xl border p-3 text-right transition-colors ${
                isCurrent
                  ? "border-brand-500 bg-brand-50"
                  : "border-brand-100 bg-white hover:border-brand-300 hover:bg-brand-50/50"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  isCurrent
                    ? "bg-brand-600 text-white"
                    : "bg-brand-50 text-brand-700"
                }`}
              >
                {isCurrent && loading ? (
                  <span className="block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : isPlaying ? (
                  "⏸"
                ) : isCurrent ? (
                  "▶"
                ) : (
                  s.id
                )}
              </span>
              <span className="flex-1">
                <span className="block font-bold text-brand-800">
                  سورة {s.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {s.makkia ? "مكّية" : "مدنيّة"} · رقم {s.id}
                </span>
              </span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            لا توجد سورة مطابقة لبحثك.
          </p>
        )}
      </div>

      {/* Sticky player bar */}
      {current && currentReciter && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-200 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="container-page py-3">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-brand-800">
                  سورة {current.name}
                </p>
                <p className="text-xs text-gray-500">{currentReciter.nameAr}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={currentId === 1}
                  className="grid h-9 w-9 place-items-center rounded-full text-brand-700 hover:bg-brand-50 disabled:opacity-30"
                  aria-label="السورة السابقة"
                >
                  ⏮
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Toggle play/pause for the currently-loaded sura.
                    const audio = audioRef.current;
                    if (!audio) return;
                    if (audio.paused) audio.play();
                    else audio.pause();
                  }}
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
                  aria-label={playing ? "إيقاف" : "تشغيل"}
                >
                  {loading ? (
                    <span className="block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : playing ? (
                    "⏸"
                  ) : (
                    "▶"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={currentId === 114}
                  className="grid h-9 w-9 place-items-center rounded-full text-brand-700 hover:bg-brand-50 disabled:opacity-30"
                  aria-label="السورة التالية"
                >
                  ⏭
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-10 text-xs tabular-nums text-gray-500">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progress}
                onChange={onSeek}
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand-600"
                aria-label="موضع التشغيل"
              />
              <span className="w-10 text-xs tabular-nums text-gray-500">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlaying={() => {
          setPlaying(true);
          setLoading(false);
        }}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => {
          setPlaying(false);
          step(1);
        }}
        onError={() => {
          setLoading(false);
          setPlaying(false);
        }}
      />
    </div>
  );
}

export type { Reciter };
