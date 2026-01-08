---
title: "Adobe Senseiの画像解析が凄すぎた! 14000人から拍手喝采を浴びた研究中の技術（Adobe MAX 2018）"
source: "https://ics.media/entry/19234/"
publishedDate: "2018-10-17"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2018年10月17日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

米アドビシステムズが主催のクリエイティビティ・カンファレンス「Adobe MAX 2018」（ロサンゼルス）。2日目の10月16日は「スニークス」と題して**Adobeの研究中の技術が発表されました**。スニークスはAdobe MAXで最大の盛り上がりをみせる恒例の人気イベントです。

▼「スニークス」が開催されたのは2018年10月16日（米国時間）

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_scene_01.jpg)

ここで発表されたものは現時点では製品に搭載されていないものの**将来的に製品に組み込まれるかもしれない技術**。現地のイベントに自費参加したスタッフ（[池田 @clockmaker](https://x.com/clockmaker)）がレポートします。

今年は、画像解析にAIの「Adobe Sensei」を活用した次世代技術が多く扱われました。

▼Adobe MAX 2018には14,000人が参加

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_scene_02.jpg)

### フォント解析によって、他の字体も作る技術

字体のパターンを学習して、全文字のフォントを生成する技術「#FontPhoria」。

文字をチーズの穴のようにくり抜いた装飾を用意したとします。これは他の文字に適用しようとすると、人力で手間のかかる作業です。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FontPhoria_01.jpg)

AIによってパス化されたフォントを自動解析。他の文字にも「チーズの穴」を適用できます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FontPhoria_02.jpg)

実はフォントとして認識されているので、**自由入力ができるテキストとして扱える**ようになります。「CHEESE」を「SPICY」という文字列に変更してます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FontPhoria_03.jpg)

**アウトライン化されてしまった文字からもフォントを復元できます**。血塗られたフォントなど、Adobe Senseiがどういう加工をしたいのか意図を汲み取って解析してます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FontPhoria_05.jpg)

ここに表示されていない文字も、テキスト再編集ができます。「DEAD」という文字が「SNEAK」に変更されています。

写真で撮った文字を認識させると、同じ雰囲気のフォントを作ってしまいます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FontPhoria_06.jpg)

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FontPhoria_07.jpg)

### 動画から被写体をレイヤー分離する技術

動画の最初の一コマをマスクするだけで、すべてのコマが自動で切り抜き可能な状態にする技術「#ProjectFastMask」。

動画の被写体の輪郭を何箇所かクリックすると**Adobe Senseiが被写体の輪郭を認識します**。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FastMask_01.jpg)

このあと、**動画のすべてのコマを自動的に解析**し、マスク（映像の切り抜き箇所を指定すること）を作ってくれます。

マスク化されているので、被写体と背景の間にレイヤーを挟み込んでも自然な仕上がりになります。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FastMask_03.jpg)

素人が手取りで撮影したようコンテンツでもAIが自動的に解釈してマスクを作ってくれます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FastMask_04.jpg)

障害物が入っても、障害物を認識してマスクしてくれます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FastMask_05.jpg)

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_FastMask_06.jpg)

### 静止画から立体的な動画を作れる技術

一枚の静止画からカメラワークをともなったようなモーション映像を作る技術「#MovingStills」。

被写体と背景の関係をAdobe Senseiが自動認識します。「Animate」というボタンをクリックするだけで、視差のある立体的なモーションが実現できます。

モーションの指定も可能。左から動くか、下から動くか。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_MovingStil_01.jpg)

クローズアップ（近づくモーション）も細かく指定できます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_MovingStil_02.jpg)

クローズアップもこのように自然な仕上がりになっています。

### 被写体を画面内に収める技術

被写体を自動的にフレームの内側に収め続ける技術「#ProjectSmoothOperator」。

Instagramのストーリーに横長動画を投稿すると中央で切り抜かれるため、被写体がフレームアウトすることもあります。Adobe Senseiが被写体の位置を認識して、フレームアウトしないように切り抜きます。車が見切れてしまう動画でも、Adobe Senseiが自動的に車を追いかけ見切れないように処理されます。

結果として、ツール変換後は常に車が映っています。

スカイダイビングで動きの激しい被写体でもAdobe Senseiが自動で追いかけ、見切れないようにトリミングしてくれます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_ProjectSmoothOperator_04.jpg)

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_ProjectSmoothOperator_05.jpg)

