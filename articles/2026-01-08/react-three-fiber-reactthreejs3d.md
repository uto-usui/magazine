---
title: "React Three Fiber入門 - ReactとThree.jsで始める3D表現"
source: "https://ics.media/entry/250410/"
publishedDate: "2025-04-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)」は、**Three.jsをReactで扱うためのライブラリ**です。Reactの特徴である**再利用可能なコンポーネントを活かしながら、宣言的に3Dシーンを構築できる**のが大きな魅力です。

通常のThree.jsでは、メッシュの作成、マテリアルの適用、シーンへの追加などひとつひとつの処理を命令的に記述する必要があります。しかしReact Three Fiberを使えば、裏側の複雑な処理をライブラリ側が担ってくれるため、作りたいシーンをコンポーネントとして宣言でき、処理の流れがわかりやすいコードが書けます。

▼ 通常のThree.jsで立方体メッシュを記述する例

```
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometry, material);
scene.add(box);
```

▼ React Three Fiberで立方体メッシュを記述する例

```
<Canvas>
  <mesh>
    <boxGeometry />
    <meshNormalMaterial/>
  </mesh>
</Canvas>
```

本記事ではその魅力と導入方法、簡単な実装例を紹介します。手続き型との違いやメリットを体感していただければと思います。

以下のような方にオススメです。

-   Three.jsとReactの基本的な書き方を知っている方
-   通常のThree.jsの書き方がややこしくて苦手意識がある方

