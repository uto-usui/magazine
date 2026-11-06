---
allowed-tools: [Read, Write, Glob, Bash]
description: ニュースレターから15分の音声版（会話台本 → Gemini TTS → MP3）を作る
---

# 音声版の作成

**引数**: $ARGUMENTS（オプション: ニュースレターのファイル。省略時は `newsletters/` の最新）

## 1. 対象を決める

```bash
NEWSLETTER=${ARGUMENTS:-$(ls newsletters/[0-9]*.md | sort | tail -1)}
EPISODE=$(basename "$NEWSLETTER" .md)
SCRIPT="podcasts/scripts/${EPISODE}.json"
```

`podcasts/audio/${EPISODE}.mp3` がすでにあれば、何もせず終える。

## 2. 台本を書く

ニュースレターを読み、耳で聞く2人の会話台本を `$SCRIPT` に書く。

- A（Aoi）は記事を紹介する案内役、B（Ren）は聞き手。B は短い相づちや質問で話を進める
- **長さは最大 15 分（本文 5,000 字まで）**。5,500 字を超えると生成側で止まる
- 構成: オープニング（150字ほど）→ 詳細掲載の記事を1本ずつ → エンディング（100字ほど）。「その他の記事」は読まない
- 記事1本は 300〜400 字が目安。15本の号はそれでちょうど15分前後になる。記事が少ない号は短くてよく、15分に届かせるための水増しはしない
- 記事ごとに、何の記事か・いちばん大事な点・UXエンジニアにとっての意味を話す。3行まとめと詳細解説から選び、全部は読まない
- 文体は `ai/docs/style-guide.md` に従う。話し言葉なので1文を短くする

耳で聞くための書き換え（TTS はそのまま読むので、台本の段階で直す）:

- 英語のタイトルはそのまま読まず、日本語で内容を言う（例: 「Design systems should be fast by default」→「デザインシステムは最初から速くあるべき、という記事」）
- 製品名・人名など短い英語はそのまま書いてよい（Figma、Claude、WCAG は正しく読める）
- URL、コード、カラーコード（`#4f46e5` は「藍色」などに）、絵文字、記号は書かない
- 出典名は「Zennの記事」「Smashing Magazine の記事」くらいに短く言う
- 読みが分かれる漢字は言い換える（実際に「一行」が「いってん」と読まれた）

形式:

```json
{
  "episode": "2026-11-06-150018",
  "newsletter": "newsletters/2026-11-06-150018.md",
  "segments": [
    { "id": "opening", "title": "オープニング", "lines": [{ "speaker": "A", "text": "..." }] },
    { "id": "a01", "title": "記事の短い題", "lines": [...] },
    { "id": "ending", "title": "エンディング", "lines": [...] }
  ]
}
```

記事のセグメントは `a01`, `a02`, ... と順に振る。1セグメントが1回の TTS リクエストになる。

## 3. 字数と予算を確かめる

```bash
pnpm run podcast "$SCRIPT" --dry-run
```

`NG:` が出たら台本を直してもう一度確かめる。予算や1日の本数で止まった場合は、作らずにその理由を報告して終える。

## 4. 音声を作る

```bash
pnpm run podcast "$SCRIPT"
```

途中で失敗しても、作り終えたセグメントは `podcasts/audio/${EPISODE}/` に残っているので、同じコマンドで続きから作れる（二重に払わない）。

## 5. 報告

- MP3 のパスと長さ
- この回の料金と、今月の使用額（`pnpm run podcast:usage` の出力）

コミットはしない。台本（`podcasts/scripts/`）と使用量の記録（`state/tts-usage.json`）はコミット対象、MP3 は `.gitignore` 済み。
