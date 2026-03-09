import Link from "next/link";
import ProgramCard from "@/components/ProgramCard";
import { filterPages, getAllPrograms } from "@/lib/programs";

export default async function HomePage() {
  const programs = await getAllPrograms();
  return (
    <div className="page">
      <div className="kicker">Supabase + Postgres wired starter</div>
      <h1>Online AI master's programs</h1>
      <p className="muted">This starter is wired to use Supabase/Postgres first, with a local fallback dataset bundled for development.</p>
      <div>
        <Link href="/rankings/best-online-ai-masters-programs" className="button primary">View rankings</Link>
        <Link href="/programs" className="button">All programs</Link>
      </div>

      <h2 style={{ marginTop: 32 }}>Programmatic landing pages</h2>
      <div className="grid grid-3">
        {filterPages.map((page) => (
          <Link className="card" key={page.slug} href={`/filters/${page.slug}`}>
            <strong>{page.title}</strong>
            <div className="muted">/{`filters/${page.slug}`}</div>
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: 32 }}>Top programs</h2>
      <div className="grid grid-3">
        {programs.slice(0, 6).map((program) => <ProgramCard key={program.slug} program={program} />)}
      </div>
    </div>
  );
}
