---
title: "CSSの「oklch()」と色差ΔE (CIEDE2000)・WCAGコントラスト比をTypeScriptで厳密計算するカラーサイエンス実装"
source: "https://zenn.dev/t_shamoji/articles/a6bae7436c3f54"
publishedDate: "2026-11-19"
category: "design-systems"
feedName: "Zenn designsystem"
author: "しゃもじ太郎"
---

## はじめに：なぜ今「RGB / HEX」だけでなく「Oklch / CIEDE2000 / WCAG」の理解が必要なのか？

Webフロントエンドやデザインシステムの現場では、長らく使われてきた `#RRGGBB`（sRGB）や `hsl()` だけでは表現・管理しきれない課題が顕在化しています。

1.  **`hsl()` の明度（Lightness）は人間の視覚と一致しない**:
    -   `hsl(60, 100%, 50%)`（黄色）と `hsl(240, 100%, 50%)`（青色）は、同じ `L = 50%` なのに人間には黄色が圧倒的に明るく見え、同じルールで文字色を乗せるとコントラスト比が破綻します。
2.  **広色域ディスプレイ（Display P3）の普及**:
    -   モダンブラウザで **`oklch(L C H)`** が標準サポートされ、知覚的に均等な明度・彩度を保ったまま、sRGB を超える Display P3 領域まで扱えるようになりました。
3.  **「見た目上の色の違い」を数値化する指標の必要性**:
    -   ブランドカラーを別媒体（印刷 CMYK / 映像 BT.709 / Web）へ展開した際、「本当に人間の目で同じ色に見えるか」を測るには **CIEDE2000 (\\Delta E\_{00})** のような知覚色差計算が必要です。

こうした色彩工学の変換・検証をすべてブラウザ内だけで行えるようにするため、**『カラー Studio』** を設計・実装しました。

