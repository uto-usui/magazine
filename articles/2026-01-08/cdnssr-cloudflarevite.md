---
title: "パフォーマンスの高みを目指せ！ CDNのエッジサーバーでSSR - CloudflareでViteを動かす手順"
source: "https://ics.media/entry/230706/"
publishedDate: "2023-07-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブサイトの高速化はあらゆるウェブ制作者の悲願です。1ミリ秒でも早くコンテンツを届けるために、エンジニアたちは血と汗と涙を流します。しかし、ウェブサイトの高速化は、ウェブサイトの構成要素を最適化するだけでは実現できません。

大きな課題として次の2つが挙げられます。

-   コンテンツの転送量が大きく、表示までに時間がかかる
-   物理的なクライアント/サーバー間の距離が遠く、転送に時間がかかる

これらの課題を解決するため、様々な技術が発展してきました。今回はその中でも**SSR（サーバーサイドレンダリング）**と、**CDN（コンテンツデリバリーネットワーク）**に注目します。

本記事ではSSRとCDNの概念について解説し、実際にCloudflareというCDNからコンテンツを配信する方法を紹介します。フレームワークはVue.jsを使用しますが、もちろんReactやその他フレームワークをお使いの方も役に立つ内容になっているので、ぜひ最後まで読んでいってください。

### SSR（サーバーサイドレンダリング）とは

Vue.jsやReactといったフロントエンドフレームワークの登場によって、JavaScriptでUIを記述することが多くなりました。この手法はインタラクティブなUIの作成を可能にした一方で、ユーザーのネットワーク環境や端末スペックによっては初期レンダリングに時間がかかるなどユーザー体験を損ねる場合もあります。

そこで、これらのフレームワークの長所を活かしつつ、それらの欠点を補う施策のひとつとして取られているのがSSR（サーバーサイドレンダリング）です。

Vue.jsやReactで主に行われるのはCSR（クライアントサイドレンダリング）です。これはブラウザ側のJavaScriptが生成したDOMを、空のHTML要素（`<div></div>`タグ等）に挿入する仕組みです。

一方、**SSRはサーバーでJavaScriptを実行しHTMLを生成します**。そのためクライアントはHTMLを受け取った瞬間に画面を表示できます。

静的なHTMLとも比較すると、SSRはユーザーの状態や操作に応じた動的なコンテンツを配信できるというメリットがあります。たとえばユーザーのログイン状態に応じて要素を出し分ける、といったことも可能です。CSRと静的な配信のいいとこ取りをしたのがSSRとも言えるでしょう。

▼CSRとSSRの違い

