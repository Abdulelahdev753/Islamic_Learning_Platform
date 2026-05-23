"use client";

const KEY = "tajweed:progress:v1";

export type QuizScore = {
  score: number;
  total: number;
  takenAt: string;
};

export type ProgressState = {
  lessonsCompleted: string[];
  quizScores: Record<string, QuizScore>;
};

const empty: ProgressState = { lessonsCompleted: [], quizScores: {} };

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      lessonsCompleted: Array.isArray(parsed.lessonsCompleted) ? parsed.lessonsCompleted : [],
      quizScores: parsed.quizScores && typeof parsed.quizScores === "object" ? parsed.quizScores : {},
    };
  } catch {
    return empty;
  }
}

function write(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("tajweed-progress-changed"));
}

export function markLessonComplete(slug: string) {
  const state = readProgress();
  if (!state.lessonsCompleted.includes(slug)) {
    state.lessonsCompleted.push(slug);
    write(state);
  }
}

export function unmarkLessonComplete(slug: string) {
  const state = readProgress();
  state.lessonsCompleted = state.lessonsCompleted.filter((s) => s !== slug);
  write(state);
}

export function recordQuizScore(slug: string, score: number, total: number) {
  const state = readProgress();
  state.quizScores[slug] = { score, total, takenAt: new Date().toISOString() };
  write(state);
}

export function clearAllProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("tajweed-progress-changed"));
}
