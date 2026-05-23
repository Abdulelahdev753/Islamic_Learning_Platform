import { getAllLessons, getAllQuizzes } from "@/lib/content";
import { ProgressClient } from "./ProgressClient";

export const metadata = { title: "تقدّمي · منصة التجويد" };

export default function ProgressPage() {
  const lessons = getAllLessons();
  const quizzes = getAllQuizzes();
  return <ProgressClient lessons={lessons} quizzes={quizzes} />;
}
