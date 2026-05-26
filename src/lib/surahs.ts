// Quran surah metadata (names from mp3quran.net API).
// Used by the audio library to render the sura list and build audio URLs.

export type Surah = {
  id: number; // 1..114
  name: string; // Arabic name
  makkia: boolean; // true = makkiyyah, false = madaniyyah
};

export const SURAHS: Surah[] = [
  { id: 1, name: "الفاتحة", makkia: true },
  { id: 2, name: "البقرة", makkia: false },
  { id: 3, name: "آل عمران", makkia: false },
  { id: 4, name: "النساء", makkia: false },
  { id: 5, name: "المائدة", makkia: false },
  { id: 6, name: "الأنعام", makkia: true },
  { id: 7, name: "الأعراف", makkia: true },
  { id: 8, name: "الأنفال", makkia: false },
  { id: 9, name: "التوبة", makkia: false },
  { id: 10, name: "يونس", makkia: true },
  { id: 11, name: "هود", makkia: true },
  { id: 12, name: "يوسف", makkia: true },
  { id: 13, name: "الرعد", makkia: false },
  { id: 14, name: "إبراهيم", makkia: true },
  { id: 15, name: "الحجر", makkia: true },
  { id: 16, name: "النحل", makkia: true },
  { id: 17, name: "الإسراء", makkia: true },
  { id: 18, name: "الكهف", makkia: true },
  { id: 19, name: "مريم", makkia: true },
  { id: 20, name: "طه", makkia: true },
  { id: 21, name: "الأنبياء", makkia: true },
  { id: 22, name: "الحج", makkia: false },
  { id: 23, name: "المؤمنون", makkia: true },
  { id: 24, name: "النور", makkia: false },
  { id: 25, name: "الفرقان", makkia: true },
  { id: 26, name: "الشعراء", makkia: true },
  { id: 27, name: "النمل", makkia: true },
  { id: 28, name: "القصص", makkia: true },
  { id: 29, name: "العنكبوت", makkia: true },
  { id: 30, name: "الروم", makkia: true },
  { id: 31, name: "لقمان", makkia: true },
  { id: 32, name: "السجدة", makkia: true },
  { id: 33, name: "الأحزاب", makkia: false },
  { id: 34, name: "سبأ", makkia: true },
  { id: 35, name: "فاطر", makkia: true },
  { id: 36, name: "يس", makkia: true },
  { id: 37, name: "الصافات", makkia: true },
  { id: 38, name: "ص", makkia: true },
  { id: 39, name: "الزمر", makkia: true },
  { id: 40, name: "غافر", makkia: true },
  { id: 41, name: "فصلت", makkia: true },
  { id: 42, name: "الشورى", makkia: true },
  { id: 43, name: "الزخرف", makkia: true },
  { id: 44, name: "الدّخان", makkia: true },
  { id: 45, name: "الجاثية", makkia: true },
  { id: 46, name: "الأحقاف", makkia: true },
  { id: 47, name: "محمد", makkia: false },
  { id: 48, name: "الفتح", makkia: false },
  { id: 49, name: "الحجرات", makkia: false },
  { id: 50, name: "ق", makkia: true },
  { id: 51, name: "الذاريات", makkia: true },
  { id: 52, name: "الطور", makkia: true },
  { id: 53, name: "النجم", makkia: true },
  { id: 54, name: "القمر", makkia: true },
  { id: 55, name: "الرحمن", makkia: false },
  { id: 56, name: "الواقعة", makkia: true },
  { id: 57, name: "الحديد", makkia: false },
  { id: 58, name: "المجادلة", makkia: false },
  { id: 59, name: "الحشر", makkia: false },
  { id: 60, name: "الممتحنة", makkia: false },
  { id: 61, name: "الصف", makkia: false },
  { id: 62, name: "الجمعة", makkia: false },
  { id: 63, name: "المنافقون", makkia: false },
  { id: 64, name: "التغابن", makkia: false },
  { id: 65, name: "الطلاق", makkia: false },
  { id: 66, name: "التحريم", makkia: false },
  { id: 67, name: "الملك", makkia: true },
  { id: 68, name: "القلم", makkia: true },
  { id: 69, name: "الحاقة", makkia: true },
  { id: 70, name: "المعارج", makkia: true },
  { id: 71, name: "نوح", makkia: true },
  { id: 72, name: "الجن", makkia: true },
  { id: 73, name: "المزمل", makkia: true },
  { id: 74, name: "المدثر", makkia: true },
  { id: 75, name: "القيامة", makkia: true },
  { id: 76, name: "الإنسان", makkia: false },
  { id: 77, name: "المرسلات", makkia: true },
  { id: 78, name: "النبأ", makkia: true },
  { id: 79, name: "النازعات", makkia: true },
  { id: 80, name: "عبس", makkia: true },
  { id: 81, name: "التكوير", makkia: true },
  { id: 82, name: "الإنفطار", makkia: true },
  { id: 83, name: "المطففين", makkia: true },
  { id: 84, name: "الإنشقاق", makkia: true },
  { id: 85, name: "البروج", makkia: true },
  { id: 86, name: "الطارق", makkia: true },
  { id: 87, name: "الأعلى", makkia: true },
  { id: 88, name: "الغاشية", makkia: true },
  { id: 89, name: "الفجر", makkia: true },
  { id: 90, name: "البلد", makkia: true },
  { id: 91, name: "الشمس", makkia: true },
  { id: 92, name: "الليل", makkia: true },
  { id: 93, name: "الضحى", makkia: true },
  { id: 94, name: "الشرح", makkia: true },
  { id: 95, name: "التين", makkia: true },
  { id: 96, name: "العلق", makkia: true },
  { id: 97, name: "القدر", makkia: true },
  { id: 98, name: "البينة", makkia: false },
  { id: 99, name: "الزلزلة", makkia: false },
  { id: 100, name: "العاديات", makkia: true },
  { id: 101, name: "القارعة", makkia: true },
  { id: 102, name: "التكاثر", makkia: true },
  { id: 103, name: "العصر", makkia: true },
  { id: 104, name: "الهمزة", makkia: true },
  { id: 105, name: "الفيل", makkia: true },
  { id: 106, name: "قريش", makkia: true },
  { id: 107, name: "الماعون", makkia: true },
  { id: 108, name: "الكوثر", makkia: true },
  { id: 109, name: "الكافرون", makkia: true },
  { id: 110, name: "النصر", makkia: false },
  { id: 111, name: "المسد", makkia: true },
  { id: 112, name: "الإخلاص", makkia: true },
  { id: 113, name: "الفلق", makkia: true },
  { id: 114, name: "الناس", makkia: true },
];

