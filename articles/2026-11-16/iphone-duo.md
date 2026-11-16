---
title: "タップルのiPhone Duo発売日対応：限られた時間での判断と実装"
source: "https://developers.cyberagent.co.jp/blog/archives/67216/"
publishedDate: "2026-11-15"
category: "frontend"
feedName: "CyberAgent Developers Blog"
author: "Hiroki Ogata"
---

## はじめに

マッチングアプリ「タップル」のiOSアプリを開発している緒方 裕樹（[@icoriha](https://x.com/icoriha)）です。

2026年10月23日、iPhoneでは初となる折りたたみモデル「iPhone Duo」が発売されました。タップルのiOSアプリも、発売日に向けて対応を進めてきました。

iPhone Duoは、開いた状態では内側ディスプレイを、閉じた状態では外側ディスプレイを使います。アプリの使用中でも、開閉すると表示できる領域の大きさが変わります。内側ディスプレイでは、横向きなら横長、縦向きなら縦長の領域になります。半開きにすると、画面の中央に折り目もできます。iPhone Duoに向けてアプリをどう対応させるかの指針は、Appleの[Three steps to make your app shine on iPhone Duo](https://developer.apple.com/iphone-duo/prepare/)や[Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo)で示されています。

![iPhone Duoでのタップルの表示例](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/SS-2026-10-27-1.39.14.png)

※ 画像は開発環境で撮影し、掲載用に一部の表示内容を差し替えています。

この記事では、タップルにおける発売日までの対応について次の4つを紹介します。

-   「何を優先し、何を後に回すか」をどう決めたか
-   回転を有効にし、標準のコンポーネントに任せられる部分は任せる進め方
-   写真とカードの表示を、端末の向きではなく表示できる領域の大きさで切り替える実装
-   「画面サイズは変わらない」という前提で書かれたコードの直し方

## 発売日に向けて目指したこと

Appleのエンジニアは開発者向けのQ&Aセッション（iPhone Duo Group Lab）で、「day one」（発売日）の時点ですべての姿勢に完璧なレイアウトを用意する必要はなく、まず見栄えのよい状態にしてから改善を重ねればよいという旨を話しています（出典：[iPhone Duo Group Lab | 9/16/26 | Meet with Apple](https://www.youtube.com/watch?v=0zp4gAgC6TI&t=2825s)）。タップルでも、同じ考え方で発売日の対応範囲を決めました。この記事では、Group Labでの言い方を借りて発売日のことをDay1と呼びます。

最初に決めたのは、**「アプリを違和感なく使えること」と「iPhone Duo向けに最適化すること」は別物だ**ということです。

Day1の目標を、致命的な表示崩れやクラッシュをなくし、アプリを違和感なく使える状態にすることに置きました。iPhone Duoならではの最適化は、基本的にはその後の対応に回しました。

ただし、ホームなどに表示する相手のカードやプロフィール画面、マッチ画面といった、相手の写真を大きく見せる画面は例外です。相手を知る体験とマッチしたときの体験は特に大事にしたかったので、Day1の時点でiPhone Duo向けに調整しました。これらの画面では、画面が広がるのに合わせて写真もそのまま大きくなり、写真の一部しか見えなくなったり、ほかの表示が画面に収まらなくなったりしていたからです。

## 対応範囲をどう決めたか

iPhone Duoは日本時間の9月10日に発表され、10月23日の発売が予定されていました。iPhone Duo向けシミュレータを含むXcode 27.1のベータ版は、9月後半の提供予定でした。  
発売日に間に合わせるには、その前にQAや申請を終える必要があります。休日やリリースサイクルも踏まえると、シミュレータを使った確認から修正・QAまでに使える期間は、実質15営業日程度でした。

シミュレータの提供を待つ間に、まずはアプリを修正せずにそのまま表示領域が大きくなった場合の影響を調べました。Xcodeの[Device Hub](https://developer.apple.com/jp/documentation/xcode/device-hub)を使い、主要画面をリサイズしながら確認すると、一部の画面で表示が崩れたほか、リサイズ後にタップ位置がずれるなど、操作して初めて分かる問題もありました。

調査結果をPM・デザイナーに共有し、どこまで対応するかを相談しました。表示が崩れる箇所を直すだけでなく、大画面に合わせて体験を最適化することもできましたが、その分、必要な作業も増えるため、対応範囲を見極める必要がありました。

また、対応にどの程度の工数をかけるか考えるため、Androidチームに折りたたみ端末の利用状況も聞きました。こうした情報や、対応しなかった場合の影響をもとに組織で相談し、まずは最低限使える状態を目指す方針を決めました。そのうえで、前述の重要な画面については、発売日までに見せ方も調整しました。

限られた期間ですべてを一度に対応しようとはせず、まずは問題のある箇所を洗い出し、スプレッドシートにまとめてチーム内で共有しました。各項目を優先度ごとに分類し、優先度の高いものから修正しました。具体的な対応は、PM・iOSエンジニア・デザイナー各1人を中心に進めました。

![対応にあたり洗い出した項目の一部（掲載にあたり内容をぼかしています）](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/11/resize_issue_sheet-1024x906.png)

対応にあたり洗い出した項目の一部（掲載にあたり内容をぼかしています）

発売日に目指す全体の状態を考えるうえでは、GoogleがAndroid向けに示している、大画面や折りたたみ端末でのアプリ品質を段階的に整理した基準も参考にしました。このうち[Tier 3](https://developer.android.com/develop/adaptive-apps/quality-guidelines/adaptive-app-quality/tier-3?hl=ja)は、ユーザーが重要なタスクフローを実行できることなどを求める、基本の段階です。タップルでは、発売日にまず問題なく使える状態を目指すうえで、この考え方を目安にしました。Tier 3の要件をすべて満たすことを目標にしたわけではなく、あくまで、発売日に目指す全体の状態を整理するための参考です。

なお、iPhone Duo向けシミュレータが使えるようになる前に参加した[iPhone Duo Group Lab | 9/16/26 | Meet with Apple](https://www.youtube.com/watch?v=0zp4gAgC6TI)では、[Device Hubのリサイズ機能を使ってどこまで検証できるか質問しました](https://www.youtube.com/watch?v=0zp4gAgC6TI&t=3207s)。回答では、リサイズによってレイアウト上の問題を見つけられる一方、iPhone Duoでは画面端の縦のバーや、左右対称とは限らないセーフエリアにも注意が必要だと説明されました。そのため、iPhone Duo向けシミュレータが使えるようになってから、iPhone Duo固有の挙動も確認しました。

ここからは、実際に行った技術的な対応を紹介します。

## まず回転を有効にし、標準のコンポーネントに任せる

タップルはもともと縦向き固定のアプリで、Info.plistで`UIRequiresFullScreen`をYESに設定していました。

iOS 27 SDK以降でビルドしたアプリは、iOS 27以降では、このキーをYESに設定していてもリサイズの対象になります（AppleのTechnotes [TN3192](https://developer.apple.com/documentation/technotes/tn3192-migrating-your-app-from-the-deprecated-uirequiresfullscreen-key)）。ただし、iPhone Duoのシミュレータで試すと、キーが残っている状態では内側ディスプレイでアプリが回転せず、周りに黒い余白が残っていました。

![黒い余白が残る画面表示](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/ed2be162aa0f2ff0370b3f03260103e5.png)

そこで、`UIRequiresFullScreen`を外しました。横向きの宣言は追加していませんが、iPhone Duoのシミュレータでは内側ディスプレイでアプリの表示が4方向に回転するようになりました。Appleによると、iPhone Duoの内側ディスプレイでは、[アプリが対応可能な画面の向きとして指定した設定は尊重されません](https://developer.apple.com/videos/play/tech-talks/111461/?time=222)。既存のiPhoneは縦向きのままです。

iOS 27.1 SDKでビルドすると、記事の冒頭の画像のとおり、外側ディスプレイと、内側ディスプレイの横向きではタブバーが画面の横の端に縦向きで表示されます。内側ディスプレイの縦向きでは、これまでどおり画面の下に表示されます。内側ディスプレイの横向きでこの配置になったのは、キーを外して回転できるようになってからです。標準の`UITabBarController`を使っていたため、OSが自動でこのように配置してくれました。

Appleの[Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo)でも、標準のコンポーネントを使い、リサイズを前提に設計したアプリは、少しの調整でiPhone Duoの様々な姿勢に自動で適応するとされています。たとえばOS標準のアラートやシートは、半開きのときに折り目を避けて自動で移動します。

タップルのボトムシートも、OS標準のシートをもとに作っているため、折り目を避けて表示されました。

![半開きのときにボトムシートが折り目を避けている画面表示](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/b30d5c75c0c897ccaec50e21539c3ea1.png)

一方で、タップルのホーム画面に表示しているカードのような独自のコンポーネントには、OSは自動で合わせてくれません。こうした箇所は、内側ディスプレイの縦向き・横向きと外側ディスプレイのそれぞれで表示を確かめながら、優先度の高いものから自分で直していきました。

## 画面が広がっても、写真とカードは広げない

### ホームのカード

ホームのカードは、もともと画面の幅いっぱいに広がる作りでした。iPhone Duoの内側ディスプレイを横向きにすると、カードが横長になり、縦長の写真が拡大されて上下が切り取られ、写っている範囲が狭くなっていました。

そこで、表示できる領域が横長になったときだけカードの幅を半分にして中央に置き、空いた左右には共通の固定画像（ぼかした背景）を敷くことにしました。

![ホームのカードの修正前後比較](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/a7fe65c769399f4f780ab0765bbb398a.png)

実装では、この切り替えを`CardLandscapeLayout`というビューにまとめています。

```
// 抜粋・簡略化。命名を変えている部分があります
public struct CardLandscapeLayout<Content: View>: View {
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    private let content: Content

    public var body: some View {
        GeometryReader { proxy in
            let isLandscape = horizontalSizeClass == .regular
                && proxy.size.width > proxy.size.height
            // 自作メソッド。カードを表示する枠を返す
            // isLandscapeなら、幅を半分にした枠を画面の中央に置く（折り目があれば左端に寄せる）
            // そうでなければ画面全体の枠を返す
            let frame = LandscapeLayoutFrame.contentFrame(in: proxy, isLandscapeRegular: isLandscape)
            content
                .frame(width: frame.width, height: frame.height)
                .offset(x: frame.minX)
        }
    }
}
```

ポイントは3つです。

**1\. サイズクラスと表示領域の縦横比で判定する**

端末の機種名や向きではなく、表示できる領域が「横方向の[サイズクラス](https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes)がregularで、かつ横長」のときだけ切り替えます。既存のiPhoneは縦向きのままなのでcompactで、この条件に当てはまりません。内側ディスプレイでも、縦長のときはこれまでどおり全幅で表示します。

Group Labでも、内側ディスプレイで縦と横のレイアウトを変えたいという質問に対し、向きを読むよりも使える幅から考えるほうがよく、切り替える場合も同じコンテンツを空間に合わせて並べ替えたものに感じられるべきだという旨の回答をAppleのデザイナーとエンジニアがしています（出典：[iPhone Duo Group Lab | 9/16/26 | Meet with Apple](https://www.youtube.com/watch?v=0zp4gAgC6TI&t=2655s)）。向きではなく表示できる領域から判断するという今回の作りは、この考え方に沿っています。

**2\. ビューの構造を変えず、幅と位置だけを変える**

領域の形に応じて`if`で別のビューに出し分けると、SwiftUIでは切り替わるたびに別のビューとして扱われ、ビューの中で持っている状態がリセットされます。そこで、ビューの構造は同じまま、`frame`と`offset`だけを切り替えています。

**3\. 折り目をまたがない**

横向きで半開きにしたときは、カードが折り目をまたがないよう、左端に寄せます。折り目の位置はiOS 27.1から使える`reservedRegions(kind: .division)`で取得しています。

```
// 抜粋
private static func divisionMinX(in proxy: GeometryProxy) -> CGFloat? {
    guard #available(iOS 27.1, *) else { return nil }
    return proxy.reservedRegions(kind: .division)
        .filter(\.isActive)
        .map(\.frame.minX)
        .min()
}
```

半分の幅のままでは折り目に届いてしまう場合だけ、折り目の手前まで幅を詰めます。

![半開きのときにホームのカードが折り目を避けている画面表示](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/1d47d062719cff23ee5e64e313e98e62.png)

ただし、折り目の回避はすべての要素に一律には入れていません。優先度の高い箇所から対応し、それ以外は必要に応じて今後対応していきます。

### ホーム以外の画面

カードはホーム以外の画面でも使われています。見た目は同じでも画面ごとにカードの組み込み方が異なるため、カードを使っている箇所を洗い出し、そのすべてに同じ仕組みを適用しました。

同じ仕組みは、カード以外の画面にも使っています。たとえばマッチ画面では、横長の領域でアバターが画面の幅に合わせて大きくなりすぎ、上部の文言が途中で切れていました。背景は全幅のまま表示し、アバターやボタンなどの前景だけを中央の列に収めています。

![マッチ画面の修正前後比較](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/f3b5eee48f57b04a96f249ab16336d4f.png)

## 「画面サイズは変わらない」前提を外す

カードのように見せ方を調整したもののほかに、表示が崩れたりクラッシュしたりする不具合もありました。その多くは、既存のコードが「画面サイズはアプリの実行中に変わらない」という前提で書かれていたことが原因でした。

Appleの[Three steps to make your app shine on iPhone Duo](https://developer.apple.com/iphone-duo/prepare/)でも、直すべきパターンの1つ目として、`UIScreen.main`から画面のサイズを取るコードが挙げられています。

ほかにも、ビューを親の大きさに合わせて配置していないコードや、サイズを一度だけ取得して使い続けるコードは、表示領域の変化によって問題を起こすことがあります。代表的な例を3つ紹介します。いずれもiPhone Duoのシミュレータで対応を進める中で見つけたものです。従来のタップルは縦向き固定だったため、これらの問題は顕在化していませんでした。

### **例1：親子のビューの大きさがずれたまま残る**

iPhone Duoの内側ディスプレイでアプリを起動すると、表示内容が左上に寄り、右側と下側に余白ができる不具合がありました。

![例1の修正前後比較](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/6ce096181654c28ca2d451ca66d7ce96.png)

原因は、子のView Controllerのviewを親の大きさに合わせないまま`addSubview`していたことです。子のviewは読み込まれた時点で、外側ディスプレイ相当の466×678ptの大きさでした。親に追加した後も、親子の大きさの差が埋まらず、余白として残っていました。

そこで、追加時に子のviewのframeを親のboundsに合わせ、その後も親の大きさに追従させるようにしました。

```
// 抜粋・命名を変えています
```

### **例2：ビューに幅を固定値で指定していた**

相手のプロフィール画面では、相手が動画を登録している場合だけ、内側ディスプレイの横向きと外側ディスプレイで左側が見切れていました。

![例2の修正前後比較](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/10/6d5d762d78848b323d3e3d975582fc61.png)

動画プレイヤーに、ビューを作った時点のウィンドウの幅を読んで`.frame(width:)`に指定していたのが原因です。取得した幅を定数として保持し、サイズ変更時に更新していなかったため、回転や開閉で幅が変わっても、古い幅のまま残っていました。この指定を削除し、親のサイズに合わせて広がるようにしました。

```
// 抜粋・簡略化。命名を変えている部分があります
// UIWindow.currentは自作のextension。現在のウィンドウを取得する
private let width = UIWindow.current?.frame.width ?? 0  // ビューを作った時点の幅
// ...
VideoPlayerView(url: url)
    .frame(width: width)  // この行を削除した
```

### **例3：レイアウトを作ったときの幅を使い続けていた**

プロフィール編集では、横向きから縦向きに回転するとクラッシュしていました。

写真グリッドのセルの大きさを`view.bounds.width`から一度だけ計算し、Compositional Layoutに固定値で渡していたため、回転して幅が狭くなると、セルの合計幅が行の幅を超えてレイアウトが不正になっていました。レイアウトを組み直すたびに呼ばれるクロージャ（`UICollectionViewCompositionalLayout`に渡す`sectionProvider`）の中に計算を移し、`environment.container.effectiveContentSize`から毎回求めるように変えています。

```
// 抜粋・簡略化
let layout = UICollectionViewCompositionalLayout { _, environment in
    let viewWidth = environment.container.effectiveContentSize.width
    let smallSquareWidth = (viewWidth - (Const.sideInset * 2 + Const.insideInset * 2)) / 3
    // ...
}
```

3つに共通するのは、**サイズを固定の値として持たず、親の大きさに合わせ続ける**という直し方です。これらの修正後も、従来のiPhoneでは見た目が変わらないことを確認しています。

## 検証

「違和感がないか」は定性的な判断なので、エンジニアだけで決めると手戻りが起きやすくなります。そこで、デザイナーやPMにもXcodeを入れてもらい、シミュレータ用にビルドしたアプリを渡しました。iPhone Duoのシミュレータで任意の画面を自分で触って確かめ、修正の要否と「どうなればOKか」を決めてもらっています。既存のiPhoneへの影響は、実機で確認しています。

## おわりに

iPhone Duoの発売日に向けて、タップルでは、すべての画面を一度に最適化するのではなく、まずは違和感なく使える状態を目指しました。標準のコンポーネントに任せられる部分は任せ、独自の画面では表示領域に合わせてレイアウトを調整しました。

新しい端末への対応を進めたくても、ほかにも優先すべき施策がある中で、すぐに時間を確保するのは難しいかもしれません。タップルでは、対応しなかった場合の影響やコストを整理し、組織として大きな方針を決めたうえで、具体的な対応範囲をPM・デザイナーと相談しました。

これからiPhone Duoへの対応を検討する場合も、まずは自分たちのアプリで何が起きるかを確認し、最低限必要な対応と、さらに体験を良くするための最適化を分けて考えてみるとよいかもしれません。それぞれの影響や必要な作業を関係者に共有することで、最初にどこまで取り組むかを相談しやすくなります。

Appleは、[2027年4月以降に提出するアプリやゲームについて、iPhone Duoのスクリーンショットを必須にする](https://developer.apple.com/news/?id=kkphp5qo)と予告しています。こうした期限も、対応の優先度を関係者と相談する際の材料になります。

Day1の対応は出発点です。タップルでも、今後さらにiPhone Duoでの体験を改善していきます。この記事が、新しい画面サイズへの対応を進める方の参考になれば幸いです。