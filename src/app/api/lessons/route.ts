import { NextResponse } from "next/server";
import { getAllLessons } from "@/lib/content";

export function GET() {
  return NextResponse.json({ lessons: getAllLessons() });
}
