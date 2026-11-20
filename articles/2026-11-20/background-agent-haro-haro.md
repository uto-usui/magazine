---
title: "内製 Background Agent \"haro\" を \"haro\" の中で開発しターミナルを捨てる"
source: "https://tech.layerx.co.jp/entry/haro-in-haro"
publishedDate: "2026-11-20"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "sivchari"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://tech.layerx.co.jp/entry/haro-in-haro)

LayerX では haro という Background Coding Agent を内製しています。僕はこの haro の開発に関わっていて、「haro 自身の開発を haro の中でできるようにする」ことに取り組んできました。チームではこれを haro in haro と呼んでいます。

最初に試した構成は捨てることになり、今は [vCluster](https://github.com/loft-sh/vcluster) と [Envoy](https://github.com/envoyproxy/envoy) と [Telepresence](https://github.com/telepresenceio/telepresence) を組み合わせた構成に落ち着いています。そこに至るまでの流れをお話しします。

## haro とは

haro は LayerX のバクラク事業部で内製している Background Coding Agent です。Web UI や Slack から呼び出すと、バクラクの開発に必要なものが揃った環境がクラウド上に立ち上がり、その中で Coding Agent が動きます。haro をなぜ作ったのか、どのように使われているのかは [内製 Background Coding Agent "haro" で拓く未来の開発体験](https://tech.layerx.co.jp/entry/why-we-built-our-background-agent) に詳しく書かれているので、ぜひそちらを読んでみてください。

この記事で関係するのは、Agent が動く「環境」についてです。先ほどの記事でも触れられているとおり、haro の環境は EKS 上で動いていて、Custom Resource Definition (CRD) と Custom Controller でライフサイクルを管理しています。

具体的には、セッション 1 つ分の環境を Workspace という Custom Resource で表します。image や checkout するリポジトリ、公開するポートといった設定は WorkspaceProfile という別のリソースにまとめてあり、カスタムコントローラー (以降、コントローラー) がこの 2 つを組み合わせて Pod を作ります。この Pod を workspace と呼んでいます。

コントローラーが作るのは Pod だけではありません。workspace の中で動かしたアプリをブラウザから確認するためのプレビュー URL も、コントローラーが用意します。

つまり haro の環境側に手を入れるということは、コントローラーに手を入れるということです。

## haro を haro で開発したい

haro の画面だけなら、workspace の中で起動してプレビュー URL で開けば確認できます。ほかのバクラクのサービスを haro で開発するときも同様の開発フローになります。

難しいのは環境側です。コントローラーを変更したら、Workspace を作って Pod が Running になるところまで見たくなります。それには CRD とコントローラーが動いている Kubernetes クラスターが要ります。workspace は 1 つの Pod なので、そのままではクラスターがありません。

haro で haro を開発するには、workspace の中から使える、自分専用のクラスターをどこかに用意する必要がありました。

## 最初の検証: fjord

最初に選んだのは、workspace の Pod の中にクラスターを丸ごと立てる方法です。

haro の環境は EKS の上で動くことを前提にしています。マニフェストも、AWS の権限の受け取り方も EKS のものです。開発用のクラスターが EKS と違う挙動をすると、そこで動いたものが本番で動くとは限りません。

そこで [fjord](https://github.com/sivchari/fjord) を使いました。fjord は EKS と互換性のあるクラスターを手元に立てるためのツールで、コントロールプレーンには EKS が使っているのと同じ EKS Distro を使い、IRSA のような IAM との連携もエミュレーションします。EKS 向けのマニフェストをそのまま apply できるので、workspace の Pod の中にこれを立てれば、haro のコンポーネントを手を加えずに動かせると考えました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/sivchari/20261119/20261119140921.png)

fjord を使用した構成

動くところまでは行きました。ただ、Pod の中で Kubernetes を動かすために必要な前提が多く、実機で試すたびにエラーを踏みました。

たとえば、Kubernetes は API server の接続先を `KUBERNETES_*` という環境変数で Pod に渡します。workspace も Pod なので、外側のクラスターの接続先を持っています。これを引き継いだまま中のクラスターを起動すると、中の controller-manager が外側の API server に接続しに行ってしまい、起動しません。

1 つずつ対処していきましたが、fjord をやめる決め手になったのは image の pull でした。本物の EKS では、ノードに付いている IAM role の権限で ECR から image を pull できます。Pod 側では何も設定しなくて済みます。ところが Pod の中に立てたクラスターには、その IAM role を持ったノードがありません。そのため、ECR の認証情報を secret として自分で作り、中のクラスターに配る必要がありました。同様にこの問題も個別に直すことはできます。しかし、この時点で複数の問題が起きていることや本物のクラスターなら最初から揃っているものを再現し続ける構成そのものに無理があると判断しました。

## vCluster を用いてクラスターの中で仮想クラスターを作成する

そこで発想を変え、クラスターを workspace の中に作るのをやめました。代わりに、haro が動いている実際のクラスターの上に [vCluster](https://www.vcluster.com/) で仮想的なクラスターを立てます。

vCluster はある Namespace の中に Kubernetes のコントロールプレーンだけを立てる仕組みです。CRD もコントローラーもその仮想クラスターの中に閉じるので、ほかの人の環境には影響しません。一方で、仮想クラスターの中に作った Pod は syncer によって実際のノードにスケジュールされます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/sivchari/20261119/20261119140928.png)

vCluster と Telepresence を使用した構成

これで fjord の問題がまとめて消えました。Pod は本物のノードで動くので、ECR からの pull はノードの IAM role で済みます。

### 自分の vCluster は自分で作る

vCluster はセッションごとに 1 つ、workspace 自身が自分の Namespace に作ります。ステップもシンプルで、vCluster を apply し、コントロールプレーンの起動を待ち、その中に CRD とコントローラーと WorkspaceProfile を入れて、最後に haro のアプリケーションを起動します。

workspace が自分で vCluster を作るには、そのための権限が要ります。ここはコントローラーに持たせました。WorkspaceProfile の `vclusterAdmin` が有効なら、コントローラーが workspace の ServiceAccount に対して Namespace 限定の Role と RoleBinding を作ります。

この Role の中身を決めるときに、Kubernetes の RBAC の制約に当たりました。Kubernetes では、Role を作る人は、その Role に書かれた権限を自分でもすべて持っていなければなりません。持っていない権限を他人に配れてしまうと、権限をいくらでも広げられるからです。vCluster の Helm Chart には、vCluster 自身が使う Role が含まれています。workspace が Chart を apply するということは、workspace がこの Role を作るということです。つまり workspace は、Chart の Role に書かれた権限をすべて持っている必要があります。コントローラーが workspace に渡す Role は、Chart の Role の権限を全部含むように書きました。この 2 つの Role は、コントローラーのコードと vCluster の Chart という別々の場所にあります。Chart を更新して Role の権限が増えたら、コントローラー側も合わせて直さないと apply が失敗します。この依存が残っているのは今後別の問題として解決する予定です。

### 後片付けは Kubernetes に任せる

セッションごとに vCluster を作るなら、消し忘れが積もらないようにしなければなりません。ここは Kubernetes の GC に任せることで解決できます。

vCluster を構成するリソースすべてに、自分の Workspace への ownerReference を付けます。セッションが終わって Workspace が削除されると、vCluster の StatefulSet も Secret も Role も連鎖して消えます。中で動いていたコントローラーや workspace も同様に無くなります。

ここにも 1 つ落とし穴がありました。vCluster で実ノードの情報を同期する設定を有効にすると、Chart が ClusterRole と ClusterRoleBinding を作ります。cluster-scoped なリソースは Namespaced なリソースを owner にできないので、この 2 つだけが GC から漏れて残り続けます。Pod のスケジューリングは外側のスケジューラが行うので、ノードの同期は切っても配置は変わりません。同期を切って、Chart が作るものをすべて Namespaced に保つことにしました。

## Envoy でプレビューを既存の経路に載せる

クラスターが用意できても、中で動かした haro をブラウザで開けなければ確認になりません。

ここは新しい仕組みを足さずに済みました。haro のコンソールは vCluster の中の Pod としては動かさず、外側の workspace の上でプロセスとして起動します。接続先の Kubernetes だけを vCluster に向けます。

workspace には、もともとプレビューのための経路があります。Pod の中に Envoy のサイドカーがいて、WorkspaceProfile に宣言されたポートへの通信を受けます。その手前には Envoy Gateway があり、コントローラーが Workspace ごとに HTTPRoute を作ります。haro のコンソールも workspace 上のプロセスなので、開発中の haro もほかのサービスと同じこの経路に載ります。

プレビュー URL を開くと、workspace の中で動いている開発中の haro が表示されます。そこで新しいセッションを作ると、vCluster の中のコントローラーが Workspace を reconcile し、実ノードの上に Pod が立ちます。

## Telepresence でコントローラーだけ手元のコードに差し替える

残るのはコントローラー自身の開発です。vCluster の中のコントローラーは image として動いているので、コードを直すたびに image を build して入れ替えるのでは時間がかかります。

ここは [Telepresence](https://telepresence.io/) を使いました。vCluster の中で動いているコントローラーを止めて、workspace 上で動作するコントローラーに置き換えます。

置き換えるために Telepresence の replace を使用します。Telepresence でよく知られているのは intercept です。こちらはクラスターの中の Pod を動かしたまま、その Pod に届く通信だけを手元のプロセスに引き込みます。リクエストを受けて動く API サーバーのようなものを手元で試すには、これで足ります。しかしコントローラーはリクエストを受けて動くものではありません。自分から Kubernetes の API サーバーを監視し、リソースの変化を見つけてリコンサイルします。intercept では中のコントローラーが動いたままなので、同じリソースを中のコントローラーと手元のコントローラーの両方がリコンサイルしてしまいます。手元のコードの挙動を確かめたいのに、古いコードで動く中のコントローラーとの競合が発生します。replace はクラスターの中のコンテナを止めて、手元のプロセスに置き換えます。リコンサイルするのは手元のコントローラーだけになります。

## まとめ

haro in haro は workspace の中にクラスターを作るところから始めて、実クラスターの中に vCluster で仮想クラスターを作る形に落ち着きました。fjord での検証は遠回りでしたが、Pod の中でクラスターを動かすと何が足りなくなるのかを一通り踏んだおかげで、vCluster に何を期待すればよいかがはっきりしました。

振り返ると、今回新しく作ったものは多くありません。クラスターは vCluster に、プレビューの経路は Envoy に、コントローラーの差し替えは Telepresence に、後片付けは Kubernetes の GC に任せています。僕がやったのは、それぞれが得意なことを見極めてつなぎ合わせることでした。Kubernetes を取り巻くエコシステムは日々成長しています。一見複雑に見える要件でも、すでにあるものを掛け合わせればシンプルに解決できる。haro in haro を作りながら、そのことを改めて実感しました。

こうして haro 自身の開発も、haro の中で完結するようになりました。先の記事 ([https://tech.layerx.co.jp/entry/why-we-built-our-background-agent](https://tech.layerx.co.jp/entry/why-we-built-our-background-agent)) にある「ループを勝手に閉じる基盤」に向けて、まずは haro 自身が、自分の開発のループを閉じられるようになりました。これからも haro 自身を使いながら、haro を良くしていきたいと思います。

LayerX で、haro と新しい開発の未来を一緒に作る方をお待ちしています！

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/113198)

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/81843)

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/52741)