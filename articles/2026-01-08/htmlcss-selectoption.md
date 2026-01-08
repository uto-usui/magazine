---
title: "HTML/CSSで装飾可能に！ select・optionタグの新しいカスタマイズ方法"
source: "https://ics.media/entry/250307/"
publishedDate: "2025-03-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2025年3月7日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

2025年3月にリリースされた[Chrome 134](https://developer.chrome.com/release-notes/134?hl=ja)、[Microsoft Edge 134](https://learn.microsoft.com/ja-jp/microsoft-edge/web-platform/release-notes/134)では、`<select>`要素をカスタマイズできるようになりました。今までは`<select>`要素で表現できる見た目は限られており、やむをえず別のタグを組み合わせて独自の実装をしていた方も多いのではないでしょうか？　独自の実装をした場合、アクセシビリティーやキーボード操作に対しても独自の対応が必要だったり、対応が不十分になる場合もあります。`<select>`要素をカスタマイズできるようになれば、こうした課題を解決しつつ自由なデザインやレイアウトを実現できるようになります。

この記事では、カスタマイズできるようになった`<select>`要素でどんなことができるのかを紹介します！（※本記事の作例はChrome 134、Microsoft Edge 134以上で閲覧ください）。

### カスタマイズに必須のCSS

まずはカスタマイズのために必須のCSS設定を確認しましょう。以下のように`<select>`要素と、その疑似要素である`select::picker(select)`に`appearance: base-select;`を指定します。`select::picker(select)`疑似要素は`<select>`要素をクリックして表示される選択肢リストのポップオーバーを制御するためのものです。この指定を行うことでカスタマイズの準備が完了します。

```
select,
::picker(select) {
  appearance: base-select;
}
```

上記の指定ありとなしの見た目を確認してみると、それだけで見た目が変わったことがわかります。

![CSS指定ありとなしの比較](https://ics.media/entry/250307/images/250307_customize_css.jpg)

#### Android Chromeでの表示

この設定はAndroidのChromeでも有効です。AndroidのChrome Beta 135では以下のような表示になります。CSS設定なしの方はOS標準の表示になっていることがわかります。

ただし、以下の図にもあるとおりAndroid Chromeでこのデモを表示した場合はCSS設定なしの方が操作がしやすくなっています。CSSのカスタマイズ設定を行う場合は見た目だけではなく使いやすさにも気をつけたいところです。

![CSS指定ありとなしの比較 - Android](https://ics.media/entry/250307/images/250307_customize_css_android.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250307_custom-select-style/01_mandatory-css.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250307_custom-select-style/blob/main/01_mandatory-css.html)

#### 疑似要素へのスタイル追加

また、`select::picker(select)`疑似要素にスタイルを追加することで選択肢リストの見た目を柔軟に変更できます。CSSトランジションを使用したアニメーションも指定できます。

```
/* 選択肢のポップオーバーのスタイルを変更 */
.styled::picker(select) {
  border-color: #cf256d;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 4px 4px #ff67b3;
  /* アニメーションも設定できる */
  transition: scale 0.2s;
}
.styled::picker(select):hover {
  scale: 1.05;
}
```

![選択肢リストの見た目を変更](https://ics.media/entry/250307/images/250307_popover.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250307_custom-select-style/01_mandatory-css.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250307_custom-select-style/blob/main/01_mandatory-css.html)

### `<select>`内に`<option>`や`<optgroup>`以外の要素を配置できる

`<select>`要素内にはもともと`<option>`や`<optgroup>`以外の要素は配置できず、配置したとしても従来のブラウザーでは無視されていました。

2024年頃のブラウザー（Chrome・Edge 119以降、Safari 17.4以降）では選択肢のリスト内に`<hr>`要素を追加できるようになりました。

![hr要素を追加](https://ics.media/entry/250307/images/250307_2024_hr_tag.jpg)

さらに今回それ以外の要素も配置できるようになりました。

```
<!-- option以外にもimgやhrを配置 -->
<select class="food-select">
  <option value="onigiri">
    <img src="./images/foods/i_onigiri.svg" width="24" height="24" alt="" />
    おにぎり
  </option>
  <hr />
</select>
```

![img要素とhr要素を追加](https://ics.media/entry/250307/images/250307_2025_img_hr.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250307_custom-select-style/02_option-content.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250307_custom-select-style/blob/main/02_option-content.html)

### 選択肢を開くための`<button>`要素をカスタマイズ

`<select>`タグ内に`<button>`要素を1つだけ置くと、選択肢のリストを開くためのボタンとして認識されます。さらに、`<button>`要素内に`<selectedcontent>`という要素を置くと、選択肢のリストで選択された`<option>`要素が複製されて表示されます。CSSでこの`<selectedcontent>`を利用して見た目を調整します。

以下のデモでは、選択肢の中に`<small>`要素で説明文を追加しています。その際、`<selectedcontent>`に適用したCSSによって`<button>`要素内では説明文は非表示になっています。

![selectedcontentでボタンをカスタマイズ](https://ics.media/entry/250307/images/250307_selectedcontent_usecase.jpg)

```
<style>
  /* ボタン要素内の補足は非表示にする */
  selectedcontent .city-small {
    display: none;
  }
</style>

<!-- 省略 -->

<select class="city-select">
  <button class="city-select-button">
    <!-- ここに選択済みのoptionの複製が表示される -->
    <selectedcontent></selectedcontent>
  </button>

  <!-- 省略 -->

  <option class="city-option" value="seoul">
    <span class="city-text">ソウル</span>
    <small class="city-small"> K-POPとグルメの楽園 </small>
  </option>
</select>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250307_custom-select-style/03_selectedcontent.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250307_custom-select-style/blob/main/03_selectedcontent.html)

#### 選択肢リストが画面からはみ出さないように気をつける

[Android Chromeでの表示](#android-chrome%E3%81%A7%E3%81%AE%E8%A1%A8%E7%A4%BA)でも言及した通り、CSSをカスタマイズする際は使いやすさに気を配る必要があります。

このデモでは画面の幅と高さによって選択肢リストのレイアウトを変更しています。通常のプルダウンとは異なり、カスタマイズした場合はレイアウトによっては選択肢リストがはみ出てしまいます。モバイル・デスクトップに限らず注意が必要です。

![モバイルではみ出す例とCSS調整後の比較](https://ics.media/entry/250307/images/250307_mobile.jpg)

### コラム：`<select>`要素の外で選択済みの表示を利用する

`<select>`要素で選択された選択肢を他の要素の表示にも使いたい場合があるとします。たとえば以下の図のように、右側の［▼］ボタンで選択した選択肢の内容を、左側のボタンの表示に反映したい場合などです。

![selectedcontentelementで選択済みの選択肢を表示させる](https://ics.media/entry/250307/images/250307_selectedcontentelement_usecase.jpg)

今までならJavaScriptなどで動的に選択済みの要素を取得していたかもしれませんが、`selectedcontentelement`属性を使うとHTMLだけで実現できます。

使い方は簡単で、`<select>`要素に`selectedcontentelement`属性を設定し、その値を`<selectedcontent>`に`id`として渡すだけです。こうすることで`<button>`の中の文字列が`<select>`で選択されたものに置き換わります。

#### デモを確認する際の注意点

2025年3月7日時点で`selectedcontentelement`属性はChrome 134では動作しませんでした。デモを確認する際は以下のいずれかの方法でご確認ください。

-   Chrome 134で`chrome://flags`ページを開き、「Experimental Web Platform features」を「有効にする」
    -   `chrome://flags`の詳細は『[Chrome フラグとは](https://developer.chrome.com/docs/web-platform/chrome-flags?hl=ja)』をご確認ください
-   デベロッパー向けの[Chrome Canary](https://www.google.com/chrome/canary/)でデモページを開く

また、AndroidではChrome Beta 135、Chrome Canary 136いずれも`selectedcontentelement`属性が動作しませんでした。

```
<button class="login-button">
  <!-- select要素のselectedcontentelement属性と同じ値をidに設定する -->
  <selectedcontent id="selected"></selectedcontent>としてログイン
</button>
<!-- selectedcontentelement属性に、selectedcontentのidを設定する -->
<select class="role-select" selectedcontentelement="selected">
  <option value="admin">
  </option>
</select>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250307_custom-select-style/04_selectedcontentelement.html)
-   [ソースコードを確認する](https://github.com/ics-creative/250307_custom-select-style/blob/main/04_selectedcontentelement.html)

### カスタマイズできないケース

`<select>`要素に`multiple`または`size`属性がある場合は、残念ながら今回紹介したようなカスタマイズはできません。今後対応されることを期待しましょう。

### まとめ

`<select>`要素のカスタマイズについて紹介しました。これからChrome・Edge以外のブラウザーでサポートが広がれば`<select>`要素だけで表現の幅が大きく広がります。今後の展開を楽しみに待ちましょう！

### 参考サイト

-   [Customizable Select Element (Explainer) | Open UI](https://open-ui.org/components/customizableselect/)