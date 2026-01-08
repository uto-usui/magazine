---
title: "Kubeflow PipelinesとPydantic Settingsを活用してMLパイプラインを型安全かつシンプルに実装する"
source: "https://engineering.mercari.com/blog/entry/20251128-c46fa95168/"
publishedDate: "2025-12-03"
category: "engineering"
feedName: "Mercari Engineering"
---

## はじめに

こんにちは。メルペイのGrowth PlatformでML Engineerをしている [@hokao](https://x.com/khokawo) です。  
この記事は、[Merpay & Mercoin Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-merpay-mercoin-advent-calendar-2025/) の3日目の記事です。

## 背景

Growth Platformでは、新たにGrowth MLというMLチームを立ち上げました。私は主にMLOpsを担当しつつ、チームの生産性向上に向けた基盤づくりにも取り組んでいます。

Growth MLチームでは、[Kubeflow Pipelines（KFP）](https://www.kubeflow.org/docs/components/pipelines/)でMLバッチ処理を実装し、[Vertex AI Pipelines](https://docs.cloud.google.com/vertex-ai/docs/pipelines/introduction)上で運用しています。KFPは、Kubernetes上でコンテナを使ってMLワークフローを構築・実行するためのプラットフォームであり、Vertex AI PipelinesはそれらをGoogle Cloud上でサーバーレスに運用・管理できるサービスです。KFPには[Python SDK](https://kubeflow-pipelines.readthedocs.io/en/stable/)が用意されており、パイプラインをPythonコードとして記述できます。

KFPはPythonでMLパイプラインを実装できる一方で、コンポーネントの設計・実装の自由度が高く、適切に使いこなすのは容易ではありません。そこで、メンテナンス性と可読性を高め、チームの開発生産性を向上させるために、KFPを用いた実装パターンを整備しました。本稿では、その概要とポイントを紹介します。

## KFPのコンポーネント実装パターン

コンポーネントはパイプラインを構築する基本的な構成要素です。執筆時点では、コンポーネントの実装方法として次の3パターンが提供されています。

1.  [Lightweight Python Components](https://www.kubeflow.org/docs/components/pipelines/user-guides/components/lightweight-python-components/)
2.  [Containerized Python Components](https://www.kubeflow.org/docs/components/pipelines/user-guides/components/containerized-python-components/)
3.  [Container Components](https://www.kubeflow.org/docs/components/pipelines/user-guides/components/container-components/)

### Lightweight Python Components

Lightweight Python Componentsは最も手早く実装できますが、関数スコープに完全に閉じた実装が求められるという制約があります。実装例は次のとおりです。

```
from kfp import dsl

@dsl.component(
    base_image='python:3.14',
    packages_to_install=['numpy==2.3.0'],
)
def sin(val: float = 3.14) -> float:
    import numpy as np

    return np.sin(val).item()
```

`packages_to_install`で指定したライブラリはパイプライン実行時にインストールされ、その後に関数のコードが実行されます。依存ライブラリは関数ごとに管理する必要があり、MLバッチ全体で用いる特定ライブラリのバージョンを統一することが困難です。また、ライブラリのインポートや使用するシンボルの定義を関数内に閉じ込める必要があるため、関数の責務が容易に肥大化し、単体テストの記述も難しくなります。さらに、KFPが担うコンポーネント定義などのパイプラインのオーケストレーションと、ドメイン固有のビジネスロジックが密結合になりやすく、コードの見通しも損なわれます。これらの特性から、プロダクション用途には向きません。

### Containerized Python Components

Containerized Python Componentsは前述のLightweight Python Componentsに近い書き方ですが、関数スコープに閉じるという制約が一部緩和されます。コードと依存関係を含むコンテナイメージを事前にビルドすることで、関数外で定義したシンボルも参照できます。

しかし、関数ごとに依存ライブラリを定義する必要がある点は同じです。さらに、KFPのCLIが特定のディレクトリ構造に依存して自動生成する`runtime-requirements.txt`と`Dockerfile`を前提とするため、柔軟性に欠けます。したがって、これらの制約を踏まえた上で利用する必要があります。

### Container Components

3つ目のContainer Componentsは、`docker run`のようにイメージ、コマンド、引数を指定してコンポーネントを定義する方式です。

```
from kfp import dsl

@dsl.container_component
def say_hello(name: str) -> dsl.ContainerSpec:
    return dsl.ContainerSpec(
        image='gcr.io/my-project/my-base-image:latest',
        command=['python', 'main.py'],
        args=['--name', name],
    )
```

パイプラインで用いるコードとライブラリを含んだイメージを用意する必要がありますが、依存関係の管理がはるかに容易になります。実行時にライブラリをインストールする必要もありません。また、実行するPythonスクリプトはKFP特有の制約を受けない通常のスクリプトとして実装できるため、テストも書きやすくなります。

こうした理由から、Growth MLチームでは原則としてContainer Componentsでコンポーネントを実装することとしました。

## Container ComponentsでのCLI実装とその課題

Container Componentsで実行コマンドを指定するため、処理ロジックはPythonのCLIとして実装するのが自然です。CLIコマンドは`docker run`のように実行されるため、引数としてリストや辞書などの複雑な引数を渡すときは注意が必要です。

たとえば、次のようなパイプラインを用意したとします。実行するコンポーネントは1つだけで、CLI引数としてPythonのリストを渡します。

```
from kfp import dsl, local

@dsl.container_component
def argparse_component(
    list_var: list,  # KFP does not support the `list[str]` type annotation.
) -> dsl.ContainerSpec:
    return dsl.ContainerSpec(
        image='kfp-demo:latest',
        command=['python', '-m', 'cli.argparse_cli'],
        args=['--list-var', list_var],
    )

@dsl.pipeline
def pipeline() -> None:
    argparse_component(list_var=['a', 'b', 'c'])

def main() -> None:
    # Using local Docker runner for demonstration
    local.init(runner=local.DockerRunner())

    pipeline()

if __name__ == '__main__':
    main()
```

実行するCLIは次のとおりです。標準ライブラリの`argparse`で実装しており、リストを受け取り、`print`関数でそのまま出力するだけのシンプルなものです。

```
import argparse

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--list-var', nargs='+', required=True)
    args = parser.parse_args()

    print(args.list_var)

if __name__ == '__main__':
    main()
```

CLI引数として渡しているのは`['a', 'b', 'c']`なので、`print`の結果も`['a', 'b', 'c']`となってほしいところです。しかし実際には、`['["a", "b", "c"]']`と出力されます。

Container Componentsはほぼ`docker run`と同じ仕組みで動作するため、引数を受け渡す際に変数の値がシリアライズ（文字列化）されます。そのため、実際の`docker run`コマンドで渡される引数は文字列`'["a", "b", "c"]'`になります。また、先ほどの`argparse`の実装では、スペース区切りで渡された複数の値をリストとして扱う仕様になっています。結果として、この文字列全体が1要素として扱われ、`['["a", "b", "c"]']`というリストになってしまいます。この挙動は、[Click](https://click.palletsprojects.com/)や[Typer](https://typer.tiangolo.com/)など他のCLIライブラリでも同様です。

この問題を単純に解決しようとすると、ひとまず引数を文字列（`str`）として受け取り、CLI側でデシリアライズするという実装が考えられます。ただ、それだと本質ではない処理が増えてコードの見通しが悪くなり、なにより型の安全性が担保されません。

引数が`int`や`bool`だけで済むならシンプルで理想的ですが、Pythonだけでパイプラインを書く以上、`list`や`dict`といった構造化データを引数にしたいケースはどうしても発生します。

## Pydantic Settingsで型安全かつシンプルにCLI引数を扱う

いくつかのアプローチを検討・試行した結果、[Pydantic Settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)を使う方法が、これらの課題を最もシンプルに解決できることが分かりました。

Pydantic Settingsは、[Pydantic](https://docs.pydantic.dev/latest/)の型定義を使って環境変数や`.env`などから設定を型安全に読み込めるライブラリです。さらに、`SettingsConfigDict(cli_parse_args=True)`を有効にすればCLI引数もPydanticモデルでパースできます。

先ほど`argparse`で実装したCLIをPydantic Settingsで書き直すと次のようになります。

```
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(cli_parse_args=True)

    list_var: list[str] = Field(alias='list-var')

def main() -> None:
    settings = Settings()
    print(settings.list_var)

if __name__ == '__main__':
    main()
```

Pydanticは入力値を指定した型にパースし、その出力がその型に一致することを保証します。Pydantic SettingsでCLI引数をパースする場合、`list`や`dict`などはJSON形式をサポートしているため、KFPのContainer ComponentsでシリアライズされたCLI引数（JSON文字列）も適切にパースしてくれます。その結果、わざわざデシリアライズ処理を書く必要がなく、型安全性も自然に確保されます。

## 複雑な構造体もPydantic Settingsで型安全に扱う

`argparse`など標準的なCLIライブラリでは`dict`などをそのまま引数型として扱えませんが、Pydantic SettingsならJSON文字列をモデルにマッピングできるので、簡単かつ型安全に扱えます。

ここでは少し応用的な例として、KFPの[`dsl.PipelineTaskFinalStatus`](https://kubeflow-pipelines.readthedocs.io/en/stable/source/dsl.html#kfp.dsl.PipelineTaskFinalStatus)を使って実行タスクの最終状態を受け取る方法を紹介します。使い方はシンプルで、コンポーネントに`PipelineTaskFinalStatus`の型アノテーションを付けた引数を追加するだけです。変数に自動的に値が代入されるようになっているため、コンポーネントの関数を呼び出す際にこの引数を指定する必要はありません。公式ドキュメントにはContainer Componentsでの具体例はありませんが、Pydantic Settingsを使えば問題なく扱えます。

```
from kfp import dsl

@dsl.container_component
def pipeline_task_final_status_component(
    base_image: str,
    pipeline_task_final_status: dsl.PipelineTaskFinalStatus,
) -> dsl.ContainerSpec:
    return dsl.ContainerSpec(
        # The `image` argument must be cast to string.
        # ref: https://github.com/kubeflow/pipelines/issues/4433#issuecomment-2959874538
        image=str(base_image),
        command=[
            'python',
            '-m',
            'cli.pydantic_settings_cli',
        ],
        args=[
            '--pipeline-task-final-status',
            pipeline_task_final_status,
        ],
    )
```

`PipelineTaskFinalStatus`の変数をCLIの引数に指定すると、他の値と同様にJSON文字列としてシリアライズされてコンテナに渡されます。シリアライズ後の実体は単なるJSON文字列なので、対応するPydanticのモデルを定義しておけば、CLI側でそのまま型付きオブジェクトとして安全に扱うことができます。

```
from typing import Literal

from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Error(BaseModel):
    code: int | None = None
    message: str | None = None

class PipelineTaskFinalStatus(BaseModel):
    error: Error
    pipelineJobResourceName: str
    pipelineTaskName: str
    state: Literal['SUCCEEDED', 'FAILED', 'CANCELLED']

class Settings(BaseSettings):
    model_config = SettingsConfigDict(cli_parse_args=True)

    pipeline_task_final_status: PipelineTaskFinalStatus = Field(
        alias='pipeline-task-final-status',
        description='Pipeline task execution status (JSON format)',
    )

def main() -> None:
    settings = Settings()
    print(settings.pipeline_task_final_status)

if __name__ == '__main__':
    main()
```

想定と異なる形式のデータが渡された場合、Pydanticは入力時点で検証し即座にバリデーションエラーを返します。そのため、ネストした`dict`や`list`などのやや複雑な構造のデータでも、Pydantic Settingsを使えば型に沿って安全に扱えます。

Pydantic Settingsを併用することで、KFPのContainer Componentsの開発体験が大きく向上します。

## おわりに

本稿では、KFPのコンポーネント実装パターンを整理し、Container ComponentsとPydantic Settingsを組み合わせることで、開発者がより簡単かつ型安全にパイプラインを構築できるアプローチを紹介しました。

他にも、パイプラインの実行スケジュールを宣言的に記述し、`terraform apply`のように差分を確認・適用できる仕組みなど、運用を支えるさまざまな取り組みをしています。これらについても、また別の機会に紹介できればと思います。

今回紹介した内容が、KFPを使った開発における設計で悩んでいる方の参考になれば幸いです。

明日の記事は @Sakamoto さんです。引き続きお楽しみください。