🔗 **カラー Studio（無料・登録不要）**  
👉 **[https://shamoji-drive.com/tools/colorspace](https://shamoji-drive.com/tools/colorspace)**

📖 **詳しい仕組み・色空間ガイド**  
👉 **[https://shamoji-drive.com/tools/colorspace/guide](https://shamoji-drive.com/tools/colorspace/guide)**

本記事では、その裏側で実装している **sRGB ↔ Oklab / Oklch 変換** と **WCAG 2.1 相対輝度・コントラスト比計算** の TypeScript アルゴリズムを解説します。

* * *

## 1\. sRGB から Oklab / Oklch への厳密な変換パイプライン

Oklab（Björn Ottosson氏による知覚均等色空間）およびその極座標表現である **Oklch（Lightness, Chroma, Hue）** へ sRGB を変換するには、**必ず最初に sRGB のガンマ補正を解除して「線形RGB（Linear RGB）」へ戻す** 必要があります。

### TypeScript による sRGB → Oklch 変換実装

```
export interface OklchColor {
  L: number; // 明度 (0.0 〜 1.0)
  C: number; // 彩度 (0.0 〜 約0.4)
  H: number; // 色相角 (0 〜 360度)
}

/** sRGB (0..1) を Linear RGB へ変換（逆ガンマ補正） */
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** 8bit RGB (0..255) から CSS oklch() 用の値を算出 */
export function rgbToOklch(r8: number, g8: number, b8: number): OklchColor {
  const r = srgbToLinear(r8 / 255);
  const g = srgbToLinear(g8 / 255);
  const b = srgbToLinear(b8 / 255);

  // Linear sRGB -> LMS
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // LMS -> Oklab
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // Oklab -> Oklch (極座標変換)
  const C = Math.hypot(a, b_);
  let H = (Math.atan2(b_, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return {
    L: Number(L.toFixed(4)),
    C: Number(C.toFixed(4)),
    H: Number(H.toFixed(2)),
  };
}
```

この計算により、どんなカラーコード（例：`#ff2a85`）であっても、CSS の `oklch(0.6542 0.2465 358.12)` へと正確にマッピングでき、**同じ `L`（明度）を保ったまま色相 `H` だけを回転させることで、視認性が一切崩れないデザインシステムのカラーパレット** を生成できます。

* * *

## 2\. アクセシビリティ（WCAG 2.1）コントラスト比の計算

デザインシステムで文字色と背景色の組み合わせを決める際、WCAG 2.1 の **AA基準（4.5:1以上）** / **AAA基準（7.0:1以上）** を満たしているかの自動判定も欠かせません。

```
/** sRGB (0..255) から WCAG 2.1 相対輝度 (Relative Luminance) を計算 */
export function getRelativeLuminance(r8: number, g8: number, b8: number): number {
  const toLin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = toLin(r8);
  const g = toLin(g8);
  const b = toLin(b8);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** 2色のコントラスト比 (1.0 〜 21.0) を算出 */
export function getContrastRatio(
  fg: [number, number, number],
  bg: [number, number, number]
): number {
  const l1 = getRelativeLuminance(...fg);
  const l2 = getRelativeLuminance(...bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}
```

* * *

## 3\. CIE 1931 xy 色度図・CIEDE2000 色差・色覚多様性（CUD）の統合

Webデザインだけでなく、印刷物・映像制作・ユニバーサルデザインまで1画面で完結させるため、`カラー Studio` には以下の機能もすべて TypeScript で実装しました。

1.  **9大色空間の双方向リアルタイム変換**:
    -   `HEX / RGB / HSB / HSL / HWB / XYZ / CIELAB / Oklab / Oklch / CMYK`（印刷の総インク量 **TAC** 超過チェック付き）
2.  **CIEDE2000（\\Delta E\_{00}）色差計算**:
    -   2つの色の違いが人間の目でどの程度識別できるか（\\Delta E < 1.0 ならほぼ同一色）を厳密な国際基準式で算出。
3.  **CIE 1931 xy 色度図の馬蹄形プロット**:
    -   指定した色が **sRGB / Display P3 / Adobe RGB / Rec.2020** のどの色域に収まっているかを視覚的に確認。
4.  **色覚多様性（CUD）実写シミュレーター**:
    -   P型（1型2色覚）・D型（2型2色覚）・T型（3型2色覚）の見え方を、カラーパレットだけでなく手元のUIスクリーンショットや写真にもリアルタイム適用して検証可能。
5.  **5大標準カラーパレット収録**:
    -   JIS慣用色・日本の伝統色・Pantone風・Webセーフなどから近似色を即座に検索。

* * *

## 4\. ブラウザ完結（外部送信ゼロ）でデザイン＆開発を加速する Shamoji DRIVE

**[Shamoji DRIVE](https://shamoji-drive.com/)** では、デザイン・フロントエンド・ハードウェアまで幅広いエンジニア向けツールを**すべてブラウザ内完結（入力データ・画像の外部送信ゼロ）** で無料公開しています。

-   🎨 **[カラー Studio](https://shamoji-drive.com/tools/colorspace)**：Oklch・CMYK・CIE 1931色度図・色差ΔE・CUD実写シミュレーション
-   🖼️ **[アプリアイコン & ファビコン Studio](https://shamoji-drive.com/tools/appicon)**：マルチサイズICO・APNG・PWA/iOS/Androidアイコン一括生成
-   🧩 **[Canvas Studio](https://shamoji-drive.com/canvas-studio)**：Vue 3 / Vuetify 3 / Bootstrap 5 対応のビジュアルUI設計＆AI実装・APIモック環境
-   📐 **[HobbyCAD](https://shamoji-drive.com/hobby-cad)**：0.1mm単位の精密作図・A4実寸印刷に対応したブラウザ2D型紙CAD

カラー設計やアクセシビリティ検証を行う際、ぜひブックマークしてご活用ください！

* * *

### 📚 関連する技術記事・発信メディア

-   **これまでのZenn記事**: [https://zenn.dev/t\_shamoji](https://zenn.dev/t_shamoji)
-   **Qiita（実務アルゴリズム・Web/ネットワーク解説）**: [https://qiita.com/t\_shamoji](https://qiita.com/t_shamoji)
-   **note（ものづくり・HobbyCAD活用ガイド）**: [https://note.com/t\_shamoji](https://note.com/t_shamoji)
-   **YouTube（コーディング・作業用BGV『Aetheria Phantom Cruise』）**: [https://www.youtube.com/@AetheriaPhantomCruise](https://www.youtube.com/@AetheriaPhantomCruise)
-   **Shamoji DRIVE 公式サイト**: [https://shamoji-drive.com/](https://shamoji-drive.com/)