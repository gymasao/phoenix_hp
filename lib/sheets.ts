const spreadsheetId = "1_kfSck8IegVqaxoPnHiJsbdUWDTIesIjqpTvGBS-ZRM";

type GoogleCell = { f?: string; v?: string | number | boolean | null } | null;
type GoogleTable = { cols: { label?: string }[]; rows: { c?: GoogleCell[] }[] };
type SheetRow = Record<string, string>;

export type TeamSummary = {
  games: string;
  wins: string;
  losses: string;
  draws: string;
  winningPercentage: string;
  runs: string;
  runsAllowed: string;
  battingAverage: string;
  era: string;
  homeRuns: string;
  stolenBases: string;
};
export type Game = {
  date: string;
  type: string;
  opponent: string;
  place: string;
  result: string;
  video: string;
};
export type Batter = {
  number: string;
  name: string;
  average: string;
  games: string;
  hits: string;
  rbi: string;
  ops: string;
};
export type Pitcher = {
  number: string;
  name: string;
  era: string;
  games: string;
  wins: string;
  losses: string;
  saves: string;
  strikeouts: string;
};
export type Member = {
  id: string;
  number: string;
  name: string;
  position: string;
  department: string;
  origin: string;
  imageUrl: string;
  comment: string;
};

const emptySummary: TeamSummary = {
  games: "—",
  wins: "—",
  losses: "—",
  draws: "—",
  winningPercentage: "—",
  runs: "—",
  runsAllowed: "—",
  battingAverage: "—",
  era: "—",
  homeRuns: "—",
  stolenBases: "—",
};

function cellValue(cell: GoogleCell) {
  return cell?.f ?? (cell?.v === null || cell?.v === undefined ? "" : String(cell.v));
}

