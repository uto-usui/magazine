---
title: "ReactとMotionでつくる! “少し”こだわったマイクロインタラクション集"
source: "https://ics.media/entry/251204/"
publishedDate: "2025-12-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2025年12月4日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

ウェブサイトのアニメーションにはユーザーの操作に反応する**マイクロインタラクション**と呼ばれるものがあります。マイクロインタラクションを加えると状態変化を滑らかな動きとしてユーザーへ伝えられ、ユーザビリティやユーザー体験の向上につながります。

本記事ではMotion（旧：Framer Motion）とReactを使ったマイクロインタラクションの作り方を紹介します。よく使う、ボタン・モーダル・アコーディオン・セグメントボタンなど8種類のUIコンポーネントを題材にしています。各サンプルにはかんたんなコードの解説も行っていますので、Motionの機能を確かめながらそのまま活用できます。

![Motionを使った動くUIの4つのサンプル。ハンバーガーメニュー、セグメントボタン、円グラフ、リスト](https://ics.media/entry/251204/images/images/251204_animations.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/)

### Motionとは

Motionはアニメーションライブラリです。かつてはFramer Motionという名前でReact専用のライブラリでしたが、2024年11月より「Motion」としてReactだけでなくVueや素のJavaScriptでも利用できるようになりました。

-   [Motion — JavaScript & React animation library](https://motion.dev/)

歴史的経緯からも**Reactとの相性がよく**、アニメーションを**宣言的に**記述できるのが大きなポイントです。

### ReactでのMotion導入方法

今回はViteなどのJavaScriptバンドラーを使ったReactプロジェクトを前提としています。Viteやバンドラーについては記事『[jQueryからTypeScript・Reactまで！　Viteで始めるモダンで高速な開発環境構築](https://ics.media/entry/210708/)』で解説しています。

npmからMotionをインストールします。

```
npm install motion
```

`motion`パッケージ内にReact用のモジュールが同梱されているので利用します。

```
import { motion } from "motion/react";
```

MotionはReactのほかにもVueやフレームワークなどを使わない素のJavaScriptでも利用できます。それぞれの導入方法については公式サイトを参照してください。

### ReactでのMotionの基本的な使い方

かんたんにReactでのMotionの使い方を紹介します。動かしたい要素に`<motion.div>`や`<motion.button>`などのMotionのコンポーネントを使い、propsにアニメーションを記述します。

```
import { motion } from "motion/react";

// マウント時に要素が100px右に移動
<motion.div animate={{ x: 100 }} />;
```

ほかにも細かいアニメーションを制御するpropsやイベント系のpropsがあります。詳細は[Motionの公式ドキュメント](https://motion.dev/docs/react-animation)を確認してください。

### 1\. クリック時にちょっとだけ縮小するボタン

ボタンをクリックしたりタップしたりしたときに、きちんと押されたことをフィードバックするとユーザーの安心につながります。クリック時に少しだけ小さくなるボタンインタラクションの例です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/active-fb-button)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/ActiveFbButton.tsx)

▼主要な部分のみ抜粋

```
<motion.button
  className="basicButton activeFbButton"
  // whileTap: ボタンが押されている間のアニメーション
  // scale: 0.95に縮小
  whileTap={{ scale: 0.95 }}
  transition={{
    // アニメーション時間: 0.1秒
    duration: 0.1,
  }}
>
  Click me
</motion.button>
```

### 2\. クリック時に波紋の広がるボタン

クリック時にクリックしたところから波紋が広がるリップルボタンです。クリック位置に波紋の要素を移動させ、`scale`と`opacity`で広がるようなアニメーションにしています。`key`を変更してアニメーションをリセットしています。`key`を変えることでReactに別要素として認識させ、毎回新しい要素としてアニメーションを開始しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/ripple-button)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/RippleButton.tsx)

▼主要な部分のみ抜粋

```
<button
  className="basicButton rippleButton"
  ref={buttonElementRef}
  onClick={handleClick}
>
  Click me
  {rippleAnimationKey > 0 && (
    <motion.span
      style={{ left: clickX, top: clickY }}
      className="rippleWrapperElement"
    >
      <motion.span
        key={rippleAnimationKey}
        className="rippleEffectElement"
        initial={{ opacity: 1, scale: 0 }} // 初期状態: 不透明度1、スケール0（点）
        animate={{ opacity: 0, scale: 1 }} // アニメーション後: 不透明度0、スケール1（拡大）
        transition={{
          duration: 0.5, // アニメーション時間: 0.5秒
          ease: "easeOut", // イージング関数（減速する動き）
        }}
      ></motion.span>
    </motion.span>
  )}
</button>
```

