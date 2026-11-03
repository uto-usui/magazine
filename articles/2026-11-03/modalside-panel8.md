---
title: "Modal・Side panel・専用ページの使い分け：8つのデザインシステムとガイドラインを混ぜずに比べる"
source: "https://zenn.dev/lilpacy/articles/modal-side-panel-page-design-systems"
publishedDate: "2026-10-31"
category: "design-systems"
feedName: "Zenn designsystem"
author: "pacy"
---

## TL;DR

-   Modal・Side panel・専用ページの選び方を、Apple HIG、Material、Carbon、Atlassian、USWDS、GOV.UK、NN/g、WAI-ARIA APGの8つの資料から、1つの条件ごとに出典を付けて比べた。
-   背後を覆うかどうかは、見た目ではなく「作業中に背後の何を参照する必要があるか」で決まる。この点はほぼ全資料で一致する。
-   複数stepの作業は、Web系の資料では専用ページ、Apple・Materialではfull-screenの器に寄せる。ここは出自で分かれる。
-   「form fieldが何個までならModalか」のような数量の目安は資料ごとに物差しが違うので、1つの閾値にまとめない方がよい。

## なぜ「混ぜずに」比べるのか

「これ、Modalでいいですか？」という相談は、UIを書いているとかなりの頻度で発生する。そしてたいてい、誰かが「Material ではこう」「NN/g ではこう」と別々の資料を持ち出し、それぞれ正しいのに話が噛み合わない。

私は以前から、この噛み合わなさの原因はパターンの名前で議論していることにあると感じていた。同じ「Modal」でも、USWDSは政府系サイトの一般市民を、Carbonは IBM の業務製品のユーザーを、Apple HIGはネイティブアプリを想定している。指針は**その資料が想定する適用範囲**とセットでしか移植できない。

そこで、各資料が明示している使用条件を「1列 = 1つの資料の1条件」で写した判定表を手元で作った。ルールは3つだけである。

-   資料が判定の順序を決めていないなら、列の並びに優先順位を付けない
-   資料同士で指針が割れているところは、どちらかに潰さず両方残す
-   複数の資料から自分で推論した部分は「推論」と明記する

この記事は、その判定表のうち「作業をどの器に載せるか」の部分をまとめたものである。

### 比べた8つの資料

いずれも2026年10月31日に原文を確認した。

資料

主に見たページ

想定している世界

Apple Human Interface Guidelines

