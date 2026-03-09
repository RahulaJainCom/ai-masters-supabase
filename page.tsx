import { getAllPrograms } from "@/lib/programs";

export default async function RankingPage() {
  const programs = await getAllPrograms();
  return (
    <div className="page">
      <div className="kicker">Ranking page</div>
      <h1>Best online AI master's programs</h1>
      <p className="muted">Rendered from the Postgres-ready program shape.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>School</th>
            <th>Program</th>
            <th>Scope</th>
            <th>Tuition</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.slug}>
              <td>{program.editorial_rank}</td>
              <td>{program.school_name}</td>
              <td>{program.program_name}</td>
              <td>{program.program_scope}</td>
              <td>{program.tuition_total_usd == null ? "—" : `$${program.tuition_total_usd.toLocaleString()}`}</td>
              <td><a href={`/programs/${program.slug}`}>Review</a> · <a href={`/out/${program.slug}`}>Official</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
