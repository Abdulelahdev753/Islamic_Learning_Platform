export type HadithBookMeta = {
  slug: string;
  file: string;
  titleAr: string;
  authorAr: string;
  descriptionAr: string;
  count: number;
};

export const hadithBooks: HadithBookMeta[] = [
  {
    slug: "bukhari",
    file: "/hadith/bukhari.json",
    titleAr: "صحيح البخاري",
    authorAr: "الإمام محمد بن إسماعيل البخاري",
    descriptionAr: "أصحُّ الكتب بعد كتاب الله، جمع فيه الإمام البخاري ما صحَّ عنده من حديث رسول الله ﷺ.",
    count: 7563,
  },
  {
    slug: "muslim",
    file: "/hadith/muslim.json",
    titleAr: "صحيح مسلم",
    authorAr: "الإمام مسلم بن الحجاج النيسابوري",
    descriptionAr: "ثاني أصحِّ الكتب بعد صحيح البخاري في رواية الحديث الشريف.",
    count: 7563,
  },
  {
    slug: "abudawud",
    file: "/hadith/abudawud.json",
    titleAr: "سنن أبي داود",
    authorAr: "الإمام أبو داود السجستاني",
    descriptionAr: "أحد كتب السنن الأربعة، يُعنى بأحاديث الأحكام الفقهية.",
    count: 5274,
  },
  {
    slug: "tirmidhi",
    file: "/hadith/tirmidhi.json",
    titleAr: "جامع الترمذي",
    authorAr: "الإمام محمد بن عيسى الترمذي",
    descriptionAr: "من أهمِّ كتب السنن، يجمع بين الفقه والحديث وذكر مذاهب العلماء.",
    count: 3956,
  },
  {
    slug: "nasai",
    file: "/hadith/nasai.json",
    titleAr: "سنن النسائي",
    authorAr: "الإمام أحمد بن شعيب النسائي",
    descriptionAr: "أحد كتب السنن الأربعة، يمتاز بدقَّة الانتقاء وقلَّة الأحاديث الضعيفة.",
    count: 5761,
  },
  {
    slug: "ibnmajah",
    file: "/hadith/ibnmajah.json",
    titleAr: "سنن ابن ماجه",
    authorAr: "الإمام محمد بن يزيد ابن ماجه",
    descriptionAr: "أحد كتب السنن الأربعة، يشتمل على كثير من الأحاديث الفقهية.",
    count: 4341,
  },
  {
    slug: "malik",
    file: "/hadith/malik.json",
    titleAr: "موطأ الإمام مالك",
    authorAr: "الإمام مالك بن أنس",
    descriptionAr: "من أوائل كتب الحديث، جمع فيه الإمام مالك السنن وآثار الصحابة والتابعين.",
    count: 1851,
  },
  {
    slug: "ahmed",
    file: "/hadith/ahmed.json",
    titleAr: "مسند الإمام أحمد",
    authorAr: "الإمام أحمد بن حنبل",
    descriptionAr: "أوسع كتب المسانيد، رتَّبه الإمام أحمد على أسماء الصحابة الرواة.",
    count: 26363,
  },
  {
    slug: "darimi",
    file: "/hadith/darimi.json",
    titleAr: "سنن الدارمي",
    authorAr: "الإمام عبد الله بن عبد الرحمن الدارمي",
    descriptionAr: "من كتب السنن المعتبرة، يجمع بين الفقه والحديث.",
    count: 3503,
  },
  {
    slug: "riyad_assalihin",
    file: "/hadith/riyad_assalihin.json",
    titleAr: "رياض الصالحين",
    authorAr: "الإمام يحيى بن شرف النووي",
    descriptionAr: "كتاب جامع لأحاديث الترغيب والترهيب والأخلاق والآداب من أصحِّ مصادر السُّنَّة.",
    count: 1896,
  },
  {
    slug: "shamail_muhammadiyah",
    file: "/hadith/shamail_muhammadiyah.json",
    titleAr: "الشمائل المحمدية",
    authorAr: "الإمام الترمذي",
    descriptionAr: "كتاب يصف خِلْقَة النبي ﷺ وأخلاقه وعباداته وحياته اليومية.",
    count: 415,
  },
  {
    slug: "bulugh_almaram",
    file: "/hadith/bulugh_almaram.json",
    titleAr: "بلوغ المرام",
    authorAr: "الحافظ ابن حجر العسقلاني",
    descriptionAr: "من أهمِّ كتب أحاديث الأحكام، اعتمد عليه الفقهاء وطلاب العلم.",
    count: 1568,
  },
  {
    slug: "aladab_almufrad",
    file: "/hadith/aladab_almufrad.json",
    titleAr: "الأدب المفرد",
    authorAr: "الإمام البخاري",
    descriptionAr: "كتاب جامع لأحاديث الآداب والأخلاق وحُسن المعاملة.",
    count: 1322,
  },
  {
    slug: "mishkat_almasabih",
    file: "/hadith/mishkat_almasabih.json",
    titleAr: "مشكاة المصابيح",
    authorAr: "الإمام الخطيب التبريزي",
    descriptionAr: "تهذيب لكتاب مصابيح السنَّة للبغوي، جامع لأحاديث الأحكام والآداب.",
    count: 6294,
  },
  {
    slug: "nawawi40",
    file: "/hadith/nawawi40.json",
    titleAr: "الأربعون النووية",
    authorAr: "الإمام يحيى بن شرف النووي",
    descriptionAr: "مجموعة من الأحاديث الجوامع التي تُعدُّ قواعد للدين، اشتهرت بحفظ طلبة العلم لها.",
    count: 42,
  },
  {
    slug: "qudsi40",
    file: "/hadith/qudsi40.json",
    titleAr: "الأربعون القدسية",
    authorAr: "مجموعة من العلماء",
    descriptionAr: "مجموعة من الأحاديث القدسية التي يرويها النبي ﷺ عن ربِّه عزَّ وجلَّ.",
    count: 40,
  },
  {
    slug: "shahwaliullah40",
    file: "/hadith/shahwaliullah40.json",
    titleAr: "أربعون الشاه ولي الله الدهلوي",
    authorAr: "الشاه ولي الله الدهلوي",
    descriptionAr: "أربعون حديثًا اختارها الإمام الشاه ولي الله الدهلوي من جوامع الكَلِم.",
    count: 40,
  },
];

export function getHadithBook(slug: string): HadithBookMeta | undefined {
  return hadithBooks.find((b) => b.slug === slug);
}

export type HadithEntry = {
  id: number;
  idInBook: number;
  chapterId: number;
  bookId: number;
  arabic: string;
  english?: { narrator?: string; text?: string };
};

export type HadithChapter = {
  id: number;
  bookId: number;
  arabic: string;
  english?: string;
};

export type HadithBookData = {
  id: number;
  metadata: {
    id: number;
    length: number;
    arabic: { title: string; author: string; introduction?: string };
    english?: { title: string; author: string; introduction?: string };
  };
  chapters: HadithChapter[];
  hadiths: HadithEntry[];
};
