"use client";

import { useState } from "react";
import Link from "next/link";
import { AudioLibrary } from "@/components/AudioLibrary";
import { hadithBooks } from "@/lib/hadith";

type Book = {
  title: string;
  author: string;
  description: string;
  file: string;
};

const quranSciencesBooks: Book[] = [
  {
    title: "التجويد الميسَّر",
    author: "د. عبد العزيز بن علي الحربي",
    description:
      "كتاب مختصر في أحكام التجويد بأسلوب سهل، يصلح للمبتدئين والمتعلّمين على حدٍّ سواء.",
    file: "/books/tajweed-muyassar.pdf",
  },
  {
    title: "التفسير الميسَّر",
    author: "نخبة من العلماء — مجمع الملك فهد",
    description:
      "تفسير مختصر لمعاني آيات القرآن الكريم بأسلوب سهل واضح، صادر عن مجمع الملك فهد لطباعة المصحف الشريف.",
    file: "/books/ar_tafseer_moyasser.pdf",
  },
];

const duaBooks: Book[] = [
  {
    title: "المختار من صحيح الأدعية",
    author: "مجموعة من الأدعية الصحيحة",
    description:
      "مجموعة منتقاة من الأدعية الواردة في القرآن والسنّة الصحيحة لتلازم المسلم في يومه.",
    file: "/books/sahih-adiyah.pdf",
  },
];

type Tab = "digital" | "audio";

export function LibraryTabs() {
  const [tab, setTab] = useState<Tab>("digital");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-brand-800">المكتبة</h1>
        <p className="text-gray-700 mt-2">
          تصفّح المكتبة الرقمية للكتب الإسلامية أو استمع إلى المكتبة الصوتية للقرآن الكريم.
        </p>
      </header>

      {/* Category switcher */}
      <div className="flex flex-wrap gap-2 rounded-xl border border-brand-200 bg-brand-50/60 p-1.5">
        <TabButton active={tab === "digital"} onClick={() => setTab("digital")}>
          المكتبة الرقمية
        </TabButton>
        <TabButton active={tab === "audio"} onClick={() => setTab("audio")}>
          المكتبة الصوتية للقرآن الكريم
        </TabButton>
      </div>

      {tab === "digital" ? (
        <section className="space-y-10">
          <PdfBookSection
            heading="علوم القرآن والتفاسير"
            description="كتب في علوم القرآن الكريم والتفسير، حمِّلها بصيغة PDF لقراءتها في أي وقت."
            books={quranSciencesBooks}
          />

          <PdfBookSection
            heading="كتب الأدعية"
            description="مجموعة من كتب الأدعية الصحيحة المنتقاة لتلازم المسلم في يومه."
            books={duaBooks}
          />

          <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h2 className="text-xl font-extrabold text-brand-800">
                كتب الحديث الشريف
              </h2>
              <span className="text-sm text-gray-600">
                {hadithBooks.length.toLocaleString("ar-EG")} كتابًا — أكثر من
                ٥٠٬٠٠٠ حديث
              </span>
            </div>
            <p className="text-gray-700">
              تصفَّح أشهر كتب الحديث الشريف، ولكلِّ كتاب شريط بحث سريع للوصول
              إلى أيِّ حديث بكلمة أو جملة.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hadithBooks.map((book) => (
                <Link
                  key={book.slug}
                  href={`/library/hadith/${book.slug}`}
                  className="card flex flex-col hover:border-brand-400 hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="text-lg font-bold text-brand-800 leading-tight">
                      {book.titleAr}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      {book.authorAr}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm leading-6 mt-3 flex-1">
                    {book.descriptionAr}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      ~{book.count.toLocaleString("ar-EG")} حديث
                    </span>
                    <span className="text-brand-700 font-bold">
                      افتح وابحث ←
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <p className="text-gray-700">
            استمع إلى تلاوة القرآن الكريم كاملًا لمجموعة من القرّاء برواية حفص
            عن عاصم (المصحف المرتَّل). اختر القارئ ثم اضغط على أي سورة لتشغيلها.
          </p>
          <AudioLibrary />
        </section>
      )}
    </div>
  );
}

function PdfBookSection({
  heading,
  description,
  books,
}: {
  heading: string;
  description: string;
  books: Book[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold text-brand-800">{heading}</h2>
      <p className="text-gray-700">{description}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.file} className="card flex flex-col">
            <div>
              <h3 className="text-xl font-bold text-brand-800">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{book.author}</p>
            </div>
            <p className="text-gray-700 leading-7 mt-3 flex-1">
              {book.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a href={book.file} download className="btn btn-primary">
                تحميل PDF
              </a>
              <a
                href={book.file}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                قراءة
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors sm:text-base ${
        active
          ? "bg-brand-700 text-white shadow-sm"
          : "bg-white text-brand-800 border border-brand-200 hover:bg-brand-100 hover:border-brand-400"
      }`}
    >
      {children}
    </button>
  );
}