// rewaya_id 1 = حفص عن عاصم (the murattal moshaf used here).
export const HAFS_REWAYA_ID = 1;

export type Reciter = {
  key: string;
  reciterId: number; // mp3quran.net reciter id
  nameAr: string;
  fallbackServer: string; // used if the API call fails
};

// All reciters use رواية حفص عن عاصم - المصحف المرتَّل (rewaya_id = 1).
export const RECITERS: Reciter[] = [
  {
    key: "minshawi",
    reciterId: 112,
    nameAr: "محمد صديق المنشاوي",
    fallbackServer: "https://server10.mp3quran.net/minsh/",
  },
  {
    key: "maher",
    reciterId: 102,
    nameAr: "ماهر المعيقلي",
    fallbackServer: "https://server12.mp3quran.net/maher/",
  },
  {
    key: "balilah",
    reciterId: 217,
    nameAr: "بندر بليلة",
    fallbackServer: "https://server6.mp3quran.net/balilah/",
  },
  {
    key: "ayyoub",
    reciterId: 109,
    nameAr: "محمد أيوب",
    fallbackServer: "https://server8.mp3quran.net/ayyub/",
  },
];

export function reciterApiUrl(reciterId: number): string {
  return `https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${reciterId}`;
}

// Build the mp3 URL for a sura given the moshaf server returned by the API.
export function surahAudioUrl(server: string, surahId: number): string {
  const base = server.endsWith("/") ? server : server + "/";
  return `${base}${String(surahId).padStart(3, "0")}.mp3`;
}
