import { getTeamData } from "../lib/sheets";

export const revalidate = 3600;

function getResultState(result: string) {
  if (!result || result === "—") return { className: "draw", text: "—" };
  if (result.includes("○")) return { className: "win", text: result };
  if (result.includes("×")) return { className: "lose", text: result };
  if (result.includes("△")) return { className: "draw", text: result };
  return { className: "score", text: result };
}

export default async function Home() {
  const { batters, games, summary: teamSummary, updated } = await getTeamData();
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-content container">
          <h1>
            <span className="company-title">NTTDATA</span>
            <br />
            <em>PHOENIX</em>
          </h1>
          <p className="hero-copy">
            一球に、想いを。
            <br />
            PHOENIXは仲間と挑み、勝利を目指す野球チームです。
          </p>
          <a className="button" href="/about">
            <b>→</b>
          </a>
        </div>
        <div className="hero-number">P</div>
        <div className="diamond">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
      <section className="season container" id="results">
        <div className="section-heading">
          <div>
            <p className="eyebrow">2026 SEASON {updated && " / LIVE DATA"}</p>
            <h2>GAME RESULTS</h2>
          </div>
          <a href="/results">
            ALL RESULTS <b>→</b>
          </a>
        </div>
        <div className="record-row">
          <div className="record">
            <strong>{teamSummary.wins}</strong>
            <span>WINS</span>
          </div>
          <div className="record">
            <strong>{teamSummary.losses}</strong>
            <span>LOSES</span>
          </div>
          <div className="record">
            <strong>{teamSummary.winningPercentage}</strong>
            <span>WIN PCT</span>
          </div>
          <p>
            {teamSummary.games} GAMES
            <br />
            <b>{teamSummary.draws} DRAW</b>
          </p>
        </div>
        <div className="results-grid">
          {games
            .slice(-3)
            .reverse()
            .map((game) => {
              const resultState = getResultState(game.result);
              return (
                <article className="game" key={`${game.date}-${game.opponent}`}>
                  <div>
                    <time>2026.{game.date}</time>
                    <span className={resultState.className}>{resultState.text}</span>
                  </div>
                  <h3>
                    PHOENIX <small>vs</small> {game.opponent}
                  </h3>
                  <strong>{game.type}</strong>
                </article>
              );
            })}
        </div>
      </section>
      <section className="stats" id="stats">
        <div className="container stats-inner">
          <div className="stats-title">
            <p className="eyebrow">2026 SEASON</p>
            <h2>
              TEAM
              <br />
              <em>STATS.</em>
            </h2>
            <p>選手たちの記録と、チームの軌跡。</p>
            <a className="button light" href="/stats">
              成績一覧へ <b>→</b>
            </a>
          </div>
          <div className="stat-cards">
            <article>
              <span>TEAM BATTING AVG.</span>
              <strong>{teamSummary.battingAverage}</strong>
              <small>
                {teamSummary.runs} 得点 / {teamSummary.runsAllowed} 失点
              </small>
            </article>
            <article>
              <span>TEAM ERA</span>
              <strong>{teamSummary.era}</strong>
              <small>全 {teamSummary.games} 試合</small>
            </article>
            <article>
              <span>STOLEN BASES</span>
              <strong>{teamSummary.stolenBases}</strong>
              <small>HOME RUNS {teamSummary.homeRuns}</small>
            </article>
          </div>
        </div>
      </section>
      <section className="leaders container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">2026 BATTING</p>
            <h2>BATTING LEADERS</h2>
          </div>
          <a href="/stats">
            VIEW STATS <b>→</b>
          </a>
        </div>
        <div className="leader-table">
          <div className="table-head">
            <span>PLAYER</span>
            <span>AVG</span>
            <span>H</span>
            <span>RBI</span>
          </div>
          {batters.slice(0, 3).map((player) => (
            <div className="table-row" key={player.number}>
              <span>
                <b>{player.number}</b> {player.name}
              </span>
              <strong>{player.average}</strong>
              <span>{player.hits}</span>
              <span>{player.rbi}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="about" id="about">
        <div className="container about-inner">
          <p className="eyebrow">ABOUT PHOENIX</p>
          <a href="/about">
            チームについて <b>→</b>
          </a>
        </div>
      </section>
      <footer className="container">
        <a className="brand" href="#top">
          <span>P</span>HOENIX
        </a>
        <p>© 2026 PHOENIX BASEBALL CLUB</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
