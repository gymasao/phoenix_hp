import { getTeamData } from "../../lib/sheets";

export const revalidate = 3600;

function StatTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <section className="stat-table">
      <h2>{title}</h2>
      <div className="stat-head">
        {headers.map((header) => (
          <span key={header}>{header}</span>
        ))}
      </div>
      {rows.map((row) => (
        <div className="stat-row" key={row[0]}>
          {row.map((value, index) => (
            <span key={`${row[0]}-${index}`}>{value}</span>
          ))}
        </div>
      ))}
    </section>
  );
}

export default async function StatsPage() {
  const { batters, pitchers, summary: teamSummary } = await getTeamData();
  return (
    <main className="inner-page">
      <header className="inner-header container">
        <a className="brand" href="/">
          <span>P</span>HOENIX
        </a>
        <a href="/results">RESULTS →</a>
      </header>
      <section className="container page-title">
        <p className="eyebrow">2026 SEASON / LIVE DATA</p>
        <h1>
          TEAM
          <br />
          <em>STATS.</em>
        </h1>
        <p>シーズンのチーム成績と、規定の有無に関わらない個人成績です。</p>
      </section>
      <section className="container stat-summary">
        <article>
          <span>TEAM AVG.</span>
          <b>{teamSummary.battingAverage}</b>
        </article>
        <article>
          <span>TEAM ERA</span>
          <b>{teamSummary.era}</b>
        </article>
        <article>
          <span>HOME RUNS</span>
          <b>{teamSummary.homeRuns}</b>
        </article>
        <article>
          <span>STOLEN BASES</span>
          <b>{teamSummary.stolenBases}</b>
        </article>
      </section>
      <div className="container stats-tables">
        <StatTable
          title="BATTING"
          headers={["PLAYER", "AVG", "G", "H", "RBI", "OPS"]}
          rows={batters.map((player) => [
            `${player.number} ${player.name}`,
            player.average,
            player.games,
            player.hits,
            player.rbi,
            player.ops,
          ])}
        />
        <StatTable
          title="PITCHING"
          headers={["PLAYER", "ERA", "G", "W", "L", "SV", "SO"]}
          rows={pitchers.map((player) => [
            `${player.number} ${player.name}`,
            player.era,
            player.games,
            player.wins,
            player.losses,
            player.saves,
            player.strikeouts,
          ])}
        />
      </div>
    </main>
  );
}
