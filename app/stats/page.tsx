import { getTeamData } from "../../lib/sheets";

export const revalidate = 3600;

function StatTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return <section className="stat-table"><h2>{title}</h2><div className="stat-head">{headers.map((header) => <span key={header}>{header}</span>)}</div>{rows.map((row) => <div className="stat-row" key={row[0]}>{row.map((value, index) => <span key={`${row[0]}-${index}`}>{value}</span>)}</div>)}</section>;
}

export default async function StatsPage() {
  const { batters, pitchers, summary: teamSummary } = await getTeamData();
  return <main className="inner-page"><header className="inner-header container"><a className="brand" href="/"><span>P</span>HOENIX</a><a href="/results">試合結果 →</a></header><section className="container page-title"><p className="eyebrow">2026シーズン / 最新データ</p><h1>チーム<br /><em>成績</em></h1><p>チーム全体の成績と、選手ごとの打撃・投手成績をご覧いただけます。</p></section><section className="container stat-summary"><article><span>チーム打率</span><b>{teamSummary.battingAverage}</b></article><article><span>チーム防御率</span><b>{teamSummary.era}</b></article><article><span>本塁打</span><b>{teamSummary.homeRuns}</b></article><article><span>盗塁</span><b>{teamSummary.stolenBases}</b></article></section><div className="container stats-tables"><StatTable title="打撃成績" headers={["選手","打率","試合","安打","打点","OPS"]} rows={batters.map((player) => [`${player.number} ${player.name}`, player.average, player.games, player.hits, player.rbi, player.ops])} /><StatTable title="投手成績" headers={["選手","防御率","試合","勝","敗","セーブ","奪三振"]} rows={pitchers.map((player) => [`${player.number} ${player.name}`, player.era, player.games, player.wins, player.losses, player.saves, player.strikeouts])} /></div></main>;
}
