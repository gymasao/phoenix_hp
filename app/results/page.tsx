import { games } from "../../data/team";

export default function ResultsPage() {
  return <main className="inner-page"><header className="inner-header container"><a className="brand" href="/"><span>P</span>HOENIX</a><a href="/stats">STATS →</a></header><section className="container page-title"><p className="eyebrow">2026 SEASON</p><h1>GAME<br /><em>RESULTS.</em></h1><p>試合結果・対戦相手・会場・試合動画を記録しています。</p></section><section className="container game-list"><div className="game-list-head"><span>DATE</span><span>TYPE / OPPONENT</span><span>PLACE</span><span>RESULT</span><span /></div>{games.map(([date,type,opponent,place,result,video]) => <article key={`${date}-${opponent}`} className="game-list-row"><time>2026.{date}</time><div><small>{type}</small><strong>PHOENIX <i>vs</i> {opponent}</strong></div><span>{place}</span><b className={`result result-${result}`}>{result}</b>{video ? <a aria-label={`${opponent}戦の動画`} href={video} target="_blank" rel="noreferrer">WATCH ↗</a> : <span>—</span>}</article>)}</section></main>;
}