[Modality](https://developer.apple.com/design/human-interface-guidelines/modality)、[Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)、[Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers)

Appleプラットフォームのネイティブアプリ

Material Design 3

[Dialogs（Material Components for Androidのdocs）](https://github.com/material-components/material-components-android/blob/master/docs/components/Dialog.md)

Androidを中心としたアプリ

Carbon Design System

[Create flows（v10）](https://v10.carbondesignsystem.com/community/patterns/create-flows/)、[Dialogs（現行）](https://carbondesignsystem.com/building-blocks/core/patterns/dialogs)

IBMの業務製品

Atlassian Design System

[Modal dialog](https://atlassian.design/components/modal-dialog/usage)、[Drawer](https://atlassian.design/components/drawer/usage)

Jira・Confluenceなどの業務SaaS

U.S. Web Design System (USWDS)

[Modal](https://designsystem.digital.gov/components/modal/)

米国政府の一般市民向けWebサイト

GOV.UK Design System

[Question pages](https://design-system.service.gov.uk/patterns/question-pages/)

英国政府の行政サービス

Nielsen Norman Group (NN/g)

[Modal & Nonmodal Dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/)、[Popups](https://www.nngroup.com/articles/popups/)

特定のプラットフォームに依らないUX研究

WAI-ARIA Authoring Practices Guide (APG)

[Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

Webのアクセシビリティ実装

Materialの公式サイト（m3.material.io）はJavaScriptで描画されるため、本文は同じMaterialチームが管理し、M3 specへリンクしているAndroid向けdocsで確認した。Carbonは、器の選び分けがいちばん細かく書かれているv10サイトのcommunity pattern「Create flows」を主に使い、現行サイトの「Dialogs」patternと食い違うところは本文で触れる。

## 器を2つの軸で並べる

まず、比べる器を整理しておく。各資料の定義から読み取ると、器は「背後を覆うか」と「作業の大きさ」の2軸でほぼ並べられる。

背後を参照・操作できる（nonmodal）

背後を覆う（modal）

小さな作業

Popover（nonmodal）、Inline編集

Modal dialog、Alert、Sheet

中くらいの作業

**Side panel**、nonmodal sheet、macOSのpanel

Drawer、Narrow tearsheet

大きな・複数stepの作業

専用ページ、別window

Full-screen dialog、Wide tearsheet

ここで用語を1つ補足しておく。**modal** とは、表示している間は背後のコンテンツを操作できなくする（不活性化する）表示のことで、**nonmodal** は背後を操作できたままにする表示のことである。[NN/gの定義](https://www.nngroup.com/articles/modal-nonmodal-dialog/)では、modal dialogは「This dialog disables the main content until the user explicitly interacts with the modal dialog.」（利用者が明示的に操作するまで本文を無効にする）とされる。

見た目が似ていても軸上の位置が違う器がある。たとえば同じ「横から出るパネル」でも、Carbon v10の[Side panel](https://v10.carbondesignsystem.com/community/patterns/create-flows/)は「480px wide and has no overlay」（幅480pxでoverlayなし）で背後を操作できる一方、[AtlassianのDrawer](https://atlassian.design/components/drawer/usage)は「The drawer component is a modal dialog that appears from the side of the screen.」、つまり横から出るmodalである。名前や見た目で器を選ぶと、このあたりで事故が起きる。

## 重要なポイント1：覆うかどうかは「何を参照するか」で決まる

8つの資料がもっともよく一致しているのがここである。背後を覆うのは例外で、作業中に背後を見る必要があるなら覆わない。

-   NN/g：[「Avoid modal dialogs for complex decision making that requires additional sources of information unavailable in the modal.」](https://www.nngroup.com/articles/modal-nonmodal-dialog/)（modalの外にある情報が要る判断には使わない）
-   Atlassian Modal：[「Avoid complex decision-making that requires additional information not available in the modal.」](https://atlassian.design/components/modal-dialog/usage)
-   Atlassian Drawer：背後は操作もfocusもできないので、[背後のUIを参照する必要がある作業をdrawerで出さない](https://atlassian.design/components/drawer/usage)
-   Carbon：v10のcreate flowでは、作成中にページの文脈が要るなら、overlayのない[Side panel](https://v10.carbondesignsystem.com/community/patterns/create-flows/)を使う。現行の[Dialogs](https://carbondesignsystem.com/building-blocks/core/patterns/dialogs)も「If a user needs access to additional information then consider using a full page instead.」（追加の情報が要るならページにする）としている
-   Apple：親viewの主作業に影響する補助項目を出すなら[nonmodal view](https://developer.apple.com/design/human-interface-guidelines/sheets)（macOSならpanel、iOS・iPadOSならnonmodal sheet）。入力して結果を観察することを繰り返すなら、sheetではなく[panel](https://developer.apple.com/design/human-interface-guidelines/sheets)（例：検索と置換）

NN/gは同じ記事で、Gmailの新規メール作成ウィンドウを、過去のメールを見ながら書けるnonmodalの好例として挙げている。

### 実装でも「覆う」と「不活性にする」をそろえる

この判断は見た目だけの話ではない。[APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)は、`aria-modal="true"` を付けてよいのは次の2つを**両方**満たすときだけだとしている。

1.  アプリのコードが、dialogの外側との一切の操作を防いでいる
2.  見た目でも、dialogの外側を覆っている

`aria-modal` を付けると、一部の支援技術の利用者にはdialogの外側が見えなくなる。見た目はnonmodalなのに `aria-modal` だけ付いていると、その人たちだけ背後の情報を参照できなくなる。「覆うかどうか」は、見た目・操作・支援技術への伝わり方の3つをそろえて初めて一貫する。

HTMLの `<dialog>` 要素を使うなら、`showModal()` と `show()` の呼び分けがそのままこの軸に対応する。

confirm-delete.html

```
<!-- 背後を見る必要がない、不可逆な操作の確認 → modal -->
<dialog id="confirm-delete" aria-labelledby="confirm-title">
  <h2 id="confirm-title">このプロジェクトを削除しますか？</h2>
  <p>削除すると元に戻せません。</p>
  <form method="dialog">
    <!-- 不可逆な操作では、破壊的でない方に初期focusを置く（APG） -->
    <button value="cancel" autofocus>削除しない</button>
    <button value="delete">削除する</button>
  </form>
</dialog>

<!-- 背後のページを見ながら入力したい作業 → nonmodal -->
<dialog id="create-panel" class="side-panel" aria-labelledby="panel-title">
  <h2 id="panel-title">ラベルを作成</h2>
  <!-- form fields -->
</dialog>
```

open-dialogs.js

```
// showModal(): 外側が不活性になり、Escで閉じられる（modal）
document.querySelector('#confirm-delete').showModal();

// show(): 外側は操作できたまま（nonmodal）
document.querySelector('#create-panel').show();
```

`showModal()` は外側を不活性にするところまでブラウザがやってくれるので、自前でfocus trapを書くより「見た目と操作のずれ」が起きにくい。逆に、見た目だけ半透明の幕をかけて背後を操作できるままにする実装は、上の2条件のどちらにも当てはまらない中途半端な状態になる。

## 重要なポイント2：複数stepの作業は、出自によって行き先が分かれる

「作業が大きくなったらModalをやめる」までは、どの資料も同じである。分かれるのは、**やめた後にどこへ行くか**だ。

資料

複数step・大きな作業の行き先

USWDS

[「A multi-step process is better suited to an individual page」](https://designsystem.digital.gov/components/modal/)（個別のページ）

NN/g

[「if it requires multiple steps to begin with, it probably justifies dedicating a full page to it」](https://www.nngroup.com/articles/modal-nonmodal-dialog/)（最初から複数stepならページを丸ごと割く）

Atlassian

Modal内でのnavigationを伴う複数stepは避ける。大きいdrawerより[新しいページかnonmodal dialog](https://atlassian.design/components/drawer/usage)を勧める

Carbon

v10のcreate flowでは、2つ以上の明確なstepは[Wide tearsheet](https://v10.carbondesignsystem.com/community/patterns/create-flows/)、Full pageは「サービスを使うために完了が必須」な作成に限る。現行の[Dialogs](https://carbondesignsystem.com/building-blocks/core/patterns/dialogs)は複数stepの「Progress」modalを認めつつ、large modalに収まらないなら「A modal is not an alternative to page.」としてページへ

Apple

写真や文書の編集のような複数stepの作業は[full-screen modal](https://developer.apple.com/design/human-interface-guidelines/modality)、macOSでは別window

Material

一連の作業が要るものは[Full-screen dialog](https://github.com/material-components/material-components-android/blob/master/docs/components/Dialog.md)（例：カレンダーの予定作成）

USWDS・NN/g・Atlassianは「ページへ逃がす」、Apple・Materialは「全画面の器に載せる」、Carbonはその中間のtearsheetを用意している。ここからは私の推論だが、この差はWebとネイティブアプリの違いからきていると思う。WebにはURLとブラウザの戻るボタンがあるので、ページを分けても行き来のコストが小さい。ネイティブアプリでは画面遷移よりも全画面の器の方が「途中で抜けられる作業」を表しやすい。

なので、Webアプリを作っているときにMaterialのFull-screen dialogをそのまま持ち込むのは、出典の適用範囲を外れた移植になりやすい。

なお、GOV.UKの[Question pages](https://design-system.service.gov.uk/patterns/question-pages/)は、さらに踏み込んで「1ページ1質問から始めよ」とする。ただし同じページで、素早く作業を切り替える行政職員向けの内部サービスなら、user researchを根拠に複数の質問を1ページにまとめてもよいとしている。同じ資料の中でも、**誰が使うか**で答えが変わる例である。

## 重要なポイント3：数量の目安は物差しごと持ち運ぶ

「form fieldがいくつまでならModalでいいか」は、よく聞かれるわりに資料ごとの答えがばらばらである。

条件

Carbon v10（Create flows）

USWDS（Modal）

Atlassian（Modal dialog）

form field 1〜2個

Modalを使う

form fieldをmodal内に置くこと自体を避ける

記載なし

form field 3〜4個

明示なし

同上

記載なし

form field 4個を超える

Modalを使わない

同上

記載なし

modal内にスクロールが出る

使わない（代わりにNarrow tearsheet）

largeサイズか、個別のページへ移す

横スクロールは避け、縦スクロールは最小限に

注目すべきは、Carbonが「1〜2個のform fieldならModal」とする一方、USWDSは[「Avoid using components other than buttons inside the modal.」](https://designsystem.digital.gov/components/modal/)と、ボタン以外のcomponent（accordionやform field）をModalに入れること自体を避けている点である。USWDSはその理由を、モバイルの利用者が、自分がmodalを見ていることを見失いやすいからだと説明している。一般市民がスマートフォンで使う政府サイトと、IBMの業務製品では、Modalに載せてよい量が違うのは自然である。

ここで「Carbonは4個、USWDSは0個だから、間をとって2個まで」のように1つの閾値へまとめたくなるが、それはやめた方がよいと思う。どちらの資料も、条件が重なったときの優先順位を決めていない。自分のプロダクトがどちらの前提に近いかを先に決め、その資料の物差しを丸ごと採用する方が、後から説明できる判断になる。

## 重要なポイント4：破棄は明示的な操作にだけ結びつける

閉じるアイコン（×）を置くかどうかは、資料によって正反対である。

-   Carbon v10：create flowのModal・Side panel・tearsheetには[右上の閉じるアイコンを置かない](https://v10.carbondesignsystem.com/community/patterns/create-flows/)。「Cancel」をクリックして抜けるという判断を利用者にさせるためである（ただし現行の[Dialogs](https://carbondesignsystem.com/building-blocks/core/patterns/dialogs)では、ヘッダーに閉じるアイコンを含める）
-   Atlassian：[「A close button in the header should always be used, except in extremely rare circumstances.」](https://atlassian.design/components/modal-dialog/usage)（ヘッダーの閉じるボタンは、ごくまれな場合を除いて必ず置く）
-   USWDS：選択しないと先へ進めない「gate」としてのmodalでは、[closeボタンを無効にする](https://designsystem.digital.gov/components/modal/)

一見ばらばらだが、裏にある原則は共通している。**利用者の作業は、利用者の明示的な操作でしか捨てない**ということだ。

-   Apple Modality：[閉じると利用者が作った内容が失われるなら、閉じる前に確認する](https://developer.apple.com/design/human-interface-guidelines/modality)
-   Apple Popovers：[「Always save work when automatically closing a nonmodal popover.」](https://developer.apple.com/design/human-interface-guidelines/popovers)、作業を捨てるのは明示的なCancelが押されたときだけ
-   Carbon：Full pageでCancel以外（breadcrumbsなど）から離れようとしたら確認modalを出す
-   APG：dialogのtab順には、閉じるための見えるボタン（[「such as a close icon or cancel button」](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)）を含めることを強く推奨

APGが求めているのは「閉じる手段が見えていること」で、×アイコンかCancelボタンかは問わない。なので、Carbonのように×を置かずCancelだけにする設計も、APGとは矛盾しない。議論すべきは×の有無ではなく、「背景のクリックやEscで閉じたとき、入力途中の内容がどうなるか」の方である。

## 版と適用範囲を確かめる：AtlassianとCarbonの例

最後に、出典を版ごと確かめる必要がある例を2つ挙げておく。

Atlassianの[Drawer](https://atlassian.design/components/drawer/usage)のページには、冒頭に「We are planning on deprecating Drawer. Please use Modal instead.」という注意書きがある（2026年10月31日時点）。ページ本文には「同じページに留まったまま副次的な作業を完了させたいならmodalよりdrawerを選ぶ」という使用条件が今も残っているが、これは廃止予定のcomponentの記録として読むべきで、現行の推奨として引用すると誤る。

Carbonはもっとわかりやすい例である。この記事で使ったcreate flowは[v10のサイト](https://v10.carbondesignsystem.com/community/patterns/create-flows/)にあるcommunity patternで、2026年10月31日時点の現行サイトでは公開のpattern一覧に見当たらず、URLを開くとログインを求められた。一方、現行サイトの[Dialogs](https://carbondesignsystem.com/building-blocks/core/patterns/dialogs) pattern（Last updated Aug 11, 2026）には、v10のcreate flowと逆向きの記述がある。

観点

Carbon v10 Create flows

Carbon 現行 Dialogs

modal内のスクロール

スクロールが出るならModalを使わない

内容が長ければ、header・footerを固定してbodyを縦にスクロールさせる

右上の閉じるアイコン

置かない（Cancelで明示的に抜けさせる）

headerに含める

どちらも同じCarbonの指針だが、create flowという特定の場面の規則と、dialog全般の規則で、しかも版が違う。「Carbonではmodal内スクロール禁止」とだけ書くと、半分正しくて半分誤りになる。指針を引用するときは、ページの版・日付・どの場面向けかを一緒に書いておきたい。

## まとめ：器を選ぶ前に確かめること

8つの資料を混ぜずに並べると、器を選ぶ前に確かめるべき問いは次のように整理できる。ここに順番はなく、どれか1つでも引っかかれば器を見直す、という使い方を想定している。

-   作業中に、背後の画面の情報を見たり操作したりする必要があるか → あるなら覆わない（Side panel、nonmodal）
-   作業は複数stepか、スクロールが出るほど大きいか → Webなら専用ページ、ネイティブならfull-screenの器を検討
-   参考にしている指針は、自分のプロダクトと同じ利用者・プラットフォームを想定しているか
-   数量の目安（form field数、スクロール）は、どの資料の物差しをそのまま使っているか
-   背景クリック・Esc・画面遷移で閉じたとき、入力途中の内容は失われないか
-   `aria-modal` や `showModal()` による不活性化と、見た目の「覆う」がそろっているか
-   引用している指針は、廃止予定や旧版のものではないか

デザインシステムの指針は、どれも誰かの文脈で正しい。だからこそ、パターンの名前ではなく「どの資料の、どんな条件のもとでの指針か」をセットで持ち運ぶのが、チームの「これ、Modalでいいですか？」を早く終わらせる一番の近道だと思う。

以上。