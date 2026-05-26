import { redirect } from "next/navigation";

export const metadata = { title: "الدروس · منصة التجويد" };

export default function LessonsIndexPage() {
  redirect("/");
}
