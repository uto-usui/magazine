# 自動化フロー概念図

## 🎯 目的

このリポジトリの自動化フローの全体像を把握するためのドキュメント。

---

## 🔄 全体フロー概念図

```mermaid
flowchart TB
    subgraph GitHub_Actions["☁️ GitHub Actions"]
        CRON["⏰ 毎日 JST 09:00<br/>スケジュール実行"]
        FETCH["📥 Fetch RSS<br/>記事を自動取得"]
        CREATE_PR["📝 PR作成<br/>新着記事をPR化"]
        SEND_MAIL["📧 Send Newsletter<br/>メール自動送信"]
        SYNC_OBS["📔 Sync to Obsidian<br/>記事を同期"]
    end

    subgraph Local_PC["💻 ローカルPC（macOS）"]
        LAUNCHD["🔄 launchd<br/>1時間ごとにポーリング"]
        POLLER["📜 newsletter-poller.sh<br/>gh CLIでマージ検知"]
        PULL["⬇️ git pull<br/>最新masterを取得"]
        CLAUDE["🤖 Claude Code<br/>/create-newsletter-auto"]
        COMMIT["📤 commit & push<br/>newsletters/*.md"]
    end

    subgraph Obsidian_Vault["📓 Obsidian Vault"]
        ARTICLES_OBS["📄 Articles/<br/>同期された記事"]
        TAGGING["🏷️ タグ付け<br/>トピック分類"]
        LINKING["🔗 関連記事の紐付け<br/>双方向リンク"]
        NOTES["📝 メモとの関連付け<br/>知識の統合"]
    end

    subgraph External["🌐 外部サービス"]
        RSS["📰 各種RSSフィード<br/>70+のブログ・技術サイト"]
        RESEND["✉️ Resend API<br/>メール配信（無料枠）"]
    end

    %% メインフロー
    CRON --> FETCH
    RSS --> FETCH
    FETCH --> CREATE_PR
    CREATE_PR -->|"🧑 ユーザーがレビュー&マージ"| LAUNCHD

    %% ローカルフロー
    LAUNCHD --> POLLER
    POLLER -->|"新しいマージ検知"| PULL
    PULL --> CLAUDE
    CLAUDE --> COMMIT

    %% 送信トリガー
    COMMIT -->|"newsletters/*.md<br/>がmasterにpush"| SEND_MAIL
    SEND_MAIL --> RESEND

    %% Obsidian同期
    CREATE_PR -->|"マージ後"| SYNC_OBS
    SYNC_OBS --> ARTICLES_OBS
    ARTICLES_OBS --> TAGGING
    TAGGING --> LINKING
    LINKING --> NOTES

    %% スタイル
    classDef action fill:#2ea44f,stroke:#22863a,color:#fff
    classDef local fill:#0366d6,stroke:#0256cc,color:#fff
    classDef external fill:#6f42c1,stroke:#5a32a3,color:#fff
    classDef obsidian fill:#7c3aed,stroke:#6d28d9,color:#fff

    class CRON,FETCH,CREATE_PR,SEND_MAIL,SYNC_OBS action
    class LAUNCHD,POLLER,PULL,CLAUDE,COMMIT local
    class RSS,RESEND external
    class ARTICLES_OBS,TAGGING,LINKING,NOTES obsidian
```

---

## 🛠️ 使用ツール解説

### GitHub Actions
GitHub が提供する CI/CD サービス。リポジトリに `.github/workflows/*.yml` を配置することで、スケジュール実行やイベントトリガーによる自動処理が可能。無料プラン（パブリックリポジトリ）で月2,000分まで利用可能。

### Claude Code
Anthropic が提供する CLI ツール。ターミナルから Claude AI を呼び出し、コード生成・編集・ファイル操作などを自然言語で指示できる。`/create-newsletter` のようなカスタムコマンド（スキル）を定義可能。

### launchd（macOS）
macOS のシステムサービス管理デーモン。`~/Library/LaunchAgents/` に plist ファイルを配置することで、定期実行やログイン時の自動起動を設定できる。cron の macOS 版と考えてよい。

### gh CLI（GitHub CLI）
GitHub 公式の CLI ツール。`gh pr list`、`gh issue create` などでターミナルから GitHub を操作できる。本システムでは PR のマージ状態監視に使用。

