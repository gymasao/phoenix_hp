import { getTeamData, type Batter } from "../../lib/sheets";

export const revalidate = 3600;

const rankingItems: { label: string; key: keyof Batter; format?: string }[] = [
  { label: "打率", key: "average" }, { label: "出塁率", key: "onBase" }, { label: "長打率", key: "slugging" },
  { label: "OPS", key: "ops" }, { label: "安打", key: "hits", format: "count" }, { label: "本塁打", key: "homeRuns", format: "count" },
  { label: "打点", key: "rbi", format: "count" }, { label: "得点", key: "runs", format: "count" }, { label: "盗塁", key: "steals", format: "count" },
];

function RankingCard({ item, batters }: { item: (typeof rankingItems)[number]; batters: Batter[] }) {
  const rows = [...batters].sort((a, b) => Number(b[item.key]) - Number(a[item.key])).slice(0, 5);
  return <article className="ranking-card"><div className="ranking-card-head"><span>{item.label}</span><small>TOP 5</small></div>{rows.map((player, index) => <div className="ranking-row" key={`${item.label}-${player.number}`}><b>{String(index + 1).padStart(2, "0")}</b><span><strong>{player.name}</strong><small>{player.number}</small></span><em>{item.format === "count" ? player[item.key] : player[item.key]}</em></div>)}</article>;
}

export default async function RankingsPage() {
  const { batters } = await getTeamData();
  return <main className="inner-page"><header className="inner-header container"><a className="brand" href="/"><span>P</span>HOENIX</a><nav className="inner-nav"><a href="/results">RESULTS</a><a href="/stats">STATS</a></nav></header><section className="container page-title"><p className="eyebrow">2026 SEASON / LIVE DATA</p><h1>BATTER<br /><em>RANKINGS.</em></h1><p>成績表のランキング項目をもとに、打者の上位5名を表示しています。</p></section><section className="container ranking-grid">{rankingItems.map((item) => <RankingCard key={item.label} item={item} batters={batters} />)}</section></main>;
}