### 3\. モーダルダイアログの出現

モーダルダイアログの出現と閉じるアニメーションです。ダイアログにはHTMLの`<dialog>`タグを使っています。出現と閉じる両方のアニメーションがあるのでMotionの`variants`機能を使ってアニメーションを定義しています。`variants`はアニメーションのプロパティを変数のように扱えるので、アニメーションの定義をわかりやすくします。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/modal-dialog)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/ModalDialog.tsx)

`<dialog>`タグの標準機能である`showModal()`や`close()`を使ってダイアログを開閉しています。このようなネイティブで状態のオンオフがある機能にアニメーションを付け足すときには、ダイアログの開閉状態とアニメーションの開閉状態の管理が大切になります。

つまり、開くときはアニメーション開始時に要素の状態を変更すればよいですが、閉じる場合はアニメーションが終わった後に要素の状態を変更する必要があります。

▼開閉時の処理を抜粋

```
// モーダルを開く関数
const handleOpen = () => {
  modalDialogRef.current?.showModal();
  setIsOpen(true);
};

// モーダルを閉じる関数
const handleClose = (
  event: SyntheticEvent<HTMLDialogElement> | MouseEvent<HTMLButtonElement>,
) => {
  event.preventDefault();
  setIsOpen(false);
};

// モーダルアニメーションが完了したときに呼ばれる関数
const handleAnimationComplete = (definition: AnimationDefinition) => {
  // exitアニメーション（"hidden"）が完了したら、実際にdialogを閉じる
  if (definition === "hidden") {
    modalDialogRef.current?.close();
  }
};
```

まず開くときには`showModal()`メソッドと`setIsOpen(true)`を実行してダイアログを開きます。閉じるときは逆に先にアニメーションの状態`isOpen`ステートを変更してアニメーションを実行し、アニメーションが終わったら`handleAnimationComplete()`を実行して`close()`メソッドを実行してダイアログを閉じます。ここがダイアログアニメーションの工夫のポイントです。

モーダルについては記事『[モーダルUIをシンプルにできる！ 進化を続けるHTMLのdialog要素](https://ics.media/entry/250904/)』で解説していますので、参考にしてください。また、CSSの`@starting-style`ルールや`allow-discrete`値が使えるブラウザが普及すると、CSSのみで開閉アニメーションがかけるようになるでしょう。

### 4\. アコーディオンの開閉

アコーディオンの開閉アニメーションです。高さが変わるアニメーションと中身の透過度のアニメーションを組み合わせています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/accordion)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/Accordion.tsx)

`<details>`タグと`<summary>`タグを使っています。`<details>`タグにもモーダルダイアログと同様にネイティブで開閉機能があるので、うまくアニメーションとHTMLの状態を管理する必要があります。

▼開閉の管理部分を抜粋

```
// アコーディオンの開閉状態を管理するstate
const [isOpen, setIsOpen] = useState(false);

// アコーディオンをクリックしてトグル（開閉を切り替え）する関数
const handleClick = (event: MouseEvent<HTMLElement>) => {
  event.preventDefault();

  const detailsElement = detailsRef.current;
  if (!detailsElement) {
    return;
  }
  // アコーディオンが閉じている場合は開く動作
  if (!detailsElement.open) {
    detailsElement.open = true;
    setIsOpen(true);
  } else {
    // アコーディオンが開いている場合は閉じる動作
    setIsOpen(false);
  }
};

// アコーディオンをトグルするときに呼ばれる関数
// こちらはページ内検索などで受動的にアコーディオンが開閉するときに呼ばれる関数です。
const handleToggle = () => {
  const detailsElement = detailsRef.current;
  if (detailsElement && detailsElement.open) {
    setIsOpen(true);
  }
};

// アコーディオンアニメーションが完了したときに呼ばれる関数
const handleAnimationComplete = (definition: AnimationDefinition) => {
  // 閉じるアニメーション（"closed"）が完了したら、実際にdetails要素を閉じる
  if (definition === "closed") {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }
};
```

```
<details onToggle={handleToggle}>
  {/* 省略 */}
</details>
```

