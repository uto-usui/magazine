---
title: "CSSだけでつくる！ スクロールトリガーアニメーション"
source: "https://ics.media/entry/261027/"
publishedDate: "2026-10-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "sawada-naomi"
---

ある地点までスクロールしたら、アニメーションを開始する。そんな演出をCSSだけで実現できるのが、CSSスクロールトリガーアニメーションです。

スクロールを利用したアニメーションには、スクロール量に連動して進む「[スクロール駆動アニメーション（scroll-driven）](https://ics.media/entry/230718/)」と、スクロール位置をきっかけに再生する「スクロールトリガーアニメーション（scroll-triggered）」があります。本記事では、後者を扱います。

これまでは、JavaScriptのIntersection Observerインターセクション・オブザーバーなどを使って、スクロール位置に応じてアニメーションを開始する処理を実装する方法が一般的でした。CSSスクロールトリガーアニメーションを使えば、**アニメーションを開始するスクロール位置**を**CSSだけで指定**できます。

この記事では、基本的な使い方から実際のウェブサイトで活用できる演出まで、さまざまな作例を通して紹介します。

※注意：本記事の作例は、**Chrome・Edge 146以上**でご覧ください。

### 基本の書き方

まずは、基本的な仕組みを見ていきましょう。

以下の作例では、「Animation」の文字がビューポートに完全に入ると、右からスライドしながら表示されます。

▼下にゆっくりスクロールして、動きを確認してみてください。

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/261023_scroll_triggered_animations/01_Basic/index.html)
-   [コードを確認する](https://github.com/ics-creative/261023_scroll_triggered_animations/blob/main/01_Basic/index.html)

スクロールトリガーアニメーションでは、主に2つのCSSプロパティを使用します。 `timeline-trigger`でトリガーを定義し、`animation-trigger`でそのトリガーをアニメーションに関連付けます。この作例では、どちらにもトリガー名として`--target`を指定しています。

それぞれのプロパティは、次の順番で値を指定します。※一部の値は省略可能です。

-   `timeline-trigger`: `定義するトリガー名` `有効かどうかを判定する基準` `有効化する範囲` / `有効状態を保つ範囲`;
-   `animation-trigger`: `参照するトリガー名` `有効時の再生方法` `無効時の再生方法`;

```
/* 右からスライドしながらフェードインするキーフレーム */
@keyframes motion {
  from {
    opacity: 0;
    translate: 100px 0;
  }
}

.target {
  opacity: 1;
  translate: 0 0;

  /* 要素全体が画面内に入ると有効化し、画面から完全に出ると無効化 */
  timeline-trigger: --target view() contain / cover;

  /* 通常の時間ベースのアニメーション */
  animation: motion 1s var(--ease-expo-out) both;

  /* トリガーの有効時は順再生、無効時は逆再生 */
  animation-trigger: --target play-forwards play-backwards;
}
```

`view()`は、要素がビューポート内に入ってから出るまでのスクロール位置を基準にします。`contain`は要素全体がビューポート内に収まっている範囲、`cover`は要素が少しでもビューポート内に入っている範囲を表します。

`contain / cover`の指定によって、要素全体がビューポート内に入るとトリガーが有効になります。その後、完全にビューポート外へ出るまで有効な状態が続きます。

`play-forwards`はトリガーが有効になると通常の方向で再生し、`play-backwards`はトリガーが無効になると逆方向に再生します。この作例では、画面に入ると文字が右から現れ、画面の外へ出ると元の位置へ戻ります。スクロールを戻してもう一度画面に入ると、再び通常方向に再生します。

#### トリガーの有効範囲を確認する

トリガーが有効になる位置と、無効になる位置を、実際にスクロールして確認してみましょう。

次のデモでは、`view(25%)`で範囲を画面中央に絞り、緑色の帯で示しています。`view()`で指定した範囲は緑色で表しています。図形が帯に完全に入ると円形になり、完全に出ると四角形に戻ります。

▼スクロールして図形変化のタイミングを確認してみてください。

CSS一部抜粋

```
/* 図形 */
.shape {
  /* view(25%)：上下25%ずつ */
  timeline-trigger: --range view(25%) contain / cover;
  animation: morph .45s ease-in-out both;
  animation-trigger: --range play-forwards play-backwards;
}
```

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/261023_scroll_triggered_animations/00_Trigger_Range/index.html)
-   [コードを確認する](https://github.com/ics-creative/261023_scroll_triggered_animations/blob/main/00_Trigger_Range/index.html)

### 作例① 見出しを1文字ずつ表示する演出に使用する

次に、ブランドサイトなどでよく見かける、文字が1文字ずつ現れる作例を紹介します。

以下の作例では、各見出しの要素全体が表示領域に入ると、文字が1文字ずつ下から現れます。基本の書き方で紹介した作例と異なり、今回はアニメーションの再生は一度きりです。

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/261023_scroll_triggered_animations/02_Text_Animation/index.html)
-   [コードを確認する](https://github.com/ics-creative/261023_scroll_triggered_animations/blob/main/02_Text_Animation/index.html)

```
.hero {
  /* 見出し全体が見えた位置でトリガーを有効化 */
  timeline-trigger: --title view() contain / cover;

  /* トリガーの参照範囲をこの要素内に限定 */
  trigger-scope: --title;

  .char {
    /* 兄弟順から遅延を計算し、内側のspanへ渡す */
    animation-delay: calc((sibling-index() - 1) * 0.04s);

    .char__inner {
      /* 1文字ずつ、下から立ち上がる */
      animation: rise 0.8s var(--ease-expo-out) both;
      animation-trigger: --title play-once;
      animation-delay: inherit;
    }
  }
}

@keyframes rise {
  from {
    translate: 0 100%;
  }
}
```

`timeline-trigger`は親の`.hero`に定義し、内側の文字は同じ`--title`を参照します。`play-once`は一度だけ再生する指定です。`play-forwards`と異なり、トリガーが再び有効になっても再生し直しません。一度表示された文字は、画面外へ出てから再び戻ってきても、表示された状態のままになります。

この作例では、`.hero`を使った見出しが2つあります。どちらも同じ`--title`というトリガー名を使っているため、そのままでは1つ目の見出しが画面に入ったときに、2つ目の見出しもアニメーションしてしまいます。

そこで、`trigger-scope`を指定し、トリガーの参照範囲をそれぞれの`.hero`の内側に限定しています。これにより、各見出しが画面に入ったタイミングで、個別にアニメーションするようになります。

ちなみに1文字ずつ現れる動きは、各文字を`overflow: clip`でマスクし、`sibling-index()`で文字ごとにアニメーションの開始時間をずらして実現しています。

`sibling-index()`の詳しい使い方は、記事『[CSSでスタッガーアニメーションがつくれる！　sibling-index() / sibling-count()の活用アイデア](https://ics.media/entry/260116/)』で紹介しています。

また、同様の表現はGSAPでも実装できます。記事『[GSAP入門(第3回) - ScrollTrigger・MotionPath・FLIP・テキストモーション](https://ics.media/entry/220826/#splittext%E3%81%A8scrolltrigger%E3%82%92%E7%B5%84%E3%81%BF%E5%90%88%E3%82%8F%E3%81%9B%E3%82%8B)』で紹介していますので、あわせてご覧ください。GSAPは主要なブラウザーすべてで動作する一方、CSSスクロールトリガーアニメーションは、外部ライブラリに依存せずCSSだけで実装できる点が魅力です。

### 作例② 複数の要素を同じトリガーで動かす

次に、複数の要素を同じトリガーで動かす作例を紹介します。

以下は、各セクションが画面に入ると、写真や見出し、説明文が順番に現れる作例です。

▼下にスクロールして確認してください。

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/261023_scroll_triggered_animations/03_Multiple_Elements/index.html)
-   [コードを確認する](https://github.com/ics-creative/261023_scroll_triggered_animations/blob/main/03_Multiple_Elements/index.html)

```
.work {
  /* セクションが画面に入る位置でトリガーを有効化 */
  timeline-trigger: --work-trigger view() entry 60% cover;
  /* トリガーの参照範囲をこの要素内に限定 */
  trigger-scope: --work-trigger;

  .work__visual {
    .work__frame {
      /* 写真を左から徐々に表示する */
      animation: reveal-frame 1.4s var(--ease-expo-out) both;
      /* トリガーの有効時は順再生。無効時は何もしない */
      animation-trigger: --work-trigger play-once;
    }
  }

  .work__content {
    .work__title {
      .line {
        padding-block: 0.04em 0.12em;

        &:nth-child(1) {
          --line-delay: 0.4s;
        }

        &:nth-child(2) {
          --line-delay: 0.52s;
        }

        .line__inner {
          /* 見出しを1行ずつ下から表示 */
          animation: rise-focus 1.25s var(--ease-expo-out) both;
          animation-trigger: --work-trigger play-once;
          animation-delay: var(--line-delay);
        }
      }
    }
  }
}

@keyframes reveal-frame {
  from {
    clip-path: inset(0 100% 0 0);
  }

  to {
    clip-path: inset(0);
  }
}
```

親の`.work`に設定した`--work-trigger`を、写真や見出しなどの複数の要素から参照しています。セクションが複数あるため、`trigger-scope`でそれぞれの`.work`内に参照範囲を限定しています。`animation-delay`をずらすことで、写真と見出しが順番に表示されます。

`entry 60%`は、要素がビューポートに入り始めてから入りきるまでを0〜100%としたとき、60%の位置を表します。`entry 0%`では入り始めた時点で再生が始まりますが、この作例では、写真や見出しがビューポート内にある程度入ってから順番に現れるよう、開始位置を60%に設定しています。このように様々な要素を遅延して表示させる場合は調整することをオススメします。無効化時の動作は指定していないため、逆再生はしません。

#### スクロール駆動アニメーションとの組み合わせ

この作例では、写真が上下する動き（いわゆるパララックス）に**スクロール駆動アニメーション**も使用しています。冒頭でも触れたように、スクロール位置をきっかけに再生するスクロールトリガーアニメーションとは異なり、**スクロール量に応じて**アニメーションが進みます。

```
.work__frame {
  .work__image {
    position: absolute;
    inset: -36%;
    width: calc(100% + 72%);
    height: calc(100% + 72%);

    /* 写真が画面を通過するあいだ、上下に動かす */
    animation: image-drift linear both;
    animation-timeline: view();
    animation-range: cover 0% cover 100%;
  }
}

@keyframes image-drift {
  from {
    translate: 0 -20%;
  }

  to {
    translate: 0 20%;
  }
}
```

`animation-timeline: view()`で、写真が画面内を通過する動きにアニメーションを連動させています。組み合わせると、表現の幅が広がりますね。

詳しい仕組みは、記事『[CSSだけでスクロールアニメーションが作れる!? 新技術Scroll-driven Animationsとは](https://ics.media/entry/230718/)』で解説しています。

### 作例③ 離れた要素をトリガーにして動かす

トリガーとアニメーションを、別の要素に分けた作例を紹介します。

以下は、右側の色名がスクロール領域に入ると、左側で対応する色のボールが穴から飛び出す作例です。右側のエリアをスクロールして、動きを確認してみましょう。

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/261023_scroll_triggered_animations/04_Sticky_Elements/index.html)
-   [コードを確認する](https://github.com/ics-creative/261023_scroll_triggered_animations/blob/main/04_Sticky_Elements/index.html)

```
/* 右側の色名テキスト */
.story--red {
  h2 {
    /* 文字全体が枠内に入ると有効、完全に出ると無効 */
    timeline-trigger: --red view() contain / cover;
  }
}

/* ボール */
.ball {
  /* 穴から飛び出し、落下して元の位置に戻る */
  animation: appear 0.8s both;

  &.ball--red {
    /* トリガーの有効時に、頭から再生する */
    animation-trigger: --red replay;
  }
}

@keyframes appear {
  0% {
    translate: -50% 80px;
    animation-timing-function: var(--ease-expo-out);
  }

  50% {
    translate: -50% -10px;
    animation-timing-function: cubic-bezier(0.7, 0, 0.84, 0);
  }

  100% {
    translate: -50% 80px;
  }
}
```

右側の色名（`.story--red h2`）に`timeline-trigger`を指定し、左側のボール（`.ball--red`）には`animation-trigger`を指定しています。両方に同じトリガー名`--red`を使うことで、色名がスクロール領域に完全に入ると、対応するボールのアニメーションが再生されます。

このように、離れた要素同士でも同じトリガー名を使って連動させられます。

`replay`は、トリガーが有効になるたびにアニメーションを再度再生します。色名が再び枠内に入ると、ボールがもう一度飛び出します。

### animation-triggerの再生方法を整理

ここまでの作例では、`animation-trigger`にさまざまな再生方法を指定しました。それぞれの動作をまとめると、次のようになります。

-   `play-forwards`：通常方向に再生する
-   `play-backwards`：逆方向に再生する
-   `play-once`：一度だけ再生する
-   `replay`：最初から再生し直す

`animation-trigger`では、トリガーが有効になったときと無効になったときの動作をそれぞれ指定できます。

### 対応ブラウザー

スクロールトリガーアニメーションで使う`animation-trigger`はChrome・Edge 146（2026年3月リリース）以上で利用できます。2026年10月時点では、Safari 27.0・Firefox 158ともに未対応です。ただし、Safariでは実装が進められており、対応時期は未定ながら今後のサポートが期待されます。

参照：[Can I use…](https://caniuse.com/?search=timeline-trigger)

### まとめ

CSSスクロールトリガーアニメーションを使うと、JavaScriptを使わずにスクロール位置をきっかけとしたアニメーションを実装できます。

アニメーションの開始位置や再生方法を指定できるほか、複数の要素を連動させることも可能です。ブランドサイトをはじめ、さまざまなサイトの**スクロールに合わせてコンテンツを印象的に見せたい場面**で役立つでしょう。

現時点では対応ブラウザーが限られていますが、今後の対応状況にも注目したい機能です。ぜひ、試してみてください！