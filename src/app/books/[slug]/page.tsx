import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const books: Record<
  string,
  { title: string; author: string; description: string; file: string }
> = {
  "tajweed-muyassar": {
    title: "التجويد الميسَّر",
    author: "د. عبد العزيز بن علي الحربي",
    description:
      "كتاب مختصر في أحكام التجويد بأسلوب سهل، يصلح للمبتدئين والمتعلّمين على حدٍّ سواء.",
    file: "/books/tajweed-muyassar.pdf",
  },
  "ar_tafseer_moyasser": {
    title: "التفسير الميسَّر",
    author: "نخبة من العلماء — مجمع الملك فهد",
    description:
      "تفسير مختصر لمعاني آيات القرآن الكريم بأسلوب سهل واضح، صادر عن مجمع الملك فهد لطباعة المصحف الشريف.",
    file: "/books/ar_tafseer_moyasser.pdf",
  },
  "sahih-adiyah": {
    title: "المختار من صحيح الأدعية",
    author: "مجموعة من الأدعية الصحيحة",
    description:
      "مجموعة منتقاة من الأدعية الواردة في القرآن والسنّة الصحيحة لتلازم المسلم في يومه.",
    file: "/books/sahih-adiyah.pdf",
  },
};

const SITE_URL = "https://islamic-learning-platform-meifdk.cranl.net";

export function generateStaticParams() {
  return Object.keys(books).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = books[slug];
  if (!book) return {};

  return {
    title: `${book.title} — منصة تعليم التجويد`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      url: `${SITE_URL}/books/${slug}`,
      siteName: "منصة تعليم التجويد",
      type: "article",
      locale: "ar_SA",
    },
    twitter: {
      card: "summary",
      title: book.title,
      description: book.description,
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books[slug];
  if (!book) notFound();

  return (
    <div className="max-w-xl mx-auto text-center space-y-6 py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-100 text-brand-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h7v7l2-1 2 1V4h2v12z" />
        </svg>
      </div>

      <h1 className="text-3xl font-extrabold text-brand-800">{book.title}</h1>
      <p className="text-gray-600 font-bold">{book.author}</p>
      <p className="text-gray-700 leading-8 max-w-md mx-auto">
        {book.description}
      </p>

      <div className="flex items-center justify-center gap-3 pt-4">
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

      <div className="pt-6">
        <Link
          href="/library"
          className="text-brand-700 hover:text-brand-900 text-sm font-bold"
        >
          ← العودة إلى المكتبة
        </Link>
      </div>
    </div>
  );
}
