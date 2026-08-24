# PHOENIX Baseball Club

PHOENIX 野球チームの公式サイト用スターターテンプレートです。

## ページ構成（予定）

- `/` — トップページ、直近試合、チーム成績、打撃リーダー
- `/results` — 試合結果・スコア詳細
- `/stats` — 打撃・投手・守備の個人成績
- `/players` — 選手紹介
- `/about` — チーム紹介・活動方針・問い合わせ

2026年の試合結果・打撃成績・投手成績は、提供された成績表を基に `data/team.ts` へ整理して表示しています。データ更新時はこのファイルを更新してください。

## Local development

```bash
pnpm install
pnpm dev
```

