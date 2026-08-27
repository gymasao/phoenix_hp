import { getTeamData } from "../../lib/sheets";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const { games } = await getTeamData();
  const latestGames = [...games].reverse();
  return <main className="inner-page"><header className="inner-header container"><a className="brand" href="/"><span>P</span>HOENIX</a><a href="/stats">チーム成績 →</a></header><section className="container page-title"><p className="eyebrow">2026シーズン / 最新データ</p><h1>試合<br /><em>結果</em></h1><p>これまでの試合結果、対戦相手、会場、試合映像をご確認いただけます。</p></section><section className="container game-list"><div className="game-list-head"><span>日付</span><span>試合種別 / 対戦相手</span><span>会場</span><span>結果</span><span /></div>{latestGames.map((game) => <article key={`${game.date}-${game.opponent}`} className="game-list-row"><time>2026.{game.date}</time><div><small>{game.type}</small><strong>PHOENIX <i>対</i> {game.opponent}</strong></div><span>{game.place}</span><b className={`result result-${game.result}`}>{game.result}</b>{game.video && game.video !== "—" ? <a aria-label={`${game.opponent}戦の試合映像`} href={game.video} target="_blank" rel="noreferrer">映像を見る →</a> : <span>—</span>}</article>)}</section></main>;
}
