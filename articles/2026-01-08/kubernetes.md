---
title: "Kubernetes環境におけるパケットキャプチャ"
source: "https://engineering.mercari.com/blog/entry/20251218-capturing-network-packets-in-kubernetes/"
publishedDate: "2025-12-18"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリのPlatform Network team/SREの[@mshibuya](https://x.com/m4buya)です。  
この記事は、[Mercari Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-mercari-advent-calendar-2025/)の18日目の記事です。

年の瀬って忙しくなりがちですよね。ただでさえ忙しいのに、Advent Calendar記事執筆の予定まで入れてしまい、半泣きでこの記事を書いています。いや、こうなるのはわかってはいたんですが、一年を振り返ってアウトプットの少なさに焦ってしまうとやはり記事執筆に名乗りをあげてしまうのですよね…。

さて、今回はKubernetes環境におけるネットワークのパケットキャプチャの話をします。筆者は現在前述の通り[Network team](https://engineering.mercari.com/blog/entry/20220209-introduction-of-the-network-team/)に所属しており、そこではメルカリのプロダクト開発を支える様々なPlatformとしてのコンポーネント群のうち、ネットワークに関わるものを中心に扱っています。

メルカリでは数百を超える規模のマイクロサービスが稼働しており、そのサービス内外におけるネットワークコミュニケーションも複雑多岐にわたります。Network teamはその性質上、そういった環境で発生したネットワークに起因すると思われる不具合・問題の調査を依頼されることが多くあります。もちろん単純な設定不備などが原因の場合もありますが、問題が複雑で解決の糸口がなかなか見出せないような局面において、深い分析を行う手段を必要としていました。そこでパケットキャプチャが登場します。

こういった問題調査のための手法は、それ自身の実行手順が明確になっていなければいざ問題が発生した際に役立てることはできません。緊急度の高い障害が発生しているような状況下であればなおさらでしょう。今回確立したこの手法は、みなさまの環境においてそのまま適用可能とは限りませんが、それでも安定して実行できる調査手順を紹介しておくことは、みなさまがご自身の組織で同様の手順を作る際にも役立つであろうと考えたのがこの記事を公開する狙いです。

## なぜKubernetesでのパケットキャプチャは難しいのか

みなさまご存知の通り、KubernetesはハードウェアやOSといった様々なレイヤにおいて抽象化を提供しており、それによって開発者が生のリソースに煩わされることなくワークロードを実行可能な環境を提供しています。セキュリティ上、一般には利用者である開発者は生のノードにはアクセスできないようになっており、またその上で動くPodのようなワークロードもMulti-tenancyとして互いに隔離されています。そのため、昔のように単純にサーバ上でtcpdumpを叩けばおっけー、とはいかないわけですね。

また、Service Meshにまつわる難しさもあります。メルカリではIstioを導入していますが、クラスタ内の通信は基本的にmTLSによって暗号化されているため、そのままでは通信の中身を見ることができません。この点を考慮した手法を確立する必要があります。

こうしたKubernetesクラスタを含め、開発者が機能を簡単に素早くデリバリーするために必要な道具立て一式を提供しているのが我々Platformとしての立ち位置です。このようなネットワークにおける深いトラブルシューティングの必要性がいつ生じるかは予想できません。特別なPlatform特有の権限によることなく、必要であれば開発者がセルフサービスによってこのような調査を行えることも大事な要件としました。

## Ephemeral Containersを活用したPodレベルでのキャプチャ

前述の条件を満たす手法として我々が確立したのが、Kubernetesの機能である[Ephemeral Containers](https://kubernetes.io/docs/concepts/workloads/pods/ephemeral-containers/)を活用した手法です。

Ephemeral Containers（エフェメラルコンテナ）は、Kubernetes v1.25でGAとなった機能です。ノード全体へのアクセス権限を持つことなく、実行中のPodのネットワーク名前空間などの共有リソース内に、一時的なデバッグ用コンテナを「外付け」する形でアタッチできます。これにより、tcpdumpなどのデバッグツールをアプリケーションコンテナ内に含める必要なくトラブルシューティングを行えるため、このようなパケットキャプチャに用いるにはうってつけです。NodeやCluster全体への特別な権限を必要としない点も大きなメリットで、Platformメンバーも開発者も同じ方法によって調査を行うことができます。

具体的な手順としては、下記のようになります。

### Step 1. 必要な権限の取得

メルカリでは、[Carrier](https://engineering.mercari.com/en/blog/entry/20220201-promote-zero-touch-production-further-features-of-carrier/)と呼ばれる一時的な権限取得を可能にする内製ツールによって、通常時は本番環境に対する操作権限を持たないZero Touch Productionを実現しています。  
このため、本番環境における問題調査においてパケットキャプチャを実施する際には、対象となるPodに対する操作権限を持つRoleをまず取得する必要があります。

上記Roleには、Ephemeral Containersに対する操作を行うために必要なpermissionを事前に付与しておきます。

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: example-role
rules:
# ...
- apiGroups: [""]
  resources: ["pods/ephemeralcontainers"]
  verbs: ["create", "delete", "deletecollection", "patch", "update"]
```

### Step 2. Ephemeral Containerの起動

権限が得られたら、対象となるPodに対してEphemeral Containerをアタッチします。ここではパケットキャプチャも含む、ネットワーク全般のトラブルシューティングに対応したリッチなツールセットがインストール済みのnetshootを用いています。

```
kubectl debug -it -n <your-namespace> <target-pod> \
  --image=nicolaka/netshoot \
  --custom=./root.yaml --container=netshoot-debug
```

ここで、ファイル `./root.yaml` には事前に以下の内容を準備しておきます。

```
securityContext:
  runAsUser: 0
  runAsNonRoot: false
```

これにより、コンテナ内でtcpdumpを実行するための必要条件である「rootとしてnetshootコンテナを実行する」を実現します。大して長い内容ではないので、本当はコマンドラインにインラインで書いてしまいたいのですが、今のところkubectl debugの引数としてはファイルを渡すことしかできないようです…。

### Step 3. キャプチャの実施

無事にnetshootコンテナのシェルが開いたら、キャプチャをスタートできます。ここではファイル `/tmp/capture.pcap` に書き込んでいます。

```
tcpdump -i any -w /tmp/capture.pcap
```

Istioが有効化された環境化においては、この `-i any` がポイントとなります。トラフィックは eth0 だけでなく、iptablesによってリダイレクトされた仮想インターフェースをも通るため、これらを取りこぼさないように全インターフェースを対象にしています。eth0のみをキャプチャすると、mTLSによって暗号化済みの内容しか取れないため、調査の目的に対し不足することが多いでしょう。

単純に全トラフィックをキャプチャするとデータが膨大となってしまい得ます。ここでは詳細は触れませんが、tcpdumpのオプションによってキャプチャするパケットをフィルタできるため、調査しようとしている問題に関係するパケットにできるだけ絞り込んでキャプチャするとその後の調査が楽です。もちろん、絞り込みすぎると「必要なデータが取れてなかった」というトレードオフになります。

### Step 4. ファイルの回収

上記によってEphemeral Containerにファイルが作成されるので、ローカルよりkubectl cpでダウンロードすれば完了です。Step 2でつけたコンテナ名を指定するのをお忘れなく。  
これでキャプチャしたデータの分析に移れます。

```
kubectl cp -n <your-namespace> <target-pod>:/tmp/capture.pcap ./capture.pcap -c netshoot-debug
```

慣れてきたら、Step 2-4までをワンラインで行ってしまってもいいでしょう。このような見た目になります。余計な出力がファイルに混入しないよう `-iq` を使い、また標準エラー出力を捨てています。 `-G 10` でキャプチャを行う秒数を指定しています。

```
kubectl -n <your-namespace> debug <target-pod> -iq --image=nicolaka/netshoot --custom=./root.yaml -- bash -c 'tcpdump -i any -G 10 -W 1 -s0 -w - 2>/dev/null' > tcpdump.pcap
```

## Nodeレベルでのキャプチャ

上記Podレベルでのキャプチャ方法とは別に、GKE NodeにSSHし[CoreOS Toolbox](https://docs.cloud.google.com/container-optimized-os/docs/how-to/toolbox)を用いてパケットキャプチャを行う手順も整備済みです。が、Nodeに対しSSHを行える権限を持つ必要があること、また前述のようにIstioのトラフィックは暗号化されたものしか取得できないこともあり、あくまで補助的な位置づけです。主にPlatformメンバーがNodeレベルでしか観測できないようなトラブルシューティングに用いることを想定しています。

### Step 1. 必要な権限の取得

メルカリではKubernetesクラスタをGoogle Kubernetes Engineによって構築・運用しています。まず、GKEノードにSSHするために必要な権限を、前掲のCarrierを用いて取得する必要があります。該当プロジェクトに対し下記の権限があれば十分なはずです。

-   `roles/compute.instanceAdmin.v1`
-   `roles/iam.serviceAccountUser`
-   `roles/iap.tunnelResourceAccessor`

### Step 2. Nodeの特定

kubectl get podコマンドで、対象Podがホストされているノード名を確認します。

```
$ kubectl get pod -n <your-namespace> your-app-pod-7f5b7f7d9f-abcde -o wide
NAME                           READY   STATUS    RESTARTS   AGE    IP           NODE                                NOMINATED NODE   READINESS GATES
your-app-pod-7f5b7f7d9f-abcde   2/2     Running   0          2d1h   10.1.2.3     gke-cluster-1-node-pool-1-a1b2c3d4   <none>           <none>
```

### Step 3. toolbox環境に入る

`gcloud compute ssh` を使用してノードにSSHし、`toolbox` コマンドで、デバッグツールが揃ったシェル環境に入ります。

```
gcloud compute ssh --project <your-project> gke-cluster-1-node-pool-1-a1b2c3d4
```

```
# On the GKE node
$ toolbox
```

### Step 4. キャプチャの実施

toolboxシェル内でtcpdumpを実行します。ホストのルートファイルシステムは `/media/root` にマウントされているため、キャプチャファイルはノードの `/tmp` に相当する `/media/root/tmp/` に保存します。`-i any` で全インターフェースからキャプチャを行うことを指定し、フィルタとしてStep 2で確認したPodのIPアドレスを指定します。

```
# Inside the toolbox shell
$ tcpdump -i any -w /media/root/tmp/node_capture.pcap host 10.1.2.3
```

### Step 5. ファイルの回収

`toolbox` シェル (`exit`)、SSHセッション (`exit`) の順で終了し、ローカルマシンからgcloud compute scpでファイルを手元にコピーします。

```
gcloud compute scp --project <your-project> gke-cluster-1-node-pool-1-a1b2c3d4:/tmp/node_capture.pcap ./node_capture.pcap
```

こちらのNodeレベルでのキャプチャはまだ実際の調査で利用した実績はありませんが、こうして手順として整備しておけばいざ問題が発生した際も落ち着いて調査に入れます。

## まとめ

この記事では、メルカリにおけるKubernetesパケットキャプチャのプラクティスについて紹介しました。 とりわけPodレベルにおいては、Ephemeral Containersを活用することで、セキュリティと利便性のバランスを取りながら開発者が自身でトラブルシューティングを行える手順を整えています。

Podレベル (Ephemeral Containers)

Nodeレベル (Toolbox)

**主な用途**

アプリケーション固有の問題調査、mTLS化された通信内容の確認

Node全体に関わるネットワーク問題（CNI、iptablesルールなど）の調査

**必要な権限**

比較的低い (Podレベルの権限)

高い (NodeへのSSHアクセス権限)

**Istio環境でのトラフィックの可視性**

暗号化前の平文トラフィックをキャプチャ可能

暗号化後のトラフィックしかキャプチャできない

**対象の絞り込みやすさ**

調査対象のPodに直接アタッチするため、トラフィックの特定が容易

複数Podが稼働するため、対象Podのトラフィックを分離するのが比較的困難

**推奨される利用者**

アプリケーション開発者、SRE

Platformチーム、SRE

**セルフサービスへの親和性**

高い (開発者が自身で調査可能)

低い (強い権限が必要なため限定的)

今回ご紹介した内容をさらに発展・一般化したお話を来年3月開催の[SRECon26 Americas](https://www.usenix.org/conference/srecon26americas)において「It’s Not Always the Network (But Here’s How to Prove It): Kubernetes Packet Capture for SREs」というタイトルで発表予定です。いや、まだ実感がないというか信じられないのですが、ProposalがAcceptされたという連絡はいただいたので、登壇しにシアトルに行ってくると思います…。

パケットキャプチャを行った次のステップとしては、実際にキャプチャしたデータを分析するフェーズが待っています。紙面の都合上、また筆者がその分野ではまだまだ修行中ということもあり今回は触れませんでしたが、今後またなんらかの知見を共有していけたらと思います。

最後までお読みいただきありがとうございました。明日の記事はamenboさん・siroken3さんによる「AI-Native開発を加速する AWS Kiro の導入と、Okta を活用したアカウント管理の自動化」となります！引き続きお楽しみくださいー