インスタグラマーに役立ちそうです。

### 鼻歌が楽器演奏になる演奏技術

人間の声を他の楽器に変換する演奏技術「#ProjectKazoo」。

音声によるデモなので、音量をあげて次の動画をご覧ください。30秒あたりから拍手喝采の連続になってます。

鼻歌を録音すると、音程を解析します。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_ProjectKazoo_01.jpg)

人間の声がバイオリンに変換されて、再生されてます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_ProjectKazoo_02.jpg)

アルトをソプラノにも変えられます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_ProjectKazoo_03.jpg)

笛で吹いた音を録音してサックスに変えることも可能。会場が歓喜にあふれています。

この技術の研究は次の記事で詳細が記載されています。

-   [Adobe’s new experiment turns tone deaf humming into real music](https://mashable.com/article/adobe-project-kazoo-turns-sounds-into-music/#.A6KJskLpgq3)

### イラストに骨格を自動的に入れる技術

Adobe Illustratorの未来の技術。イラストのキャラクターを自動的に解析して、ボーンを入れる技術「#ProjectGoodBones」。

Illustratorで描いた恐竜や人の体型をAdobe Senseiが認識して自動的に骨組み（ボーン）を作成。骨格から自在に体型を動かすことができます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_bone.jpg)

ボーンなので、ドラッグするだけの簡単操作で手足を動かすことも可能。複数のポーズを作れば、アニメーション制作に役立ちます。GIFアニメーションも作れます。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_bone_2.jpg)

### アニメーション付きブラシ

ブラシでインタラクティブなアニメーションを描ける技術「#BrushBounty」。

イラストの中でブラシを描くと、そこに雨を降らせられます。この雨はアニメーションしています。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_brash_01.jpg)

雨の降りはあとから強さをパラメーターで変えたりできます。アニメーションだけでなく、雨音（サウンド）もブラシに含まれています。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_brash_02.jpg)

また、風になびく髪の毛も作れます。色の変化や物理法則で動きを加えています。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_brash_03.jpg)

データ連動も可能で、実際の都市の天気と同期させたり、朝と夜の背景を切り替えることも可能。ハッシュタグのツイート数によって、リアルタイムにエネルギー弾の大きさを変化させています。

![](https://ics.media/entry/19234/images/181016_adobemax_sneaks_brash_04.jpg)

### パッケージデザインに役立つ3D技術

折りたたまれた3D形状を自動的に決定する技術「#FantasticFold」。

立体的な面にテクスチャーを貼り付けるのに役立ち、展開図を自動的に作ってくれます。折り鶴のような複雑な形状にも、完成図にテクスチャ貼るだけで、展開図をAIが計算してくれています。

発表の様子はYouTubeで公式に公開されています。

### ARを使った3D配置ツール

スマートフォンのARを使って、3Dモデルをプレビューする技術「#ProjectWaltz」。

ARで表示した座標情報を記録でき、簡易3Dアニメーションを作ることもできます。

発表の様子はYouTubeで公式に公開されています。

### 3Dのモーフィングツール

3Dの人工物を編集するための簡単で直感的なツール「#ProjectModelMorph」。

トロフィーを作るまでの手順が紹介されています。3Dオブジェクトの編集で手間のかかる頂点編集に役立つ技術で、ドラッグするだけで編集できます。

### まとめ〜Adobe Senseiが示す未来のクリエイティブの姿

スニークスの冒頭で、ツイートの反応が多い技術は実用化の可能性が高まると言及されていました。おもしろいと思った技術があれば、ツイートすると手元で使える日が近づくでしょう。

過去の例を挙げると、Photoshopのディフォグ（霧を増減させる）機能やマッチフォント機能もかつてスニークスで発表された技術です。2017年のスニークスの技術は今年のCharacter Animater CCに導入されています。

Adobeの公式ブログにも記事「[Adobeの最新技術をチラ見せするMAX SNEAKSを見てきました](https://blog.adobe.com/jp/publish/2018/10/17/general-adobe-max-2018-sneaks)」が公開されているので、あわせて参考にするといいでしょう。

**Adobe MAX 2018はスニークスだけの場ではありません**。TwitterでMAXの情報を発信をしているので、よければ[@clockmaker](https://x.com/clockmaker)をフォローくださいませ。

-   [Adobe XDが大型アップデート](https://ics.media/entry/19171/)
-   [実演されたiPad版Photoshop CCの紹介](https://ics.media/entry/19208/)