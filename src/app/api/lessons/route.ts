import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ error: "not_available" }, { status: 403 });
}
