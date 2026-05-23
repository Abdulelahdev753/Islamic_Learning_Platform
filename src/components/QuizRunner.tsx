"use client";

import { useState } from "react";
import { recordQuizScore } from "@/lib/progress";
import type { PublicQuiz } from "@/lib/content";

type GradeResponse = {
  slug: string;
  score: number;
  total: number;
  perQuestion: {
    id: string;
    correct: boolean;
    correctAnswer: number;
    given: number | null;
    explanation: string | null;
  }[];
};

export function QuizRunner({ quiz }: { quiz: PublicQuiz }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<GradeResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function choose(qid: string, idx: number) {
    if (result) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/quizzes/${quiz.slug}/grade`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as GradeResponse;
      setResult(data);
      recordQuizScore(quiz.slug, data.score, data.total);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطأ غير معروف");
    } finally {
      setSubmitting(false);
    }
  }

  function restart() {
    setAnswers({});
    setResult(null);
    setError(null);
  }

  const allAnswered = quiz.questions.every((q) => typeof answers[q.id] === "number");

  return (
    <div className="space-y-6">
      {result && (
        <div className="card bg-brand-50 border-brand-200">
          <h2 className="text-2xl font-extrabold text-brand-800 mb-2">
            نتيجتك: {result.score} / {result.total}
          </h2>
          <p className="text-brand-700">
            {result.score === result.total
              ? "إجابات ممتازة، أحسنت! ما شاء الله."
              : result.score / result.total >= 0.6
                ? "نتيجة طيّبة — راجع الإجابات الخاطئة لتثبيت المعلومة."
                : "لا بأس — راجع الدرس وحاول مرّة أخرى."}
          </p>
          <button onClick={restart} className="btn btn-secondary mt-4">
            إعادة المحاولة
          </button>
        </div>
      )}

      {quiz.questions.map((q, i) => {
        const perQ = result?.perQuestion.find((p) => p.id === q.id);
        return (
          <div key={q.id} className="card">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 grid place-items-center font-bold">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 leading-8">{q.prompt}</p>
                <div className="mt-4 grid gap-2">
                  {q.choices.map((choice, idx) => {
                    const selected = answers[q.id] === idx;
                    let cls =
                      "border rounded-lg p-3 text-right cursor-pointer transition-colors leading-8";
                    if (result && perQ) {
                      if (idx === perQ.correctAnswer)
                        cls += " bg-green-50 border-green-400 text-green-900";
                      else if (idx === perQ.given && !perQ.correct)
                        cls += " bg-red-50 border-red-400 text-red-900";
                      else cls += " border-gray-200 text-gray-700";
                    } else if (selected) {
                      cls += " bg-brand-50 border-brand-400 text-brand-900";
                    } else {
                      cls += " border-gray-200 hover:bg-gray-50";
                    }
                    return (
                      <label key={idx} className={cls}>
                        <input
                          type="radio"
                          name={q.id}
                          value={idx}
                          checked={selected}
                          onChange={() => choose(q.id, idx)}
                          disabled={!!result}
                          className="ml-2 align-middle"
                        />
                        {choice}
                      </label>
                    );
                  })}
                </div>
                {result && perQ?.explanation && (
                  <p className="mt-3 text-sm bg-amber-50 border border-amber-200 rounded p-3 text-amber-900 leading-7">
                    <strong>الشرح: </strong>
                    {perQ.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {!result && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            تمّ الإجابة على {Object.keys(answers).length} من {quiz.questions.length}
          </p>
          <button
            onClick={submit}
            disabled={!allAnswered || submitting}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "جارٍ التصحيح..." : "إرسال الإجابات"}
          </button>
        </div>
      )}
      {error && <p className="text-red-700">حدث خطأ أثناء التصحيح: {error}</p>}
    </div>
  );
}
