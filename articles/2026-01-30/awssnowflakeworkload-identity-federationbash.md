---
title: "AWS→SnowflakeのWorkload Identity FederationをBashで実装して低レベルな処理を理解するの巻"
source: "https://tech.layerx.co.jp/entry/snowflake-wif-for-aws-bash"
publishedDate: "2025-12-05"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20251205/20251205195437.png) この記事は、LayerX Tech Advent Calendar 2025 の 5日目の記事です。 [tech.layerx.co.jp](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025)

こんにちは。バクラク事業部 BizOps部 データグループの[@civitaspo](https://twitter.com/Civitaspo)です。

先日、SnowflakeでWorkload Identity Federation機能がリリースされました。Workload Identity Federation機能は、Amazon Web Services（以下、AWS）やGoogle Cloud、Microsoft Azureなどのクラウドプロバイダー上のワークロードが持つIdentityを使ってSnowflakeと[OpenID Connect（以下、OIDC）](https://openid.net/developers/how-connect-works/)を使った認証を行える機能です。

[docs.snowflake.com](https://docs.snowflake.com/en/release-notes/2025/other/2025-08-14-wif) [docs.snowflake.com](https://docs.snowflake.com/en/user-guide/workload-identity-federation)

このWorkload Identity Federation機能は、上記に挙げたクラウドプロバイダーだけでなく、Snowflake が定義する形式の OIDC attestationを発行できるカスタム OIDC プロバイダーを利用することもできます。なお、Snowflake が認識するOIDC attestationの正式な仕様（JWT claim や署名方式など）は公開されていません。そのため、カスタム OIDC プロバイダーを使う場合は、実際に手を動かして Snowflake が accept するトークンを試行錯誤で探す必要があります。

現実的には、非常に難易度の高い話なのでSnowflakeが提供するSDKやCLIがサポートするカスタム OIDC プロバイダーのみが利用可能と考えるのが良いでしょう。2025/12/05 時点ではカスタム OIDC プロバイダーとしてGitHub Actionsのサポートは確認しています。

[github.com](https://github.com/snowflakedb/snowflake-cli-action)

今回の記事では、このWorkload Identity Federation機能を低レイヤーから理解するため、AWSからSnowflakeへWorkload Identity Federationを使って認証し、セッショントークンを取得するところまでをBashで実装してみようと思います。

## 最初に結論から

「最初に結論から」と言うには非常に暴力的ですが、Bashスクリプトを貼り付けます。以下のBashスクリプトを実行すると、AWS上の特定のロールへAssume Roleを行なったあと、Snowflake Workload Identity Federationを用いて認証を行い、セッショントークンを取得できます。

set \-eo pipefail

usage() {
    cat <<EOF
Usage: $0 \[options\]

Options:
  --aws-role-arn <AWS\_ROLE\_ARN>:              AWS Role ARN to assume
  --aws-region <AWS\_REGION>:                  AWS Region
  --snowflake-account-identifier:             Snowflake Account Identifier (<organization name>-<account name>)
  --snowflake-username:                       Snowflake Username
  -h, --help:                                 Show this help message and exit

EOF
}

while \[\[ $# \-gt 0 \]\]; do
    case $1 in
        --aws-role-arn)
            aws\_role\_arn\="${2}"
            shift 2
            ;;
        --aws-region)
            aws\_region\="${2}"
            shift 2
            ;;
        --snowflake-account-identifier)
            snowflake\_account\_identifier\="${2}"
            shift 2
            ;;
        --snowflake-username)
            snowflake\_username\="${2}"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -\*|--\*)
            echo "\[ERROR\] Unknown option: ${1}"
            usage
            exit 1
            ;;
        \*)
            echo "\[ERROR\] Unknown argument: ${1}"
            usage
            exit 1
            ;;
    esac
done

for v in aws\_role\_arn aws\_region snowflake\_account\_identifier snowflake\_username; do
    if \[\[ \-z "${!v}" \]\]; then
        echo "\[ERROR\] '--${v//\_/\-}' option is not defined." \>&2
        exit 1
    fi
done
if \[\[ ! "$aws\_role\_arn" \=~ ^arn:aws:iam::\[0-9\]+:role/ \]\]; then
    echo "\[ERROR\] Invalid aws\_role\_arn: $aws\_role\_arn" \>&2
    exit 1
