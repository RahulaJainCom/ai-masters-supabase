import { NextResponse } from "next/server";
import { getProgramBySlug } from "@/lib/programs";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const program = await getProgramBySlug(slug);
  if (!program) return NextResponse.redirect(new URL("/", "http://localhost:3000"));
  return NextResponse.redirect(program.official_url);
}
