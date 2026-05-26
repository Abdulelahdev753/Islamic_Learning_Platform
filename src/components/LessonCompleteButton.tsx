"use client";
import { useEffect, useState } from "react";
import { markLessonComplete, readProgress, unmarkLessonComplete } from "@/lib/progress";

export function LessonCompleteButton({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(readProgress().lessonsCompleted.includes(slug));
  }, [slug]);

  function toggle() {
    if (done) {
      unmarkLessonComplete(slug);
      setDone(false);
    } else {
      markLessonComplete(slug);
      setDone(true);
    }
  }

  return (
    <button
      onClick={toggle}
      className={`btn ${done ? "btn-secondary" : "btn-primary"}`}
      aria-pressed={done}
    >
      {done ? "تم إكمال الدرس — إلغاء" : "تم إكمال الدرس"}
    </button>
  );
}