fi
if \[\[ ! "$aws\_region" \=~ ^\[a-z\]{2}-\[a-z\]+-\[0-9\]+$ \]\]; then
    echo "\[ERROR\] Invalid aws\_region: $aws\_region" \>&2
    exit 1
fi

for cmd in curl jq date aws openssl xxd; do
  if ! command \-v $cmd &> /dev/null; then
    echo "$cmd command not found"
    exit 1
  fi
done

readonly AWS\_ROLE\_ARN\="$aws\_role\_arn"
readonly AWS\_REGION\="$aws\_region"
readonly SESSION\_NAME\="snowflake-wif-access-$(date +%s)"
readonly CREDENTIALS\=$(aws sts assume-role --role-arn $AWS\_ROLE\_ARN --role-session-name $SESSION\_NAME --region $AWS\_REGION --output json)
readonly AWS\_ACCESS\_KEY\_ID\=$(echo $CREDENTIALS | jq -r '.Credentials.AccessKeyId')
readonly AWS\_SECRET\_ACCESS\_KEY\=$(echo $CREDENTIALS | jq -r '.Credentials.SecretAccessKey')
readonly AWS\_SESSION\_TOKEN\=$(echo $CREDENTIALS | jq -r '.Credentials.SessionToken')

readonly X\_AMZ\_DATE\=$(TZ\=UTC date +"%Y%m%dT%H%M%SZ")
readonly X\_AMZ\_DATE\_SHORT\=$(echo $X\_AMZ\_DATE | cut -c 1-8) 
readonly CANONICAL\_REQUEST\_HOST\="sts.${AWS\_REGION}.amazonaws.com"
readonly CANONICAL\_REQUEST\_METHOD\="POST"
readonly CANONICAL\_REQUEST\_URI\="/"
readonly CANONICAL\_REQUEST\_QUERY\="Action=GetCallerIdentity&Version=2011-06-15"
readonly SNOWFLAKE\_AUDIENCE\_HEADER\_KEY\="x-snowflake-audience"
readonly SNOWFLAKE\_AUDIENCE\_HEADER\_VALUE\="snowflakecomputing.com"
readonly SIGNED\_HEADERS\="host;x-amz-date;x-amz-security-token;${SNOWFLAKE\_AUDIENCE\_HEADER\_KEY}"
readonly CANONICAL\_REQUEST\_HEADERS\="\\
host:${CANONICAL\_REQUEST\_HOST}
x-amz-date:${X\_AMZ\_DATE}
x-amz-security-token:${AWS\_SESSION\_TOKEN}
x-snowflake-audience:${SNOWFLAKE\_AUDIENCE\_HEADER\_VALUE}
"
readonly EMPTY\_PAYLOAD\_HASH\=$(printf "" | openssl dgst -binary -sha256 | xxd -p -c 256)
readonly CANONICAL\_REQUEST\="\\
${CANONICAL\_REQUEST\_METHOD}
${CANONICAL\_REQUEST\_URI}
${CANONICAL\_REQUEST\_QUERY}
${CANONICAL\_REQUEST\_HEADERS}
${SIGNED\_HEADERS}
${EMPTY\_PAYLOAD\_HASH}"
readonly CANONICAL\_REQUEST\_HASH\=$(printf "$CANONICAL\_REQUEST" | openssl dgst -binary -sha256 | xxd -p -c 256)
readonly STRING\_TO\_SIGN\="\\
AWS4-HMAC-SHA256
${X\_AMZ\_DATE}
${X\_AMZ\_DATE\_SHORT}/${AWS\_REGION}/sts/aws4\_request
${CANONICAL\_REQUEST\_HASH}"
readonly K\_SECRET\=$(printf "AWS4$AWS\_SECRET\_ACCESS\_KEY" | xxd -p -c 256)
readonly K\_DATE\=$(printf "$X\_AMZ\_DATE\_SHORT"  | openssl dgst -binary -sha256 -mac HMAC -macopt "hexkey:${K\_SECRET}"  2\>/dev/null | xxd -p -c 256)
readonly K\_REGION\=$(printf "$AWS\_REGION"      | openssl dgst -binary -sha256 -mac HMAC -macopt "hexkey:${K\_DATE}"    2\>/dev/null | xxd -p -c 256)
readonly K\_SERVICE\=$(printf "sts"             | openssl dgst -binary -sha256 -mac HMAC -macopt "hexkey:${K\_REGION}"  2\>/dev/null | xxd -p -c 256)
readonly K\_SIGNING\=$(printf "aws4\_request"    | openssl dgst -binary -sha256 -mac HMAC -macopt "hexkey:${K\_SERVICE}" 2\>/dev/null | xxd -p -c 256)
readonly SIGNATURE\=$(printf "$STRING\_TO\_SIGN" | openssl dgst -binary -sha256 -mac HMAC -macopt "hexkey:${K\_SIGNING}" 2\>/dev/null | xxd -p -c 256)
readonly AUTHORIZATION\_HEADER\_VALUE\="AWS4-HMAC-SHA256 Credential=${AWS\_ACCESS\_KEY\_ID}/${X\_AMZ\_DATE\_SHORT}/${AWS\_REGION}/sts/aws4\_request, SignedHeaders=${SIGNED\_HEADERS}, Signature=${SIGNATURE}"
readonly CREDENTIAL\_VERIFICATION\_URL\="https://${CANONICAL\_REQUEST\_HOST}${CANONICAL\_REQUEST\_URI}?${CANONICAL\_REQUEST\_QUERY}"

