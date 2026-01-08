---
title: "LLM Key ServerによるLLM APIへの安全で便利なアクセス提供"
source: "https://engineering.mercari.com/blog/entry/20251202-llm-key-server/"
publishedDate: "2025-12-02"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリのAI Securityエンジニアの[@hi120ki](https://twitter.com/hi120ki)です。  
この記事は、[Mercari Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-mercari-advent-calendar-2025/) の2日目の記事です。

メルカリでは社内でのAI/LLM活用の拡大を目指し、様々な取り組みが行われています。これらの動きを後押しするために[AI Securityチーム](https://careers.mercari.com/mercan/articles/55843/)はLLM APIへのアクセスを安全でありながら便利に提供するためのサービスLLM Key Serverを開発しました。

これによりLLM APIへのアクセス申請を受け担当者が手作業でユーザーを登録していたプロセスがLLM Key Serverによって置き換えられ、LLM APIユーザーは申請の手間なく自身の社内アカウント経由で有効期限付きのLLM APIキーを取得できるようになりました。

また、GitHub ActionsやGoogle Apps Script上でLLM APIを利用するための共通テンプレートも提供し、ローカル環境のみならずCIやクラウドやノーコードツール等の複数のサービス上でのLLM利用促進にも貢献しました。

本記事ではLLM APIにおけるセキュリティ課題・プロセスの改善・LLM Key Serverのアーキテクチャ・実装におけるポイントについて解説します。

## LLM APIにおけるセキュリティ課題

現在様々なLLMが各社から展開されており、メルカリでは複数のLLMをタスクごとの要求や従業員の好みごとに使い分けています。しかし、LLMへのアクセスを提供するAPIには多くの場合APIキーが必要となっています。

主要なLLMベンダーが提供するAPIへのアクセスに使われるAPIキーは、有効期限がなく、流出しそれが検知されなかった場合、長い期間にわたって情報漏洩・経済的損失を受ける恐れがあります。さらに現在のAI/LLM活用の流れの中で、多くのAPIキーが発行されており、管理があいまいになってしまうことも懸念されています。また、複数社のLLMを利用する中でユーザー・チーム・権限管理が複雑になることが想定されます。このような複雑な管理体制は定期的なアクセス権の監査を難しくします。

もちろんAPIキーを用いずWorkload Identityおよびクラウド間連携を用いてGoogle CloudやAzure経由でLLM APIにアクセスする方法が最も安全であり、推奨される方法として社内で提示しています。しかし一方で、設定の複雑さや、様々な外部のAI/LLMプロダクトがそれらをサポートせずリリースされることもあり、多くのLLM関連ツールを評価している状況下では別の方法が求められていました。

また追加の要件として、セキュリティポリシーによって煩雑なフローを強制することはかえってポリシーの逸脱を助長しかねないため、安全性を保ちながら利便性も追求することが必要でした。

## 安全かつ便利なLLM APIへのアクセス提供

安全かつ便利なLLM APIへのアクセス手段を提供するため、複数のモデルを一つのAPIから利用可能にするOSSの[LiteLLM](https://www.litellm.ai/)と、Google WorkspaceおよびGoogle Cloudの[OIDC IDトークン発行機能](https://cloud.google.com/docs/authentication/get-id-token)を用いることにしました。

LiteLLMは様々なモデルプロバイダーから提供されるLLMを一つのAPIから利用可能にするOSSで、基本的なLLM API呼び出しの他にClaude CodeなどのCoding Agentツールにも対応しています。

また、OIDC IDトークン発行機能はGoogleのOAuthやサービスアカウントの権限を利用することでGoogleによって署名されたIDトークンを取得できるというもので、これを利用することでユーザーの身元を確認することができます。

メルカリでは[Google CloudからGitHubへのアクセスを有効期限が短い認証情報へ切り替えるためのToken Server](https://engineering.mercari.com/blog/entry/20241203-token-server-google-cloud/)を運用していますが、LLM Key ServerはこのアーキテクチャをベースにLLMへのアクセスへと発展させたものになります。

### LLM Key Serverのアーキテクチャ

LLM Key Serverの認証フローは以下のようになっています。

![](https://storage.googleapis.com/prd-engineering-asset/2025/12/287533cf-llmkeyserver.png)

LLM Key Serverの認証フロー

まず、Claude Codeを利用したいユーザーやLLMを利用したいアプリケーションは、GoogleのAPIから自身を証明するためのOIDC IDトークンを取得します。ここではGoogle Workspaceアカウントによる認証や、Compute metadataサーバーからのサービスアカウント認証などが利用されます。

次に、取得したOIDC IDトークンをLLM Key Serverに送信すると、LLM Key Serverはトークンの署名を検証し、トークン内の情報をもとにLiteLLMへアクセスするための一時的なAPIキーを発行します。このAPIキーは有効期限が短く設定されており、ユーザーはこのキーを用いてLiteLLM経由で様々なLLMへアクセスすることができます。

ローカル環境での利用においてGoogle Workspaceアカウントによる認証を利用する際は、社内公開のCLIツールを利用することで1つのコマンドでOAuth認可フローを開始し、OIDC IDトークンの取得からLLM APIキーの取得までを行うことができます。

またAPIキーはサービスアカウントに対しては1時間という短い有効期限が設定されています。しかし、クラウド上で動作しLLMを利用するアプリケーションが長時間動作することを想定し、自動的にキーを更新する仕組みも提供しています。これはGo言語のライブラリとして整備されており、自動的にキーの更新を行い、継続してLLM APIを利用することができます。

このようにしてGoogle Workspaceアカウントによる認証やGoogle Cloud上のサービスアカウント認証を利用することで、安全にLLM APIへのアクセスを提供しつつ、有効期限付きのキーを発行することで情報漏洩リスクを低減し、さらに自動更新ライブラリを提供することで利便性も確保しました。

## LLM Key Serverの利用形態の拡張

LLM Key Serverはローカル環境やクラウド上で動作するアプリケーションの利用だけでなく、様々な社内ツールやサービス上での利用も想定しています。特に以下の2つの形態での利用をサポートしています。

### GitHub Actions

GitHub Actions上でLLM APIを利用するための共通テンプレートを提供しています。GitHub Actions上では[GitHubから提供されるOIDC IDトークン](https://docs.github.com/en/actions/concepts/security/openid-connect)を用いてLLM Key ServerからLLM APIキーを取得し、LiteLLM経由で様々なLLMへアクセスすることができます。これにより、CI/CDパイプライン上でのLLM活用が促進されており、Claude Codeを用いたコードレビューが自動化されたりしています。

```
- name: Get LiteLLM Key
  id: litellm
  uses: actions/github-script@60a0d83039c74a4aee543508d2ffcb1c3799cdea # v7.0.1
  with:
    script: |
      const oidc_request_token = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
      const oidc_request_url = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
      const oidc_resp = await fetch(`${oidc_request_url}&audience=https://key-server.example.com`, {
        headers: {Authorization: `bearer ${oidc_request_token}`},
      });
      const oidc_token = (await oidc_resp.json()).value;
      if (!oidc_token) {
        core.setFailed('Failed to retrieve OIDC token from GitHub Actions');
      }

      const res = await fetch('https://key-server.example.com/llm-key', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${oidc_token}`,
          'Content-Type': 'application/json',
        }
      });
      if (res.status !== 200) {
        core.setFailed(`LiteLLM API Error: HTTP ${res.status}`);
      }
      const body = await res.json();
      core.setSecret(body.key);
      core.setOutput('token', body.key);
```

このようなGitHub Actionsのactionを用意することで、開発者が直接LLM APIキーを管理することなく、CI/CDパイプライン上で安全にLLM APIを利用できるようになりました。

### Google Apps Script

Google Apps Script上でもLLM APIを利用するための共通テンプレートを提供しています。Google Apps Script上では[OAuth scope設定](https://developers.google.com/apps-script/concepts/scopes)を用いてユーザーの認証を行い、OIDC IDトークンを取得することができます。

Google Apps Scriptの設定ページから`appsscript.json`ファイルを表示するようにした後、以下のようにOAuth scopeを追加します。

```
  "oauthScopes": [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/script.external_request"
  ],
```

その後、Google Apps Script上で以下のようにOIDC IDトークンを取得し、LLM Key ServerからLLM APIキーを取得し、LiteLLM経由で様々なLLMへアクセスすることができます。

```
function getLLMToken() {
  try {
    const cache = CacheService.getUserCache();
    const cacheKey = "llm_token";
    const cachedToken = cache.get(cacheKey);
    if (cachedToken) {
      return cachedToken;
    }
    console.log("[+] Fetching new LLM token");
    const token = ScriptApp.getIdentityToken();
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = UrlFetchApp.fetch(
      "https://key-server.example.com/llm-key",
      options,
    );
    const statusCode = response.getResponseCode();
    if (statusCode !== 200) {
      throw new Error(
        `HTTP request failed with status ${statusCode}: ${response.getContentText()}`,
      );
    }
    const responseText = response.getContentText();
    const responseData = JSON.parse(responseText);
    if (!responseData.key) {
      throw new Error("Key not found in response");
    }
    cache.put(cacheKey, responseData.key, 50 * 60); // Cache for 50 minutes
    return responseData.key;
  } catch (e) {
    console.error("Error getting LLM token: " + e.toString());
    return null;
  }
}
```

OIDCのIDトークンを検証する際には、ユーザーのメールアドレスだけでなく、Apps Scriptのバックエンドとして動作しているGoogle Cloudプロジェクトが、Google Cloud組織内の`system-gsuite/apps-script`フォルダに所属しているかどうかも確認しています。  
これにより、信頼できるスクリプトからのアクセスのみを許可するようにしています。

これによりノーコードツール上での平文でのLLM APIキーの管理を避け、安全にLLM APIを利用することができます。

この仕組みにより社内でのLLM活用が促進されており、社内ドキュメントの要約や翻訳などに利用されています。

## さいごに

組織としてLLM APIキーを安全に扱うための仕組みとしてLLM Key Serverを開発しました。これにより安全性と利便性の両立を実現し、社内でのLLM活用をポジティブにSecurityチームから促進することができました。今後もAI Securityチームは安全で便利なAI/LLM活用のための取り組みを続けていきます。

このようなメルカリでのAI/LLM活用やセキュリティに関する取り組みに興味がある方は、ぜひ[メルカリの採用ページ](https://careers.mercari.com/)をご覧ください。

明日の記事は@Jazzさんです。引き続きお楽しみください。