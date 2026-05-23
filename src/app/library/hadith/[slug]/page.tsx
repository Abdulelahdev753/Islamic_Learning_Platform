import { notFound } from "next/navigation";
import { HadithReader } from "@/components/HadithReader";
import { getHadithBook, hadithBooks } from "@/lib/hadith";

export function generateStaticParams() {
  return hadithBooks.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getHadithBook(slug);
  if (!book) return { title: "كتب الحديث · منصة التجويد" };
  return {
    title: `${book.titleAr} · كتب الحديث`,
    description: book.descriptionAr,
  };
}

export default async function HadithBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getHadithBook(slug);
  if (!book) notFound();
  return <HadithReader book={book} />;
}