readonly AWS\_ATTESTATION\_JSON\="$(
  jq -nrc \\
    --arg url "$CREDENTIAL\_VERIFICATION\_URL" \\
    --arg authorization\_header\_value "$AUTHORIZATION\_HEADER\_VALUE" \\
    --arg http\_method "$CANONICAL\_REQUEST\_METHOD" \\
    --arg host "$CANONICAL\_REQUEST\_HOST" \\
    --arg x\_amz\_date "$X\_AMZ\_DATE" \\
    --arg x\_snowflake\_audience "$SNOWFLAKE\_AUDIENCE\_HEADER\_VALUE" \\
    --arg x\_amz\_security\_token "$AWS\_SESSION\_TOKEN" \\
    '{
      url: $url,
      method: $http\_method,
      headers: {
        "authorization": $authorization\_header\_value,
        "host": $host,
        "x-amz-date": $x\_amz\_date,
        "x-amz-security-token": $x\_amz\_security\_token,
        "x-snowflake-audience": $x\_snowflake\_audience
      }
    }'
)"
readonly AWS\_ATTESTATION\_B64\="$(printf "%s" "$AWS\_ATTESTATION\_JSON" | base64 | tr -d '\\n')"

readonly SNOWFLAKE\_LOGIN\_URL\="https://${snowflake\_account\_identifier}.snowflakecomputing.com/session/v1/login-request"
readonly SNOWFLAKE\_LOGIN\_REQUEST\_BODY\="$(
  jq -nrc \\
    --arg snowflake\_account\_identifier "${snowflake\_account\_identifier}" \\
    --arg snowflake\_username "${snowflake\_username}" \\
    --arg token "${AWS\_ATTESTATION\_B64}" \\
    '{
      data: {
        ACCOUNT\_NAME: $snowflake\_account\_identifier,
        LOGIN\_NAME: $snowflake\_username,
        AUTHENTICATOR: "WORKLOAD\_IDENTITY",
        PROVIDER: "AWS",
        TOKEN: $token
      }
    }'
)"

readonly SNOWFLAKE\_LOGIN\_RESPONSE\_JSON\="$(
  curl -sS -X POST \\
    -H 'Content-Type: application/json' \\
    -H 'Accept: application/snowflake' \\
    -H 'User-Agent: BASH-WIF-CLIENT/0.0.1' \\
    -d "${SNOWFLAKE\_LOGIN\_REQUEST\_BODY}" \\
    "$SNOWFLAKE\_LOGIN\_URL"
)"
readonly SNOWFLAKE\_MASTER\_TOKEN\="$(echo "${SNOWFLAKE\_LOGIN\_RESPONSE\_JSON}" | jq -r '.data.masterToken // empty')"
readonly SNOWFLAKE\_SESSION\_TOKEN\="$(echo "${SNOWFLAKE\_LOGIN\_RESPONSE\_JSON}" | jq -r '.data.token // empty')"
if \[\[ \-z "${SNOWFLAKE\_MASTER\_TOKEN}" \]\]; then
  echo "Failed to get a snowflake master token." \>&2
  exit 1
fi
if \[\[ \-z "${SNOWFLAKE\_SESSION\_TOKEN}" \]\]; then
  echo "Failed to get a snowflake session token." \>&2
  exit 1
