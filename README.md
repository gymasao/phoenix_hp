# PHOENIX Baseball Club

PHOENIX 野球チームの公式サイト用スターターテンプレートです。

## ページ構成（予定）

- `/` — トップページ、直近試合、チーム成績、打撃リーダー
- `/results` — 試合結果・スコア詳細
- `/stats` — 打撃・投手・守備の個人成績
- `/players` — 選手紹介
- `/about` — チーム紹介・活動方針・問い合わせ

2026年の試合結果・打撃成績・投手成績は、公開設定されたGoogleスプレッドシートから取得します。Next.jsの再検証は1時間ごとなので、シートを更新すると遅くとも1時間後にサイトへ反映されます。

## Googleスプレッドシートの公開設定

対象の成績表は「リンクを知っている全員が閲覧可」にしてください。サイト側はGoogle Visualization API経由で、`活動状況`・`野手成績`・`投手成績`の各シートを読み込みます。

## Local development

```bash
pnpm install
pnpm dev
```

### コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# Lint チェック
pnpm lint

# コードフォーマット
pnpm format

# フォーマットチェック
pnpm format:check
```

## 開発環境（Dev Containers）

本プロジェクトは VS Code の **Dev Containers** に対応しています。

### 必要な環境
- Docker Desktop
- VS Code 拡張機能: `Dev Containers` (`ms-vscode-remote.remote-containers`)

### 起動手順
1. VS Code で本リポジトリを開きます。
2. コマンドパレット（`Ctrl+Shift+P` / `Cmd+Shift+P`）を開き、`Dev Containers: Reopen in Container` を選択します。
3. 自動的に Node.js 22 + pnpm 環境および必要な拡張機能（ESLint, Prettier）がセットアップされ、`pnpm install` が実行されます。

### 自動フォーマット
VS Code のワークスペース設定および Dev Container 側で、ファイル保存時の Prettier 自動フォーマット (`formatOnSave`) と ESLint 自動修正が有効化されています。