### Resend
開発者向けのメール送信 API サービス。REST API でメール送信が可能。

**料金体系**:
- **無料プラン**: 月100通まで、1日3,000通が上限
- **共有ドメイン**: `onboarding@resend.dev` から送信（独自ドメイン設定も可能）
- **現在の使用状況**: 1人（自分のみ）に送信しているため、**完全に無料枠内**で運用

### Readability（@mozilla/readability）
Firefox のリーダーモードで使われている本文抽出ライブラリ。Web ページから広告やナビゲーションを除去し、本文のみを抽出する。RSS の content が不十分な場合のフォールバックとして使用。

### Turndown
HTML を Markdown に変換するライブラリ。抽出した記事本文を Markdown 形式に変換して保存。

### Obsidian
Markdown ベースのナレッジベースアプリ。ローカルファイルをそのまま扱い、双方向リンク（`[[]]`記法）でノート同士を関連付けできる。プラグインによる拡張性が高く、第二の脳として活用できる。

---

## 📋 各ステップの詳細

### 1️⃣ RSS取得（GitHub Actions / 自動）

| 項目 | 内容 |
|------|------|
| **トリガー** | 毎日 JST 09:00（UTC 00:00）に cron 実行 |
| **ワークフロー** | `.github/workflows/fetch-rss.yml` |
| **処理** | `pnpm run fetch-rss` を実行 |
| **出力** | 新着記事があれば PR を作成、なければ state のみ更新 |
| **エラー時** | 問題検出時は別途エラーログ PR を作成 |

### 2️⃣ PRレビュー&マージ（手動）

| 項目 | 内容 |
|------|------|
| **担当** | ユーザー（uto-usui） |
| **内容** | 新着記事の確認、不要な記事の削除、マージ |
| **PR タイトル** | `📰 YYYY-MM-DD HH:MM の新着記事` |

### 3️⃣ マージ検知（ローカル / launchd）

| 項目 | 内容 |
|------|------|
| **仕組み** | macOS の launchd で 1時間ごとにポーリング |
| **設定ファイル** | `~/Library/LaunchAgents/com.uto.newsletter-poller.plist` |
| **スクリプト** | `scripts/newsletter-poller.sh` |
| **検知方法** | `gh pr list --state merged --search "新着記事"` で確認 |
| **状態管理** | `~/.newsletter-last-merged` に最後のマージ時刻を保存 |

```bash
# launchd の状態確認
launchctl list | grep newsletter

# ログ確認
tail -f ~/Library/Logs/newsletter-poller.log
```

### 4️⃣ ニュースレター作成（ローカル / Claude Code）

| 項目 | 内容 |
|------|------|
| **トリガー** | poller がマージを検知すると Terminal.app を開いて実行 |
| **ツール** | Claude Code |
| **コマンド** | `/create-newsletter-auto`（非対話版） |
| **処理内容** | 記事を読み込み → 要約生成 → ニュースレター作成 → commit & push |
| **出力** | `newsletters/YYYY-MM-DD-HHmmss.md` |

**Claude Code スキル（カスタムコマンド）**:
- `/create-newsletter` - 対話版（記事選択可能）
- `/create-newsletter-auto` - 非対話版（自動選定）
- `/send-newsletter <file>` - 手動送信用

### 5️⃣ ニュースレター送信（GitHub Actions / 自動）

| 項目 | 内容 |
|------|------|
| **トリガー** | `newsletters/*.md` が master にプッシュされたとき |
| **ワークフロー** | `.github/workflows/send-newsletter.yml` |
| **処理** | Markdown → HTML 変換 → Resend API でメール送信 |
| **送信先** | `config/recipients.yml` に定義（現在は自分のみ） |

**Resend 無料枠について**:
- 月100通まで無料
- 1人への日次送信なので月30通程度 → **余裕で無料枠内**
- 将来的に受信者を増やす場合は Pro プラン（$20/月〜）を検討

### 6️⃣ Obsidian同期（GitHub Actions / 自動）

| 項目 | 内容 |
|------|------|
| **トリガー** | `articles/**` が master にプッシュされたとき |
| **ワークフロー** | `.github/workflows/sync-to-obsidian.yml` |
| **同期先** | `uto-usui/obsidian` リポジトリの `Articles/` |
| **方法** | rsync で差分同期 |

