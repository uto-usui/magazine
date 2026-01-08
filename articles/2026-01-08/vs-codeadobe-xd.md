---
title: "VS CodeのAdobe XD用拡張機能が登場！デザインシステムにもとづきコード出力と補完が可能に"
source: "https://ics.media/entry/210107/"
publishedDate: "2021-01-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Microsoftが開発を行っている無償のエディター「[VS Code](https://code.visualstudio.com/)」にAdobe XD用の拡張機能「[Adobe XD extension](https://marketplace.visualstudio.com/items?itemName=Adobe.xd)」が登場しました。

この拡張機能を使うことで、Adobe XD上で作成したデザインアセットをVS Code上で参照・編集できるようになります。デザイナーとエンジニア間の溝を埋めることができ、デザインシステム構築のハードルが下がるでしょう。

今回の記事では、「Adobe XD extension」の活用方法を紹介します。コーディングの際に活躍する拡張機能ではありますが、Adobe XDを使ったデザイン段階でのひと工夫も必要になりますので、デザイナーの方も理解しておくとプロジェクトの進行がスムーズになるでしょう。

### 「Adobe XD extension」とは？

「Adobe XD extension」はVS Codeにインストールできる拡張機能です。Adobe XD上で登録したアセットを[Design System Package（DSP）](https://github.com/AdobeXD/design-system-package-dsp)という新しいフォーマットで出力し、読み込めるようになります。

DSPとはAdobe XD上でアセットに登録した色や文字スタイル、コンポーネントなどのデザインシステムに関する情報がjson形式でパッケージングされたものです。

[Bootstrap5のDSP](https://foxbox.com/blog/adobe-xd-vs-code-bootstrap-dsp/)や[1,000個以上のアイコンが用意されたDSP](https://www.streamlinehq.com/dsp)など一般に公開されているDSPもありますので、まずはこちらを見て全体像を掴んでみるのもオススメです。

### 「Adobe XD extension for Visual Studio Code」の使い方

ここからは、実際に「Adobe XD extension」を使う方法をインストールから順に解説します。

[Adobe XD](https://www.adobe.com/jp/products/xd.html)、VS Code共に無料で使えるツールですので、ぜひダウンロードし実際に触りながら読み進めてみてください。

#### 拡張機能のインストール

「Adobe XD extension」をインストールするにはVS Codeの[マーケットプレイスのページ](https://marketplace.visualstudio.com/items?itemName=Adobe.xd)から行います。またはVS Code内でインストールすることもできます。手順は以下の通りです。

まずは画面左側のメニューから「extensions」ボタンをクリックします。開かれたパネル上部の検索フォームに「xd」と入力すると、「Adobe XD」という名前の拡張機能が出てきます。こちらが「Adobe XD extension」ですのでクリックして、「install」ボタンを押せばインストールが開始されます。

![](https://ics.media/entry/210107/images/210107_extension_install.png)

「INSTALLED」リスト内に「Adobe XD」が追加されていればインストール完了です。

![](https://ics.media/entry/210107/images/210107_extension_install_finish.png)

#### Design System Package（DSP）の作成

DSPを作成するにはデザインが必要なので、まずはAdobe XD上でデザインを作成しましょう。デザインが苦手な方は[UIキット](https://www.adobe.com/jp/products/xd/features/ui-kits.html)やプラグインを使ってデザインを始めてみるのがオススメです。今回は「[Quick Mockup](https://modular.adobe.com/quick-mockup)」というプラグインを使ってデザインを作成してみました。

デザインに使われているカラーや文字スタイル、コンポーネントをアセットに登録します。画面左下のライブラリボタンをクリックすると「ドキュメントアセット」が開かれます。

![](https://ics.media/entry/210107/images/210107_xd_assets.png)

カラーや文字スタイル、コンポーネントを選択し、ライブラリパネルの「+」アイコンをクリックするとアセットに登録ができます。このアセットの名前がCSSの変数名などに使われるため、しっかりと命名をしておきましょう。

![](https://ics.media/entry/210107/images/210107_xd_assets_rename.png)

アセットの登録が完了したら、ライブラリパネル内の右上のボタンをクリックしましょう。すると、別のウインドウが開かれます。ウインドウ内の「公開」ボタンをクリックすれば、CCライブラリの公開が完了です。

![](https://ics.media/entry/210107/images/210107_xd_assets_publish.png)

公開された[CCライブラリをブラウザ上](https://assets.adobe.com/libraries)で確認してみましょう。右上のアイコンから「リンクを取得」をクリックすると、ライブラリへのURLをコピーできます。こちらのURLは後ほど、使うことになります。

![](https://ics.media/entry/210107/images/210107_xd_assets_link.png)

ここからはVS Codeでの操作になります。先ほどインストールした「Adobe XD extension」のパネルを表示します。右下の「XDパネル」のアイコンをクリックするか、⌘+Shift+P（Windowsの場合Ctrl+Shift+P）でコマンドパレットを開き「xd」と入力し、「Toggle Adobe XD Panel」をクリックするとパネルが表示されます。

![](https://ics.media/entry/210107/images/210107_xd_extension_panel.png)

DSPを読み込むか新規作成するかを聞かれます。「Load package」がDSPを読み込むためのボタンです。DSPがある場合はこちらをクリックします。今回は新規作成したいので「Create package」をクリックしましょう。

![](https://ics.media/entry/210107/images/210107_xd_extension_dsp.png)

次に、DSPのパッケージ名を入力し保存する場所を聞かれます。わかりやすいパッケージ名を入力し、プロジェクト内に保存してみましょう。

![](https://ics.media/entry/210107/images/210107_xd_extension_dsp_rename.png)

DSPから書き出す言語について聞かれます。プロジェクトで扱う言語に合わせて設定しましょう。Web開発だけでなく、アプリ開発に使われるFlutterやJavaなどの言語も選択できます。また、複数選択も可能です。

今回の場合、Webデザインを想定しているためCSSを選択しました。

![](https://ics.media/entry/210107/images/210107_xd_extension_language.png)

最後に、CCライブラリの読み込みを行います。「CC LIBRARY LINK」にCCライブラリの公開時にコピーした共有URLをペーストしましょう。「Import」をクリックするとCCライブラリに登録したアセットを含むDSPが作成されます。

![](https://ics.media/entry/210107/images/210107_xd_extension_import.png)

カラーと文字スタイルは「Design tokens」の中にそれぞれ「Token」、「Typography」として登録されました。コンポーネントは「Components」の中にAdobe XD上にて命名した名称で登録されていることが確認できます。

![](https://ics.media/entry/210107/images/210107_xd_extension_dsp_create.png)

これでデザインシステムと連携の取れた開発がバリバリ進められます！　と言いたいところですが、もう少し設定が必要です。次の項からはDSPの編集方法を解説します。

#### カラーと文字スタイルのCSS変数出力

まずは、DSPがどのような動きをするのか確認しておきましょう。一度、「Start editing」をクリックしてそのまま「Finish editing」をクリックします。これで、distディレクトリの配下にCSSファイルが出力されます。

![](https://ics.media/entry/210107/images/210107_xd_tokens_css.png)

CSSファイルを確認するとカラーと文字スタイルはCSS変数として出力されていることが確認できました。このようにデザインで使われているアセットを変数として書き出してくれるので、デザインとの差異が起きづらくなります。

![](https://ics.media/entry/210107/images/210107_xd_tokens_css_variant.png)

変数にはAdobe XDで命名した名前がそのまま使われていることが確認できました。試しにVS Codeで編集してみましょう。

VS Codeで編集するには「Start editing」をクリックして、編集したいtokenの右に表示されているペンアイコンをクリックします。「Token」の場合には「TOKEN ID」、「Typography」の場合には「FONT NAME」をわかりやすい名前に変更しましょう。変更が完了したら、チェックマークをクリックすることで保存します。そして「Finish editing」をクリックすればDSPの変更がCSSファイルに反映されます。

![](https://ics.media/entry/210107/images/210107_xd_tokens_rename.png)

#### コンポーネントのコードスニペット登録

カラーと文字スタイルはCSS変数として出力されましたが、コンポーネントはどのような動きをするのか確認しましょう。コンポーネントにはコードスニペットを登録でき、コード補完による呼び出しも簡単にできます。この時にコンポーネントの見た目をプレビューすることもできます。

![](https://ics.media/entry/210107/images/210107_xd_component_preview.gif)

「Components」タブを見てみるとAdobe XDで登録したコンポーネントの見た目が確認できます。ここでは、コンポーネントに対応したドキュメントやコードスニペットが登録できます。 コードスニペットの登録はAdobe XD側では設定が出来ない項目になりますので、VS Codeで登録を行います。

![](https://ics.media/entry/210107/images/210107_xd_component.png)

まずは「Start editing」をクリックして「Code snippet」の右に表示されているペンアイコンをクリックします。「SNIPPET TRIGGER」という項目には、コードの呼び出しに使う単語を登録します。「SNIPPET」という項目には、呼び出すコードを登録します。編集後にはチェックマークをクリックして保存することを忘れないようにしましょう。

また、「Tokens」にはコンポーネントで使っている変数を紐付けることができ、「Documentation」にはコンポーネントの説明を追加できます。コンポーネントの仕様をエディター上で確認できるので、ツールを切り替える必要がなくなり、開発体験が良くなります。

#### デザイン変更が起きた場合

Adobe XD側でデザインの変更がされ、CCライブラリが更新された時には、どのように連携をすればいいのでしょうか。VS Code側からCCライブラリの変更を検知することはできないので、手動で更新を行う必要があります。

更新は簡単で、「DSP setting」ボタンをクリックし「CC LIBRARY LINK」の項の右にある「Re-import」ボタンをクリックすることで更新完了です。この「DSP settings」ではDSP名の変更や書き出し言語の変更などさまざまな設定ができますので、ざっと目を通しておくといいでしょう。

![](https://ics.media/entry/210107/images/210107_xd_extension_re_import.png)

CCライブラリの変更が反映されたら、CSS変数もしっかり出力されていることを確認し、追加されたコンポーネントがある場合にはコードスニペットやドキュメントの追加をして連携完了となります。

#### その他の機能や注意点

「Documentation」の項にはデザインシステム自体のドキュメントを残すことができます。こちらも「Start editing」をクリックすることで内容を変更したり、ページを追加できます。複数人での開発の時にはドキュメントを読むことで、全員がプロジェクトの目的やルールを理解できるようになりますので、しっかりと記述しましょう。

![](https://ics.media/entry/210107/images/210107_xd_extension_document.png)

「Tokens」にはカラーに限らずさまざまなデザインに関する情報を管理できます。VS Codeからトークンを追加することもでき、「Size」「Color」「Custom」「Alias」という4種類の中から選択できます。

「Size」を選択した場合、数値の定義が行えます。余白の管理やベースとなるフォントサイズなどのサイズを管理できます。

![](https://ics.media/entry/210107/images/210107_xd_tokens_size.png)

「Color」を選択した場合、色の定義が行えます。Hex値（16進数）による色指定とOpacity（不透明度）の指定が行えます。

![](https://ics.media/entry/210107/images/210107_xd_tokens_color.png)

「Custom」を選択した場合、自由な値の定義が行えます。アニメーションの指定など、サイズや色ではない値の管理もできます。

![](https://ics.media/entry/210107/images/210107_xd_tokens_custom.png)

「Alias」を選択した場合、定義済みの値を参照できます。たとえば、「リンク色」や「ホバー色」のように状態と色の紐付けの管理が行えます。

![](https://ics.media/entry/210107/images/210107_xd_tokens_alias.png)

「Color」以外はAdobe XD側では設定できない項目なので、しっかりとしたデザインシステムを組み上げるにはVS Code側での操作が必要になるでしょう。

注意点としてAdobe XDにはコンポーネントの「ステート機能」がありますが、こちらはDSP上での管理はまだ対応していません。そのため「ステート機能」でデザインの展開を行っている場合、個別にコンポーネントの登録を行う必要があります。

### 「Adobe XD extension for Visual Studio Code」の登場で何が変わるのか

コーディング段階には、カラーやコンポーネントが視覚的にも管理しやすくなり開発スピードが向上する他、変更にも強いコードを書きやすくなり、細かい色やテキスト指定のミスなども未然に防げます。しかし、Adobe XD側では設定できない項目も存在するので、デザインを理解してトークンやドキュメントを追加する必要があります。

デザイン段階では、カラーやテキストのアセット管理が必須となり、命名を行う際にもコードへの影響も考慮する必要があり負担に感じるかもしれません。その分デザイン段階でしっかりとしたアセット管理が行われていると、実装との乖離が少なくなりクオリティを向上できます。

デザインとコーディングをしっかりと管理するための拡張機能ですので、スピード感が求められるプロジェクトではあまり恩恵を受けられません。しかし、長期的に運用されるプロジェクトではその力を最大限に感じられると思います。

メリット、デメリットはありますが「Adobe XD extension」はデザイナーとエンジニアが歩みよりながら、開発を進めていくための架け橋となる拡張機能でしょう。

### まとめ

「Adobe XD extension」はVS CodeのAdobe XD用拡張機能として登場しましたが、本質的にはDSPという新しいフォーマットを扱うためのものでした。

現状ではエディターはVS Code、デザインツールはAdobe XDという縛りがありますが、DSPを扱えるエディターやDSPを出力できるデザインツールは今後も増えていくのではないかと予想しています。

ツールを問わず使えるようになればDSPが開発の軸となり、使うのが当たり前という未来が来るかも知れません。今のうちに「Adobe XD extension for Visual Studio Code」を利用して、時代の先取りをしてみるのはいかがでしょうか。