![](https://ics.media/entry/230706/images/230706-cloudflare-rendering.png)

SSRの難点としては、**JavaScriptの実行環境があるホスティングサービスでしか使えない**という点があります。たとえばGitHub Pagesでは静的なサイトしかホスティングできない（＝JavaScriptの実行環境がない）ため、SSRは使えません。

SSR可能な代表的なホスティングサービスとしては、次のようなものがあります。

-   [Netlify](https://www.netlify.com/)
-   [Vercel](https://vercel.com/)
-   [Cloudflare Pages](https://www.cloudflare.com/ja-jp/products/pages/)

もちろんAWS, Google Cloud, Azureといった大型のプラットフォームでも利用可能です。ただし、お手軽に使えるという点では上記のサービスから試してみるとよいかもしれません。

### CDN（コンテンツデリバリーネットワーク）とは

通常、HTML, CSS, JavaScript, 画像や動画などのインターネットコンテンツは、コンテンツが保存されたひとつのサーバー（オリジンサーバー）から取得します。この方法の問題点として、ユーザーとホスティング先のサーバーが遠いと通信に時間がかかるという点が挙げられます。たとえば日本内でのサーバー/クライアント通信と、日本からアメリカのサーバーにアクセスするのでは後者のほうが時間がかかります。

この問題を解決するために生まれたのが**CDN（コンテンツデリバリーネットワーク）**でした。CDNは世界中にサーバーを配置し、ユーザーに近いサーバーにキャッシュ（コピー）されたコンテンツを配信します。さきほどの例だと、アメリカのサーバーにホスティングされたコンテンツのキャッシュが日本のサーバーから配信されるため、より短時間でコンテンツを取得できます。

▼CDNの仕組み

![](https://ics.media/entry/230706/images/230706-cloudflare-cdn.png)

CDN自体は1990年代からある技術です。ですが、CDNのエッジサーバーでサーバーサイドレンダリングなどの処理を行う**エッジコンピューティング**という考え方が生み出され、近年注目を集めています。CDNの代表的なサービスとしては、以下のようなものがあります。

-   Netlify
-   Vercel
-   Cloudflare
-   [Fastly](https://www.fastly.com/jp/)

代表的なホスティングサービスで挙げたものとほぼ重複していますね。CDNとホスティングサービスが同時に提供されるおかげで、我々開発者が快適にウェブサービスを運用する仕組みが整ってきているのを感じます。

### CDNからコンテンツを配信してみよう

それでは、実際にCDNからコンテンツを配信してみましょう。

#### Cloudflareに登録する

どのホスティングサービスを利用してもよいですが、今回は[『Cloudflare』](https://www.cloudflare.com/ja-jp/)を利用します。 まずはCloudflareにアカウントを作成しましょう。次の手順に従い、アカウントを作成します。

1.  [Cloudflareのサイト](https://www.cloudflare.com/ja-jp/)にアクセスし、右上の「サインアップ」をクリックします。
2.  「メールアドレス」、「パスワード」を入力し、「サインアップ」をクリックします。
3.  登録したメールアドレスに届いた確認メールのリンクをクリックします。

#### サイトをデプロイする

Cloudflareに登録できたら、次はCloudflareが提供するCloudflare Pagesというホスティングサービスでサイトをデプロイします。デプロイ方法は次の3つから選択できます。

-   直接アップロードする
-   GitHubレポジトリと連携する
-   デプロイ用のCLIを使う

今回は「GitHubレポジトリと連携する」方法を用います。デモとして、[Vite](https://vitejs.dev/)で作成したTypeScriptのテンプレートファイルをレポジトリに格納しました。

-   [デモを別タブで再生する](https://230706-cdn-vite-static.pages.dev/)
-   [ソースコードを確認する](https://github.com/ics-creative/230706_cdn-vite-static)

次の手順で、GitHubレポジトリと連携できます。

1.  Cloudflareのダッシュボードから、「Workers & Pages」をクリックします。
2.  「アプリケーションの作成」をクリックします。
3.  「Pages」タブを開きます。
4.  「Gitに接続」をクリックし、任意のGitHubレポジトリを選択します。

▼手順1. Workers & Pagesをクリック

![](https://ics.media/entry/230706/images/230706-cloudflare-register.png)

▼手順3.「Pages」タブを開く、 手順4.Gitに接続

![](https://ics.media/entry/230706/images/230706-cloudflare-github.png)

GitHubとの連携ができたら、「アカウントを追加」で追加したいGitHubアカウントを選択し、デプロイしたいレポジトリを選択します。選択したら「セットアップの開始」をクリックし、遷移先の画面でビルド設定を行います。

1.  フレームワークプリセット：「Vue.js」や「Nuxt.js」などのフレームワークを選択します。フレームワークを使用しない場合はデフォルトの「None」を選択します。
2.  ビルドコマンド：「`npm run build`」などのコマンドを入力します。
3.  ビルド出力ディレクトリ：「`/dist`」など、ビルド結果が出力されるディレクトリを入力します。

▼デプロイ画面の例

![](https://ics.media/entry/230706/images/230706-cloudflare-deploy.png)

設定が終わったら、「保存してデプロイする」をクリックします。これでViteの`build`コマンドでビルドされたウェブサイトがデプロイされます！

> Node.jsのバージョンが古く、ビルドが失敗することがあります。その場合は「ビルド設定」の「環境変数」に「NODE\_VERSION」という環境変数を設定します。ここで設定したバージョンのNode.jsがビルド時に使用されます。

#### Pages Functionを追加する

通常のホスティングサービスは静的なWebサイトを配信するために用いられます。しかし、Cloudflareは静的なWebサイトのホスティングだけでなく、サーバー側での関数の実行環境も用意しています。それが『Cloudflare Workers』です。

フロントエンドの世界で「Worker」というとService WorkerやWeb Workerと混同してしまうかもしれませんが、Cloudflare Workersはサーバーサイドの処理を行う別の技術という点にはご注意ください。以降では、「Worker」はCloudflare Workersを指します。

実際のWorkerのコードを見てみましょう。たとえば次のようなWorkerは、クライアントからのリクエストを受け取るとサーバーから`Hello World!`という文字列を返します。

```
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World!');
  },
};
```

Cloudflare Workers単体でも使えますが、Cloudflare PagesにWorkersを組み込む方法があります。これを**『Pages Function』**と呼びます。Pages Functionを使うと、静的なWebサイトとサーバー側の処理を同時に行えます。

プロジェクトのルートディレクトリ直下に`/functions`ディレクトリを作成しデプロイすると、格納したjs/tsファイルは自動的にPages Functionsとして解釈されます。例として、上記のWorkerを`/functions/hello.ts`に格納しました。

-   [ソースコードを確認する（functions）](https://github.com/ics-creative/230706_cdn-vite-static/tree/main/functions)

デプロイ時に`functions`ディレクトリからWorkerが作成されていることが確認できます。また、ルート直下の`/hello`にアクセスすると「Hello, world!」という文字列が取得でき、Workerが実行されていることが確認できます。

▼デプロイ時のログ（一部）

```
19:02:43.885	Found Functions directory at /functions. Uploading.
19:02:44.572	✨ Compiled Worker successfully
```

▼取得結果

```
$ curl https://230706-cdn-vite-static.pages.dev/hello
Hello, world!   
```

次は、Pages Functionを使って、サーバー側で生成したHTMLを表示してみます。

### サーバーでHTMLを生成してみよう

動的なWebサイトの例を示します。冒頭で話したSSR（サーバーサイドレンダリング）環境を用意します。

ViteでSSRを可能にする、[『Vike』](https://vike.dev/)というプラグインを使用します。公式ドキュメントによると、[『Bati』](https://batijs.dev/)というツールで簡単に環境構築できるのでこれを使用します。

今回はVueプロジェクトをCloudflareにデプロイしたいので、「Frontend」の項目の「Vue」に、「Deployment」の項目の「Cloudflare」にそれぞれチェックを入れ、生成されたコマンドをコピーします。

![Batiによる環境構築](https://ics.media/entry/230706/images/230706_bati.png)

自身のPCの任意のディレクトリ上でコピーしたコマンドを実行し、プロジェクトを作成します。作成したプロジェクトは別途GitHubで作成したレポジトリにプッシュしておきましょう。

作成したレポジトリは前述の手順でCloudflare Pagesにデプロイします。デプロイ後、しばらくするとサイトにアクセスできるようになります。

-   [デモを別タブで再生する](https://230706-cdn-cloudflare-ssr.pages.dev/)
-   [ソースコードを確認する](https://github.com/ics-creative/230706_cdn-cloudflare-ssr)

#### プロジェクトの詳細

Cloudflare Pageで表示されているページがどこで作られているか、詳しく見ていきましょう。プロジェクトでビルドを実行すると、`dist`ディレクトリ内に以下のディレクトリが作成されます。

-   `client`ディレクトリ
-   `server`ディレクトリ
-   `cloudflare`ディレクトリ

このうち、`cloudflare`ディレクトリがCloudflare Pagesで表示される内容になります。これは`wrangler.toml`ファイルで指定されています。wranglerはコマンドライン上でCloudflareと連携するツールです。ここでビルド先や連携するCloudflare Pagesのプロジェクト名を指定します。今回は解説しませんが、気になる人は調べてみてください。

さて、[Pages Functionsのドキュメント](https://developers.cloudflare.com/pages/platform/functions/get-started/#create-a-function)によると、`_workers.js`というファイルがある場合、Pages Functionとして認識されるようです。`cloudflare`ディレクトリを確認すると`_workers.js`が作成されていることがわかります。この関数がサーバーサイドレンダリングを実行し、ブラウザにHTMLを提供しています。

デモページのネットワークタブからも、レンダリング済みのHTMLがサーバーから返却されていることが確認できました。

▼サーバーからレンダリング済みのHTMLが返却されている様子

![](https://ics.media/entry/230706/images/230706-cloudflare-ssr.png)

カウンターをクリックすると数字が増えることも確認できます。これはJavaScriptがブラウザで実行されることで行われる処理です。

対比のため、SSRしないVue.jsのプロジェクトも作成してみました。こちらはクライアントサイドレンダリングされるため、要素が`<div>`タグのみのHTMLが返却されています。

-   [デモを別タブで再生する](https://230706-cdn-vite-csr.pages.dev/)
-   [ソースコードを確認する](https://github.com/ics-creative/230706_cdn-vite-csr)

▼サーバーから空のHTMLが返却されている

![](https://ics.media/entry/230706/images/230706-cloudflare-csr.png)

クライアントサイドレンダリングはパフォーマンス面だけでなく、SEOの面でも不利です。一方、サーバーサイドレンダリングはクローラーが解析しやすいHTMLを配信するためSEOに優れており、パフォーマンスも高いためユーザー体験が向上されます。

### まとめ

今回はWebコンテンツを高速に配信する仕組みとして、SSR（サーバーサイドレンダリング）とCDN（コンテンツデリバリーネットワーク）について解説しました。

近年、フロントエンドとサーバーサイドの境域が曖昧になってきていると筆者は感じています。観測できる範囲でも、[『Astro』](https://astro.build/), [『Remix』](https://remix.run/), [『Qwik』](https://qwik.builder.io/)といった、サーバーでHTMLをレンダリングするフレームワークが勢いを増しています。さらに、Node.jsから派生したランタイムである[『Deno』](https://deno.land/)のフレームワーク[『fresh』](https://fresh.deno.dev/)はビルドも不要なまったく新しいエコシステムを形成しています。

Next.jsでも、『React Server Components』が使用されており、フロントエンド開発はサーバーでの開発に近づいていると感じます。もはやフロントエンドと呼んでいいのかもわかりません。

高速なキャッシュ配信を可能とするCDN、より軽量なアセットを配信するSSRによってこれからWebの世界は、文字通り加速していくでしょう。この進化のスピードに振り落とされないよう、我々も歩みを進めなくてはならないと感じる今日この頃です。

### 参考

-   [Cloudflare - コンテンツ配信ネットワーク（CDN）とは？| CDNの仕組みは？](https://www.cloudflare.com/ja-jp/learning/cdn/what-is-a-cdn/)
-   [Cloudflare - サーバーレスコンピューティングとは？|サーバーレス定義](https://www.cloudflare.com/ja-jp/learning/serverless/what-is-serverless/)