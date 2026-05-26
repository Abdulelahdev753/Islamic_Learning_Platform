import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "not_available" }, { status: 403 });
}
