import Link from "next/link";
import type { ProgramRow } from "@/types/program";

export default function ProgramCard({ program }: { program: ProgramRow }) {
  return (
    <article className="card">
      <div className="kicker">{program.school_name}</div>
      <h3>{program.program_name}</h3>
      <p className="muted small">
        {program.modality} · GRE: {program.gre_policy || "Check school"} · Rank #{program.editorial_rank}
      </p>
      <p className="muted small">
        Tuition: {program.tuition_total_usd == null ? "Check official site" : `$${program.tuition_total_usd.toLocaleString()}`}
      </p>
      <div>
        <Link className="button primary" href={`/programs/${program.slug}`}>View Program</Link>
        <a className="button" href={`/out/${program.slug}`}>Official Site</a>
      </div>
    </article>
  );
}
