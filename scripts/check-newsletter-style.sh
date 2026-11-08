#!/usr/bin/env bash
# ニュースレター1号のなかで、癖になりやすい表現が上限を超えていないかを数える。
# 上限の根拠と言い換えは ai/docs/proofreading.md を参照。
# 使い方: scripts/check-newsletter-style.sh newsletters/YYYY-MM-DD-HHmmss.md
# 上限を超えた表現があれば終了コード 1。
set -euo pipefail

file="${1:?newsletter file is required}"

# 見出し・出典の引用行・「その他の記事」のリンク行は記事側の言葉なので数えない。
# 0件でも rg の終了コード 1 で止まらないよう `|| true` を付ける
# skip が 1 の規則は、3行まとめなどの箇条書きの行も数えない
matches() {
  local exclude='^[0-9]+:(#|>|- \[)'
  [[ "${skip:-}" == 1 ]] && exclude='^[0-9]+:(#|>|- )'
  { rg -n --no-heading -- "$pattern" "$file" || true; } | { rg -v "$exclude" || true; }
}

# 行を除いてから数える（rg -o で先に切り出すと、行頭で除外できない）
count_matches() {
  matches | { rg -o -- "$pattern" || true; } | wc -l | tr -d ' '
}

# 正規表現<TAB>上限<TAB>名前[<TAB>箇条書きを数えないなら 1]
rules=$(cat <<'EOF'
のは、	4	「〜のは、〜です」の構文
参考にな	3	参考になる
という指摘	3	という指摘
UXエンジニア(リング)?(の(立場|視点|目|観点)|にとって)	3	UXエンジニアの視点で／にとって
(おもしろい|興味深い)(のは|点|ところ)	2	おもしろいのは／興味深いのは
ではなく	5	A ではなく B
いちばん	2	いちばん
(さん|氏|著者|筆者|書き手|作者)(は|が|自身)	2	元記事の書き手が主語（詳細解説）	1
てみたい|(すき|好き)です|うれしい|ありがたい	0	個人の好み・願望
という(見方|判断|考え|観察|指摘|主張)です	3	という見方です／判断です
視点	3	視点
納得感	0	納得感
示唆	0	示唆
価値を(上げ|高め)	0	価値を上げる
EOF
)

over=0
while IFS=$'\t' read -r pattern limit label skip; do
  count=$(count_matches)
  if (( count > limit )); then
    printf 'NG  %-32s %2d 回（上限 %d）\n' "$label" "$count" "$limit"
    matches | cut -c1-120 | sed 's/^/      /'
    over=1
  else
    printf 'OK  %-32s %2d 回（上限 %d）\n' "$label" "$count" "$limit"
  fi
done <<< "$rules"

exit "$over"