async function readRange(sheet: string, range: string): Promise<SheetRow[]> {
  const url = new URL(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq`);
  url.searchParams.set("tqx", "out:json");
  url.searchParams.set("sheet", sheet);
  url.searchParams.set("range", range);
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`Google Sheets request failed: ${response.status}`);
  const payload = await response.text();
  const match = payload.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
  if (!match) throw new Error("Google Sheets returned an unexpected response");
  const table = (JSON.parse(match[1]) as { table: GoogleTable }).table;
  const headers = table.cols.map((column, index) => column.label?.trim() || `column-${index}`);
  return table.rows.map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, cellValue(row.c?.[index] ?? null)]))
  );
}

function value(row: SheetRow, key: string) {
  return (row[key] ?? "").trim() || "—";
}
function memberValue(row: SheetRow, keys: string[]) {
  const normalize = (key: string) => key.replace(/[\s　()（）]/g, "");
  const normalizedKeys = new Set(keys.map(normalize));
  const entry = Object.entries(row).find(([key]) => normalizedKeys.has(normalize(key)));
  return entry ? entry[1].trim() || "—" : "—";
}
function isVisible(row: SheetRow) {
  const visible = value(row, "表示").toLowerCase();
  return (
    visible === "true" || visible === "1" || visible === "○" || visible === "yes" || visible === "y"
  );
}
function hasPlayerName(row: SheetRow) {
  const name = value(row, "名前");
  return name !== "—" && name !== "";
}
function isUnpaidMember(row: SheetRow) {
  return Object.values(row).some((cell) => cell.trim() === "未納");
}
function number(value: string, digits = 0) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed.toFixed(digits) : "—";
}
function date(value: string) {
  const match = value.match(/(\d{1,2})\D(\d{1,2})/);
  return match ? `${match[1].padStart(2, "0")}.${match[2].padStart(2, "0")}` : value;
}

export async function getTeamData(): Promise<{
  summary: TeamSummary;
  games: Game[];
  batters: Batter[];
  pitchers: Pitcher[];
  members: Member[];
  updated: boolean;
}> {
  try {
    const [summaryRows, gameRows, batterRows, pitcherRows, memberRows] = await Promise.all([
      readRange("活動状況", "B21:L22").catch(() => readRange("活動状況", "B2:L30")),
      readRange("活動状況", "B25:K70").catch(() => readRange("活動状況", "B2:K80")),
      readRange("野手成績", "B6:Y200"),
      readRange("投手成績", "B5:Y200"),
      readRange("メンバー", "B1:Z100"),
    ]);
    const summaryRow = summaryRows.at(-1) ?? {};
    const games = gameRows
      .filter(
        (row) => value(row, "日付") !== "—" && value(row, "中止").trim().toUpperCase() !== "TRUE"
      )
      .map((row) => {
        const winLose = value(row, "勝敗");
        const score = value(row, "スコア");
        const record = value(row, "対戦成績");
        const result =
          score && score !== "—"
            ? `${winLose} ${score}`.trim()
            : record !== "—" && record
              ? record
              : winLose;
        return {
          date: date(value(row, "日付")),
          type: value(row, "種別"),
          opponent: value(row, "対戦相手"),
          place: value(row, "場所"),
          result,
          video: value(row, "動画リンク") === "-" ? "" : value(row, "動画リンク"),
        };
      });
    const batters = batterRows
      .filter((row) => isVisible(row) || hasPlayerName(row))
      .map((row) => ({
        number: `#${value(row, "背番号")}`,
        name: value(row, "名前"),
        average: number(value(row, "打率"), 3).replace(/^0/, ""),
        games: value(row, "試合"),
        hits: value(row, "安打"),
        rbi: value(row, "打点"),
        ops: number(value(row, "OPS"), 3),
      }))
      .sort((a, b) => Number(b.average) - Number(a.average));
    const pitchers = pitcherRows
      .filter((row) => isVisible(row) || hasPlayerName(row))
      .map((row) => ({
        number: `#${value(row, "背番号")}`,
        name: value(row, "名前"),
        era: number(value(row, "防御率"), 2),
        games: value(row, "試合"),
        wins: value(row, "勝"),
        losses: value(row, "負"),
        saves: value(row, "セーブ"),
        strikeouts: value(row, "奪三振"),
      }))
      .sort((a, b) => Number(a.era) - Number(b.era));
    const members = memberRows
      .filter(
        (row) =>
          !isUnpaidMember(row) &&
          (isVisible(row) || memberValue(row, ["名前", "名前（敬称略）"]) !== "—")
      )
      .map((row) => {
        const number = memberValue(row, ["背番号"]);
        const name = memberValue(row, ["名前", "名前（敬称略）", "名前(敬称略)"]);
        return {
          id: `${number}-${name}`,
          number: number === "—" ? "—" : `#${number}`,
          name,
          position: memberValue(row, ["守備位置", "ポジション"]),
          department: memberValue(row, ["部署", "所属", "部門"]),
          origin: memberValue(row, ["出身", "出身地", "出身校"]),
          imageUrl: memberValue(row, ["写真URL", "画像URL", "写真", "画像"]),
          comment: memberValue(row, ["コメント", "ひとこと", "紹介", "キャッチフレーズ"]),
        };
      })
      .sort((first, second) => first.number.localeCompare(second.number, "en", { numeric: true }));

    return {
      summary: {
        games: value(summaryRow, "試合"),
        wins: value(summaryRow, "勝ち"),
        losses: value(summaryRow, "負け"),
        draws: value(summaryRow, "引分"),
        winningPercentage: number(value(summaryRow, "勝率"), 3).replace(/^0/, ""),
        runs: value(summaryRow, "得点"),
        runsAllowed: value(summaryRow, "失点"),
        battingAverage: number(value(summaryRow, "打率"), 3).replace(/^0/, ""),
        era: number(value(summaryRow, "防御率"), 3),
        homeRuns: value(summaryRow, "本塁打"),
        stolenBases: value(summaryRow, "盗塁"),
      },
      games,
      batters,
      pitchers,
      members,
      updated: true,
    };
  } catch (error) {
    console.error("Unable to load the PHOENIX score sheet", error);
    return {
      summary: emptySummary,
      games: [],
      batters: [],
      pitchers: [],
      members: [],
      updated: false,
    };
  }
}