fi

jq \-ncr \\
  \--arg session\_token "$SNOWFLAKE\_SESSION\_TOKEN" \\
  \--arg master\_token "$SNOWFLAKE\_MASTER\_TOKEN" \\
  '{
    session\_token: $session\_token,
    master\_token: $master\_token
  }'

詳しく説明していきます。

いきなりBashを貼りましたが、中身でやっていることをざっくり分解すると次の3ステップです。

1.  AWS STS に対して AssumeRole を実行
2.  AssumeRole で取得したTemporalなCredentialを使って、AWS STS の GetCallerIdentity の SigV4 署名付きリクエストを組み立て
3.  その署名付きリクエストを Snowflake が期待するattestation形式に変換し、　`/session/v1/login-request` に投げる

Snowflake の Workload Identity Federation のドキュメントにも書かれているとおり、Workload Identity Federation（以下、WIF） の基本的な流れは

> 1.  As a workload administrator, configure your service to use a native identity provider so that the provider can issue an _attestation_ of your workload’s identity. This attestation is often, but not always, a JSON Web Token (JWT).
> 2.  As a Snowflake administrator, create a Snowflake service user for your workload. You set the properties of this user to values found in the attestation sent by the provider. For example, a user property might specify the name of an IAM role or the issuer URL of the provider.
> 3.  As a workload developer, configure your workload to use a [Snowflake driver](https://docs.snowflake.com/en/user-guide/workload-identity-federation#label-wif-supported-drivers). Drivers send the attestation to Snowflake for verification.
> 
> ref. [https://docs.snowflake.com/en/user-guide/workload-identity-federation#workflow-for-implementing-workload-identity-federation](https://docs.snowflake.com/en/user-guide/workload-identity-federation#workflow-for-implementing-workload-identity-federation)

となっています。AWS の場合、その「attestation」の中身が SigV4 で署名された GetCallerIdentity リクエストとなっています。この流れは、AWS から Google Cloud に対する Workload Identity Federation の流れとほとんど変わりません。[1](#fn:1)

[docs.cloud.google.com](https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-other-clouds#advanced_scenarios)

## SigV4署名付き AWS STS GetCallerIdentity の組み立て

全体像の1と2は、ドキュメントに忠実に実装しただけです。

[docs.aws.amazon.com](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv-create-signed-request.html)

特筆して説明すべきなのは、この署名のタイミングで `x-snowflake-audience` ヘッダーをCanonical Request / Signed Headers 両方に乗せる必要がある点です。Snowflake の Python コネクタ実装を見ると、AWS WIF の attestation 生成において X-Snowflake-Audience ヘッダを付与し、それも SigV4 署名の対象に含めていることがわかります。

[github.com](https://github.com/snowflakedb/snowflake-connector-python/blob/3427a80f71d371f8d08e594840d1e6f7f5559075/src/snowflake/connector/wif_util.py#L174-L220)

これを抜いてしまうと Snowflake 側から `code=394703 message=The AWS STS request contained unacceptable headers. For instance, the “X-Amz-Date” headers value may be too old as a request is only valid for 15 minutes.` というエラーが返ってきます。

## **AWS Attestation JSON の構築**

実装で言うと以下の箇所です。ここまでの実装で、「AWS STS に投げられる、GetCallerIdentity のSigV4署名付きリクエスト」が作られているので、これをSnowflakeが期待するJSON形式に変換します。

readonly AWS\_ATTESTATION\_JSON\="$(
  jq -nrc \\
    --arg url "$CREDENTIAL\_VERIFICATION\_URL" \\
    --arg authorization\_header\_value "$AUTHORIZATION\_HEADER\_VALUE" \\
    --arg http\_method "$CANONICAL\_REQUEST\_METHOD" \\
    --arg host "$CANONICAL\_REQUEST\_HOST" \\
    --arg x\_amz\_date "$X\_AMZ\_DATE" \\
    --arg x\_snowflake\_audience "$SNOWFLAKE\_AUDIENCE\_HEADER\_VALUE" \\
    --arg x\_amz\_security\_token "$AWS\_SESSION\_TOKEN" \\
    '{
      url: $url,
      method: $http\_method,
      headers: {
        "authorization": $authorization\_header\_value,
        "host": $host,
        "x-amz-date": $x\_amz\_date,
        "x-amz-security-token": $x\_amz\_security\_token,
        "x-snowflake-audience": $x\_snowflake\_audience
      }
    }'
)"
readonly AWS\_ATTESTATION\_B64\="$(printf "%s" "$AWS\_ATTESTATION\_JSON" | base64 | tr -d '\\n')"

snowflake-connector-pythonの実装における、 `create_aws_attestation(…)` メソッドの結果を作っています。 `url`, `method`, `headers` をフィールドに持つJSONで、AWS STSに対して投げられるリクエストの詳細が格納されます。

[github.com](https://github.com/snowflakedb/snowflake-connector-python/blob/3427a80f71d371f8d08e594840d1e6f7f5559075/src/snowflake/connector/wif_util.py#L210-L215)

Google Cloud の場合は `headers` に配列が要求されます。 `headers:[{"key":"xxxxx", "value":"xxxxx"}]` と言った形式です。クラウドプロバイダーごとに attestation の形式が微妙に異なるのがよく分かります。

## Snowflake `/session/v1/login-request` へ認証リクエストを投げる

ここまで準備したので、あとはSnowflakeに認証リクエストを投げるのみです。 `/session/v1/login-request` へ先ほど構築した AWS Attestation JSON を認証に必要なパラメータとともに投げ込みます。

readonly SNOWFLAKE\_LOGIN\_URL\="https://${snowflake\_account\_identifier}.snowflakecomputing.com/session/v1/login-request"
readonly SNOWFLAKE\_LOGIN\_REQUEST\_BODY\="$(
  jq -nrc \\
    --arg snowflake\_account\_identifier "${snowflake\_account\_identifier}" \\
    --arg snowflake\_username "${snowflake\_username}" \\
    --arg token "${AWS\_ATTESTATION\_B64}" \\
    '{
      data: {
        ACCOUNT\_NAME: $snowflake\_account\_identifier,
        LOGIN\_NAME: $snowflake\_username,
        AUTHENTICATOR: "WORKLOAD\_IDENTITY",
        PROVIDER: "AWS",
        TOKEN: $token
      }
    }'
)"
readonly SNOWFLAKE\_LOGIN\_RESPONSE\_JSON\="$(
  curl -sS -X POST \\
    -H 'Content-Type: application/json' \\
    -H 'Accept: application/snowflake' \\
    -H 'User-Agent: BASH-WIF-CLIENT/0.0.1' \\
    -d "${SNOWFLAKE\_LOGIN\_REQUEST\_BODY}" \\
    "$SNOWFLAKE\_LOGIN\_URL"
)"

snowflake-connector-python における実装は以下になります。

[github.com](https://github.com/snowflakedb/snowflake-connector-python/blob/3427a80f71d371f8d08e594840d1e6f7f5559075/src/snowflake/connector/auth/workload_identity.py#L49-L110)

Snowflake からのレスポンスは、ざっくり次のような JSON です。

{
  "data": {
    "masterToken": "XXXXXXXXXX",
    "token": "XXXXXXXXXX",
    "validityInSeconds": 3600,
    "displayUserName": "TEST\_USER",
    "firstLogin": false,
    ...
  },
  "success": true
}

snowflake-connector-python の実装でも、この token と masterToken を認証後に格納しています。

[github.com](https://github.com/snowflakedb/snowflake-connector-python/blob/90f3caff29c8fb305276527d78831233c951b52e/src/snowflake/connector/auth/_auth.py#L478-L484)

## おわりに

本記事では、AWSからSnowflakeへWorkload Identity Federationを使って認証し、セッショントークンを取得するところまでをBashで実装してみることで、Workload Identity Federation機能における低レイヤーなアクセスを理解しました。SDKの中で行われているWorkload Identity Federationによる認証の実装を再実装してみることで、詳細な処理を追うことが出来ました。もしリクエスト時に認証エラーなどの問題が発生しても、原因切り分けもやりやすくなることでしょう。

## 絶賛採用中🔥🔥🔥

LayerXでは、Snowflakeを活用したデータ基盤の構築と、その上でのAI/MLシステムの開発を進めています。Production-ReadyなAI開発をサポートするためのデータ基盤開発、時系列データ処理、リアルタイムデータパイプラインの構築などに興味がある方は、ぜひ一緒にチャレンジしましょう!

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/61470) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/108414) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/70069)

* * *

1.  今回の実装は、Google Cloud Workload Identity Federation の実装を参考にしました。[↩](#fnref:1)