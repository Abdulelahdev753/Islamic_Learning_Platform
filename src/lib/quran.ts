import fs from "node:fs";
import path from "node:path";

type Ayah = { surah: number; ayah: number; text: string };

let cache: Map<string, Ayah> | null = null;

function load(): Map<string, Ayah> {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), "data", "quran.json");
  if (!fs.existsSync(filePath)) {
    cache = new Map();
    return cache;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed: Ayah[] = JSON.parse(raw);
  cache = new Map(parsed.map((a) => [`${a.surah}:${a.ayah}`, a]));
  return cache;
}

export function getVerse(ref: string): Ayah | null {
  const map = load();
  return map.get(ref) ?? null;
}

export function getRange(ref: string): Ayah[] {
  const map = load();
  const m = ref.match(/^(\d+):(\d+)-(\d+)$/);
  if (!m) {
    const single = getVerse(ref);
    return single ? [single] : [];
  }
  const surah = Number(m[1]);
  const from = Number(m[2]);
  const to = Number(m[3]);
  const out: Ayah[] = [];
  for (let i = from; i <= to; i++) {
    const v = map.get(`${surah}:${i}`);
    if (v) out.push(v);
  }
  return out;
}
