import localPrograms from "@/data.programs.json";
import type { ProgramRow } from "@/types/program";
import { getPublicSupabase, getServiceSupabase } from "@/lib/supabase";

export type FilterSlug = "no-gre" | "under-20000";

export const filterPages = [
  { slug: "no-gre", title: "Online AI Master's Programs With No GRE" },
  { slug: "under-20000", title: "Affordable Online AI Master's Programs Under $20,000" }
] as const;

export async function getAllPrograms(): Promise<ProgramRow[]> {
  if (process.env.USE_LOCAL_JSON_FALLBACK !== "true") {
    const supabase = getServiceSupabase() ?? getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("editorial_rank", { ascending: true });
      if (!error && data) return data as ProgramRow[];
    }
  }
  return localPrograms as ProgramRow[];
}

export async function getProgramBySlug(slug: string): Promise<ProgramRow | null> {
  const rows = await getAllPrograms();
  return rows.find((p) => p.slug === slug) ?? null;
}

export async function getAllProgramSlugs(): Promise<string[]> {
  const rows = await getAllPrograms();
  return rows.map((p) => p.slug);
}

export async function getProgramsForFilter(filter: FilterSlug): Promise<ProgramRow[]> {
  const rows = await getAllPrograms();
  switch (filter) {
    case "no-gre":
      return rows.filter((p) => (p.gre_policy ?? "").toLowerCase().startsWith("no"));
    case "under-20000":
      return rows.filter((p) => p.tuition_total_usd !== null && p.tuition_total_usd <= 20000);
    default:
      return [];
  }
}