モーダルとの違いとして、アコーディオンはユーザーの能動的なクリック操作だけでなく、ページ内検索で受動的に開閉することもあります。そのため、`<details>`タグに`onToggle`イベントリスナーを追加し、ページ内検索で開くときには`handleToggle()`が呼ばれるようにしています。

アコーディオンUIについては記事『[detailsとsummaryタグで作るアコーディオンUI - アニメーションのより良い実装方法](https://ics.media/entry/220901/)』で解説しています。ぜひご一読ください。アコーディオンUIは`{isShow && <div>...</div>}`のように、「閉じているときは`<div>`タグをマウントしない」といった作り方もあります。しかし、HTMLの`<details>`タグの開閉機能を活用することでアコーディオン内の単語もブラウザの検索機能で探せるといった利点があります。

また、アコーディオンの開閉に応じて「+」と「-」のアイコンが切り替わりますが、DOMの切り替えには`<AnimatePresence>`コンポーネントが便利です。`<AnimatePresence>`内のコンポーネントで`exit`propsを設定すると、そのDOMがなくなるときのアニメーションを設定できます。

▼アイコンの切り替え部分を抜粋

```
<AnimatePresence initial={false}>
  {isOpen ? (
    <motion.span
      className="accordionIcon"
      variants={iconVariants}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ duration: 0.3 }}
      key="closed"
    >
      -
    </motion.span>
  ) : (
    <motion.span
      className="accordionIcon"
      variants={iconVariants}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ duration: 0.3 }}
      key="open"
    >
      +
    </motion.span>
  )}
</AnimatePresence>
```

### 5\. セグメントボタン

いくつかの状態を切り替えるセグメントボタンのアニメーションです。背景が追従するようなアニメーションにして切り替えたことを視覚的に表現しています。セグメントの配列と`variants`機能を組み合わせてアニメーションしています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/segment-button)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/SegmentButton.tsx)

`useState()`の値と`variants`の値を組み合わせてアニメーションしています。

▼stateとvariantsの組み合わせ部分を抜粋

```
const SEGMENT_BUTTON_LIST = ["daily", "weekly", "monthly", "yearly"] as const;

const [activeSegment, setActiveSegment] =
  useState<(typeof SEGMENT_BUTTON_LIST)[number]>("daily");

// 背景のアニメーション定義
const variants: Variants = {
  daily: {
    x: 0, // 最初のボタンの位置（X座標0）
  },
  weekly: {
    x: 120, // 2番目のボタンの位置（X座標120px）
  },
  monthly: {
    x: 240, // 3番目のボタンの位置（X座標240px）
  },
  yearly: {
    x: 360, // 4番目のボタンの位置（X座標360px）
  },
};
```

サンプルでは分かりやすさのために位置をピクセルで固定していますが、ボタン幅から計算して`x`を動的に求めるとレイアウト変更にも強くなります。

```
<motion.div
  className="segmentButtonBackground"
  variants={variants}
  animate={activeSegment}
  transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
></motion.div>
{
  SEGMENT_BUTTON_LIST.map((segment) => (
    <button
      className="segmentButton"
      onClick={() => handleSegmentClick(segment)}
      key={segment}
    >
      {segment}
    </button>
  ));
}
```

### 6\. スクロールトリガーアニメーション

スクロールでブラウザのビューポートに入ってきたときに出現するアニメーションです。アニメーションを実行するときは`whileInView`というpropsを使います。スクロールで文字がふわっと出てくる表現にも使えます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/scroll-triggered-animation)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/ScrollTriggeredAnimation.tsx)

▼主要な部分のみ抜粋

```
<ul className="listItems">
  {presidentList.map((item, index) => (
    <motion.li
      key={index}
      className="listItem"
      variants={variants}
      initial="invisible"
      whileInView="visible"
      viewport={{ amount: 0.4, once: true }} // 要素の40%がビューポートに入ったらアニメーションを実行、一度のみ実行
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 0.4 },
      }}
    >
      <span className="listItemIndex">{index + 1}</span>
      <span className="listItemName">{item.name}</span>
      <span className="listItemTerm">{item.term}</span>
      <span className="listItemParty">{item.party}</span>
    </motion.li>
  ))}
</ul>
```

### 7\. ハンバーガーメニュー

ハンバーガーメニューのアニメーションです。メニューの開閉アニメーションのほか、アイテムがささっと出てくるアニメーションも加えて小気味よくしています。連続的に出てくるアニメーションには`stagger`機能を使っています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/hamburger-menu)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/HamburgerMenu.tsx)

