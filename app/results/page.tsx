import { getTeamData } from "../../lib/sheets";

export const revalidate = 3600;

export default async function ResultsPage() {
  const { games } = await getTeamData();
  return <main className="inner-page"><header className="inner-header container"><a className="brand" href="/"><span>P</span>HOENIX</a><a href="/stats">STATS →</a></header><section className="container page-title"><p className="eyebrow">2026 SEASON / LIVE DATA</p><h1>GAME<br /><em>RESULTS.</em></h1><p>試合結果・対戦相手・会場・試合動画を記録しています。</p></section><section className="container game-list"><div className="game-list-head"><span>DATE</span><span>TYPE / OPPONENT</span><span>PLACE</span><span>RESULT</span><span /></div>{games.map((game) => <article key={`${game.date}-${game.opponent}`} className="game-list-row"><time>2026.{game.date}</time><div><small>{game.type}</small><strong>PHOENIX <i>vs</i> {game.opponent}</strong></div><span>{game.place}</span><b className={`result result-${game.result}`}>{game.result}</b>{game.video && game.video !== "—" ? <a aria-label={`${game.opponent}戦の動画`} href={game.video} target="_blank" rel="noreferrer">WATCH ↗</a> : <span>—</span>}</article>)}</section></main>;
}