Three.jsに自信がない方は、『[Three.js入門サイト](https://ics.media/tutorial-three/)』にてThree.jsを一から学習できます。今回紹介するReactでの文法とは異なりますが、使用できるオブジェクトやプロパティは辞書的にも参考になるでしょう。ぜひ合わせてご覧ください。

▼ React Three Fiberで実装した作例（ネジ巻きをクリックして遊んでみてください）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250410_r3f/#/main)
-   [ソースコードを確認する](https://github.com/ics-creative/250410_r3f/blob/main/src/components/MainContents.tsx)

### React Three Fiberとは

Three.jsのオブジェクトがReact用に適切にコンポーネント化されている点が、React Three Fiberの大きな特徴です。**通常のThree.jsの書き方と比較すると、レンダラーやシーンの用意を省略でき**、コード量を大幅に削減できるのが大きな魅力と言えます。また、**コンポーネントベースのため構造が理解しやすく保守性でも優れています。**

参考：[通常のThree.jsで表示するために必要な設定](https://github.com/ics-creative/240827_theatrejs/blob/7bf689885c6b533ff18e86f80bdbb4b0a31ab1b4/src/multiple-animation/main.js#L248C1-L298C45)

```
<Canvas>
  <mesh>
    <boxGeometry />
    <meshNormalMaterial/>
  </mesh>
</Canvas>
```

冒頭の例をもう一度見てみましょう。`Canvas`コンポーネントの中に`mesh`コンポーネントがあります。その中にジオメトリとマテリアルがツリー構造になっており、視覚的にも理解しやすいことが実感いただけるのではないでしょうか。

そのほか、`mesh`コンポーネントが`onClick`や`onWheel`などイベント用の`props`をもつので、**インタラクティブな実装を仕込むのが楽な点**でも優秀です。

いい事づくしでReactプロジェクトなら採用しない手はないですね！　それでは、ライブラリ導入から3Dの表示までの手順を解説します。

なお、本記事では[React](https://ja.react.dev/)と[Three.js](https://threejs.org/)自体の解説は行いませんので、必要があれば公式ドキュメントを参照ください。

### ①ライブラリの導入

#### 手順1. 事前準備（Reactのプロジェクト作る）

まず、Reactプロジェクトを作る必要があります。今回はVite + React + TypeScriptでプロジェクトを作成しました。以下リンクのサンプルコードをクローンしたり、コマンドラインで新規にプロジェクトを作成しリポジトリを用意しましょう。

-   [ソースコードを確認する](https://github.com/ics-creative/250410_r3f/tree/main)

▼ Viteで新しくプロジェクトを作る場合

```
npm create vite@latest
```

-   「Select a framework:」は「React」を選択してください。
-   「Select a variant:」は「TypeScript」を選択してください。

#### 手順2. ライブラリのインストール

Three.js本体と型情報、`@react-three/fiber`をインストールします。

```
npm install three @types/three @react-three/fiber
```

### ②コンポーネントの追加

それでは早速表示させてみましょう。`App.tsx`など画面に表示したいコンポーネントに`Canvas`コンポーネントを追加します。その中に`mesh`コンポーネントを追加し、ジオメトリとマテリアルのコンポーネントも追加します。

```
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <div className="canvasContainer">
      <Canvas>
        <mesh>
          {/* 球体ジオメトリ */}
          <sphereGeometry />
          {/* ノーマルマテリアル */}
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}
```

▼ `App.css`

```
.canvasContainer {
  width: 100%;
  height: 100%;
}
```

![球体の表示サンプル](https://ics.media/entry/250410/images/250410_r3f_minimum.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250410_r3f/#/minimum)
-   [ソースコードを確認する](https://github.com/ics-creative/250410_r3f/blob/main/src/pages/MinimumConfigPage.tsx)

なんと、これだけで表示できます。通常のThree.jsで必要となる、シーンやカメラ、レンダラーの追加はCanvasコンポーネントに含まれているため、都度追加する必要がありません。もちろん細かく調整したい場合は調整できます。

▼ カメラと影を調整する例

```
<Canvas
  camera={{
    fov: 45, // 視野角
    position: [-8, 3, 8], // 位置
  }}
  shadows={"soft"} // 影を有効化
>
</Canvas>
```

#### 外部3DモデルはSuspenseでラップして読み込む

続いて`gltf`形式の3Dモデルを読み込んでみましょう。モデルのデータは`public`ディレクトリ配下に置いておき、`useLoader(ローダー, データのパス)`でモデルを読み込みます。今回使用したモデルが`gltf`形式のため`GLTFLoader`をインポートしましたが、使用する3Dデータの形式に合わせて、ローダーは調整してください。

`primitive`コンポーネントの`object`プロパティに読み込んだデータのシーンを渡します。

```
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // これでも動作するが型エラーが出るため、three-stdlibパッケージを追加し使用。
import { GLTFLoader } from "three-stdlib";

const Model = () => {
  // 3Dモデルの読み込み
  const gltf = useLoader(GLTFLoader, "/gltf/neji.glb");
  return <primitive object={gltf.scene} />;
};

const App = () => {
  return (
    <Canvas>
      {/* 3Dモデルの読み込み。Suspenseで囲むことで読み込み後に3D空間に追加される */}
      <Suspense fallback={null}>
        <Model/>
      </Suspense>
        
      <pointLight color={"#e8d5aa"} intensity={50} position={[-0.2, 0.6, 2]} />
    </Canvas>
  )
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250410_r3f/#/model)
-   [ソースコードを確認する](https://github.com/ics-creative/250410_r3f/blob/main/src/pages/ModelPage.tsx)

`GLTFLoader`のインポートで型エラーが発生したので、`three-stdlib`パッケージを追加して`GLTFLoader`をインポートしています。

▼ モデルの読み込みを待たず、シーンが読み込まれる

![3Dモデルの読み込み](https://ics.media/entry/250410/images/250410_r3f_model.webp)

後述しますが、ライブラリ`@react-three/drei`を導入しておくと、より簡潔に記述できるので検討するとよいかもしれません。

▼ `Gltf`コンポーネントを利用した書き方例

```
import { Gltf } from "@react-three/drei";

const Model = () => {
  return <Gltf src="/gltf/neji.glb" />;
};
```

### ③インタラクション

インタラクションを追加してみましょう。`mesh`コンポーネントは`onClick`、`onPointerOver`、`onUpdate`などさまざまなイベント用の`props`をもっています。Three.jsなどCanvas内の要素は通常、DOMのようなイベントは受け付けませんが、内部的にraycasterが使用され、propsとしてイベントが発火できるようになっています。

-   [Events - React Three Fiber](https://r3f.docs.pmnd.rs/api/events)

```
const Cube = () => {
  const [isActive, setIsActive] = useState(false);
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    setIsActive(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    setIsActive(false);
  };

  return (
    <mesh
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry />
      <meshStandardMaterial color={isActive ? "#54b3ff" : "#cdf346"} />
    </mesh>
  );
};
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250410_r3f/#/pointer)
-   [ソースコードを確認する](https://github.com/ics-creative/250410_r3f/blob/main/src/components/Cube.tsx)

注意点として、ポインター系のイベントは重なっているオブジェクトを貫通して発火します。

![ポインターイベント伝播の比較](https://ics.media/entry/250410/images/250410_r3f_pointer.gif)

ポインターイベントを貫通させたくない場合、オブジェクトのイベントハンドラーに`event.stopPropagation()`を追加することで、ポインターイベントの伝播を防止できます。

```
const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
  // 手前のオブジェクトでイベントが発生したら伝播を止める
  event.stopPropagation();
};
```

### ④アニメーション

![アニメーション実装例](https://ics.media/entry/250410/images/250410_r3f_interaction.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250410_r3f/#/interaction)
-   [ソースコードを確認する](https://github.com/ics-creative/250410_r3f/blob/main/src/components/Box.tsx)

#### アニメーション① クリックしたら回転させる例

続いてメッシュのクリック時にアニメーションを追加してみましょう。アニメーションの実装には`useFrame`（`requestAnimationFrame`のようなフック）が利用できます。

ドキュメントの注意書きで記載されているとおり、`useFrame`内では`setState`による更新は行わないようにしましょう。メッシュのプロパティは`ref`で参照して更新します。

-   [Hooks - React Three Fiber](https://r3f.docs.pmnd.rs/api/hooks#useframe)

今回は`meshRef.current.rotation.y`プロパティを更新する処理を追加しました。メッシュをクリックして`isActive`が`true`になった時に、1回転するアニメーションが行われます。イージングにはThree.jsの[数学ユーティリティ関数](https://threejs.org/docs/?q=Math#api/en/math/MathUtils.damp)の`damp()`関数を利用しています。

▼ クリック時にメッシュを回転させる例の抜粋

```
const Box = () => {
  // 回転アニメーションがアクティブか？
  const [isActive, setIsActive] = useState(false);
  // メッシュの参照
  const meshRef = useRef<Mesh>(null);

  // 毎フレームの更新
  useFrame((state, delta) => {
    if (!meshRef.current) {
      return;  
    } 
    // クリック時（isActiveがtrueの時）に1回転させる
    meshRef.current.rotation.y = isActive ? 
      THREE.MathUtils.damp(
        meshRef.current.rotation.y, // from
        2 * Math.PI, // to
        4, //減衰係数。値が大きいほど動きが急になり、小さいほど動きがなめらかになる
        delta, // 補間係数。リフレッシュレートに依存しないアニメーション速度を保つためデルタタイムを渡す
      ) : 0; // 0に戻す

    // 回転が終わった時の処理
    if (meshRef.current.rotation.y >= 2 * Math.PI - 0.01) {
      setIsActive(false);
    }
  });

  // クリック時の処理
  const handleClick = () => {
    setIsActive(true);
  };

  return (
    <mesh ref={meshRef} onClick={handleClick} >
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};
```

#### アニメーション② ポインターの位置に応じてメッシュの座標を動かす例

マウスやポインターの位置に応じて、メッシュの位置を移動する処理を追加します。

▼ ポインターの位置に応じてメッシュを動かす例の抜粋

```
const Box = () => {
  // メッシュの参照
  const meshRef = useRef<Mesh>(null);
    
  const v = new Vector3();
  // 毎フレームの更新
  useFrame((state, delta) => {
    // ポインターの位置に応じてメッシュのxy座標をなめらかに動かす
    meshRef.current.position.lerp(
      v.set(state.pointer.x * 3, state.pointer.y * 2, 0),
      delta * 2, // 補間係数。リフレッシュレートに依存しないアニメーション速度を保つためデルタタイムを渡す
    );
  });
    
  return (
    // 省略
  );
};
```

`useFrame`フックはいくつかの引数をとります。`state`にはステージの情報が含まれており、マウスやポインターの位置に応じてプロパティを更新したい場合は、`state.pointer`で参照できます。

### コラム: エコシステムについて

React Three Fiberは開発に役立つ[エコシステム](https://r3f.docs.pmnd.rs/getting-started/introduction#eco-system)が充実しています。とくにオススメのライブラリを紹介します。

#### @react-three/drei

[@react-three/drei](https://drei.docs.pmnd.rs/getting-started/introduction)は、より複雑な表現をしたい場合、**導入しておくと非常に役立つであろうヘルパーライブラリ**です。OrbitControlsなどステージの制御に使える機能や、グラデーション等のマテリアル（シェーダー）、少し凝ったコンポーネント（sky, caustics）などさまざまな機能が提供されています。

どのような機能があるかは、公式ドキュメントや[Storybook](https://drei.pmnd.rs/?path=/docs/staging-accumulativeshadows--docs)が参考になります。

▼ ライブラリ追加

```
npm install @react-three/drei
```

▼実装例

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250410_r3f/#/dreisample)
-   [ソースコードを確認する](https://github.com/ics-creative/250410_r3f/blob/main/src/pages/DreiSamplePage.tsx)

### まとめ

React Three Fiberの導入方法から実装方法までを紹介しました。Reactの基本的な書き方に慣れている方は、コードがシンプルかつ直感的に書け、コンポーネントの分割による管理のしやすさも実感できたのではないでしょうか。

今回は深掘りしていませんが、Reactの再レンダリングと3Dの描画が絡むため、パフォーマンスのチューニングについて注意しておけると安心です。公式ドキュメントの[パフォーマンスの落とし穴](https://r3f.docs.pmnd.rs/advanced/pitfalls)をぜひご一読ください。

React Three Fiberをきっかけに、Reactの魅力をさらに深掘りしたり、Reactプロジェクトを採用してみるのも素晴らしい選択肢になるかもしれません。ぜひ、React Three Fiberを導入したアプリケーション開発を行ってみてください！