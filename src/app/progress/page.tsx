import { redirect } from "next/navigation";

export const metadata = { title: "تقدّمي · منصة التجويد" };

export default function ProgressPage() {
  redirect("/");
}
