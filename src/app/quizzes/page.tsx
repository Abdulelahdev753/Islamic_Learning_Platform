import { redirect } from "next/navigation";

export const metadata = { title: "الاختبارات · منصة التجويد" };

export default function QuizzesIndexPage() {
  redirect("/");
}
