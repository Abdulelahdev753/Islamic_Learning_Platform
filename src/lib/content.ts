import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type LessonMeta = {
  slug: string;
  title: string;
  order: number;
  summary: string;
  quiz?: string;
};

export type Lesson = LessonMeta & {
  body: string;
};

export type QuizQuestion = {
  id: string;
  type: "single";
  prompt: string;
  choices: string[];
  answer: number;
  explanation?: string;
};

export type Quiz = {
  slug: string;
  title: string;
  questions: QuizQuestion[];
};

export type PublicQuizQuestion = Omit<QuizQuestion, "answer" | "explanation">;
export type PublicQuiz = {
  slug: string;
  title: string;
  questions: PublicQuizQuestion[];
};

const LESSONS_DIR = path.join(process.cwd(), "content", "lessons");
const QUIZZES_DIR = path.join(process.cwd(), "content", "quizzes");

function readLessonFile(filename: string): Lesson {
  const filePath = path.join(LESSONS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = String(data.slug ?? filename.replace(/\.mdx?$/, ""));
  return {
    slug,
    title: String(data.title ?? slug),
    order: Number(data.order ?? 999),
    summary: String(data.summary ?? ""),
    quiz: data.quiz ? String(data.quiz) : undefined,
    body: content,
  };
}

export function getAllLessons(): LessonMeta[] {
  if (!fs.existsSync(LESSONS_DIR)) return [];
  const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const lessons = files.map(readLessonFile);
  lessons.sort((a, b) => a.order - b.order);
  return lessons.map(({ body, ...meta }) => meta);
}

export function getLessonBySlug(slug: string): Lesson | null {
  if (!fs.existsSync(LESSONS_DIR)) return null;
  const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  for (const f of files) {
    const lesson = readLessonFile(f);
    if (lesson.slug === slug) return lesson;
  }
  return null;
}

export function getAllQuizzes(): { slug: string; title: string; questionCount: number }[] {
  if (!fs.existsSync(QUIZZES_DIR)) return [];
  const files = fs.readdirSync(QUIZZES_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => {
      const raw = fs.readFileSync(path.join(QUIZZES_DIR, f), "utf8");
      const q = JSON.parse(raw) as Quiz;
      return { slug: q.slug, title: q.title, questionCount: q.questions.length };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getQuizBySlug(slug: string): Quiz | null {
  if (!fs.existsSync(QUIZZES_DIR)) return null;
  const files = fs.readdirSync(QUIZZES_DIR).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    const raw = fs.readFileSync(path.join(QUIZZES_DIR, f), "utf8");
    const q = JSON.parse(raw) as Quiz;
    if (q.slug === slug) return q;
  }
  return null;
}

export function toPublicQuiz(quiz: Quiz): PublicQuiz {
  return {
    slug: quiz.slug,
    title: quiz.title,
    questions: quiz.questions.map(({ answer, explanation, ...rest }) => rest),
  };
}