### 7️⃣ Obsidian での知識管理（手動）

同期された記事は Obsidian Vault 内で以下のように活用:

| 作業 | 内容 |
|------|------|
| **🏷️ タグ付け** | 記事にトピックタグを付与（`#design`, `#accessibility`, `#performance` など） |
| **🔗 関連記事の紐付け** | 双方向リンク（`[[記事名]]`）で関連する記事同士を接続 |
| **📝 メモとの関連付け** | 自分のメモやプロジェクトノートから記事を参照し、知識を統合 |
| **🗺️ グラフビュー** | リンク構造を可視化し、知識の関連性を俯瞰 |

この手動キュレーション作業により、単なる記事アーカイブではなく、**検索可能で関連性のある知識ベース**として機能する。

---

## 🗂️ ディレクトリと役割

```
ux-eng-magazine/
├── articles/              # 取得した記事（日付ごと）
├── images/                # 記事の画像
├── newsletters/           # 作成したニュースレター ← ここにpushで送信トリガー
├── scripts/
│   └── newsletter-poller.sh  # マージ検知スクリプト
├── config/
│   ├── feeds.yml          # RSSフィード設定（70+サイト）
│   ├── categories.yml     # カテゴリマスター
│   └── recipients.yml     # メール受信者（現在1人）
├── state/
│   └── processed.json     # 処理済み記事の管理
├── src/                   # TypeScriptソースコード
│   ├── rss/               # RSS取得・差分検出
│   ├── scraper/           # 本文抽出・変換
│   ├── storage/           # ファイル書き出し・状態管理
│   └── newsletter/        # メール送信機能
├── .claude/
│   └── commands/          # Claude Code カスタムコマンド
│       ├── create-newsletter.md
│       ├── create-newsletter-auto.md
│       └── send-newsletter.md
└── .github/workflows/
    ├── fetch-rss.yml         # RSS取得 → PR作成
    ├── send-newsletter.yml   # メール送信
    └── sync-to-obsidian.yml  # Obsidian同期
```

---

## 🔧 ローカル環境セットアップ

### launchd 設定ファイル（plist）

`~/Library/LaunchAgents/com.uto.newsletter-poller.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>EnvironmentVariables</key>
    <dict>
        <key>GH_TOKEN</key>
        <string>ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</string>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin</string>
    </dict>
    <key>Label</key>
    <string>com.uto.newsletter-poller</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/ux-eng-magazine/scripts/newsletter-poller.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>/Users/USERNAME/Library/Logs/newsletter-poller.log</string>
    <key>StandardOutPath</key>
    <string>/Users/USERNAME/Library/Logs/newsletter-poller.log</string>
    <key>StartInterval</key>
    <integer>3600</integer>
</dict>
</plist>
```

**設定項目**:
| キー | 説明 |
|------|------|
| `GH_TOKEN` | GitHub Personal Access Token（`repo` スコープが必要） |
| `ProgramArguments` | 実行するスクリプトのパス |
| `StartInterval` | 実行間隔（秒）。3600 = 1時間 |
| `RunAtLoad` | ログイン時に自動起動 |

### launchd の登録

```bash
# plist を配置（パスを自分の環境に合わせて編集後）
cp com.uto.newsletter-poller.plist ~/Library/LaunchAgents/

# launchd に登録
launchctl load ~/Library/LaunchAgents/com.uto.newsletter-poller.plist

# 動作確認
launchctl list | grep newsletter
```

### launchd の操作

```bash
# 停止
launchctl unload ~/Library/LaunchAgents/com.uto.newsletter-poller.plist

# 再開
launchctl load ~/Library/LaunchAgents/com.uto.newsletter-poller.plist

# 手動実行（テスト用）
./scripts/newsletter-poller.sh
```

---

## 🔗 関連ドキュメント

- [CLAUDE.md](../CLAUDE.md) - プロジェクト詳細・コマンドリファレンス
- [config/feeds.yml](../config/feeds.yml) - RSSフィード設定
- [config/recipients.yml](../config/recipients.yml) - 受信者設定
- [Resend 料金ページ](https://resend.com/pricing) - メールサービスの料金体系