▼stagger機能を使ったアニメーションの定義部分を抜粋

```
// ハンバーガーメニュー内のアイテムのアニメーション定義
const variants = {
  open: {
    transition: {
      // stagger: 子要素を順番にアニメーションさせる
      // 0.08秒間隔で、最初の要素は0.2秒後に開始
      delayChildren: stagger(0.08, { startDelay: 0.2 }),
      ease: EASE_OUT_QUART,
      duration: 0.5,
    },
  },
};
```

```
<motion.div
  className="menuList"
  variants={variants}
  initial="closed"
  animate="open"
  exit="closed"
  role="menu"
>
  {MENU_ITEMS.map((item) => (
    <motion.button
      key={item.name}
      className="menuItem"
      role="menuitem"
      onClick={handleClose}
      variants={buttonVariants}
      transition={{ ease: EASE_OUT_QUART, duration: 0.5 }}
    >
      {item.name}
    </motion.button>
  ))}
</motion.div>
```

### 8\. SVGや値のアニメーション

ここまでは要素を動かすアニメーションが中心でしたが、MotionはJavaScriptの値やSVGのパスをアニメーションさせることもできます。円グラフと数値のアニメーションを実装しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251204_motion_ui/svg-and-values)
-   [ソースコードを確認する](https://github.com/ics-creative/251204_motion_ui/blob/main/src/pages/SvgAndValues.tsx)

JavaScriptの値をアニメーションするには`useMotionValue()`と`useTransform()`を使います。どちらもMotionのAPIで、`useMotionValue()`でアニメーション可能な値を生成し、`useTransform()`で表示用の値に変換しています。

▼値のアニメーションの定義部分を抜粋

```
// useMotionValueでアニメーション可能な値を生成
const progressRate = useMotionValue(0);
const notStartedValue = useMotionValue(0);

// 表示用の値を計算（小数点を四捨五入して整数に変換）
const rate = useTransform(() => Math.round(progressRate.get()));
const notStartedCount = useTransform(() => Math.round(notStartedValue.get()));

// SVGパス（円形の線）のアニメーション設定
const drawPathVariants: Variants = {
  hidden: { pathLength: 0 }, // 初期状態: パスの長さが0（線が表示されない）
  visible: {
    pathLength: PROGRESS_RATE, // 最終状態: 進捗率分だけパスを描画
    transition: { duration: 1.8, ease: EASE_OUT_QUART }, // 1.8秒かけてアニメーション
  },
};

useEffect(() => {
  // 各値を目標値までアニメーション
  // animate: motion valueを指定した値までアニメーションさせる
  const progressRateAnimation = animate(progressRate, PROGRESS_RATE * 100, {
    duration: 1.8, // アニメーション時間（秒）
    ease: EASE_OUT_EXPO, // イージング関数（減速する動き）
  });
  const notStartedValueAnimation = animate(notStartedValue, NOT_STARTED_VALUE, {
    duration: 1.8,
    ease: EASE_OUT_EXPO,
  });

  return () => {
    progressRateAnimation.stop();
    notStartedValueAnimation.stop();
  };
}, [animationKey]);
```

### まとめ

Motionを使うと**宣言的に**アニメーションを付け加えられるのでReactとの相性もバッチリです。今回紹介したUIアニメーションはなくても機能上は困らないものですが、リッチな印象を与え、ユーザー体験の向上にもつながります。今回紹介したサンプルはいずれもMotionの基本的な機能を使ったものです。アイデアと工夫しだいで表現の幅は広がります。

ICS MEDIAではほかにもインタラクションやアニメーションの記事があります。以下の記事も合わせてぜひご覧ください。

-   [現場で使えるアニメーション系JSライブラリまとめ GSAP, Anime.js, Motion, Tween.js, WebAnimationなど](https://ics.media/entry/14973/)
-   [GSAP入門 - アニメーション制作のための高機能なJSライブラリ（前編）](https://ics.media/entry/220822/)
-   [GSAP入門（後編） - タイムライン制御やスクロール演出などの魅力的なJSライブラリ](https://ics.media/entry/220825/)
-   [JavaScriptで実現するFLIPアニメーションの原理と基礎](https://ics.media/entry/240902/)
-   [センスだけに頼らない！ CSSとJSで作るパーティクル表現のテクニック](https://ics.media/entry/220420/)