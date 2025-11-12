# Parallax Image

GSAPおよびScrollTriggerを使用した、コンテナ内の画像にパララックス効果を付与するモジュールです。

## 特徴

- **双方向パララックス**: 通常のパララックス（1.0以上）と逆パララックス（1.0未満）に対応
- **カスタマイズ可能**: `data-parallax-speed`属性で効果の強さを調整
- **レスポンシブ対応**: 画面リサイズ時の再計算に対応（モバイル／タブレットは横幅のみ判定対象）

## 依存関係

- [GSAP 3.x](https://greensock.com/gsap/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/) (GSAP Plugin)
- [Lenis](https://github.com/studio-freight/lenis) (推奨)

## HTML構造

```html
<div class="p-parallax-img js-parallax-img" data-parallax-speed="1.3">
  <img src="img.jpg" alt="">
</div>
```

**必須要素：**
- `.js-parallax-img`: パララックス効果を適用するコンテナ ※クラス名は変更可能
- `data-parallax-speed`: 視差効果の強さを指定する属性

## 基本的な使用方法

```javascript
import { ParallaxImage } from "./modules/ParallaxImage.js";

// 全てのパララックス画像を初期化
const parallaxImages = document.querySelectorAll('.js-parallax-img');
parallaxImages.forEach(element => {
  new ParallaxImage(element);
});
```

## data-parallax-speed属性

### 基本的な効果の種類

**通常パララックス（1.0以上）**: 画像がスクロール方向と同じ向きにゆっくり移動
**逆パララックス（1.0未満）**: 画像がスクロール方向と逆向きに移動


## 必須CSS設定

パララックス効果を正しく動作させるため、以下の設定が必要です：

### **基本CSS**
```
css/parallax-image.css
```

### **コンテナの高さ設定**

**重要**: `.p-parallax-img`コンテナには必ず高さを指定してください。高さが未設定の場合、パララックス効果が正常に動作しません。


## 画像素材について

### **推奨画像サイズ**

画像は自動的にサイズ調整されますが、視差効果の大きさに応じた適切なサイズの素材を使用してください。

#### **コンテナに対する画像のサイズ**
```javascript
// data-parallax-speed値による画像の拡大率
speed: 1.3 → 画像高さ: 130%（コンテナの高さの1.3倍に拡大）
speed: 1.8 → 画像高さ: 180%（コンテナの高さの1.8倍に拡大）
speed: 0.5 → 画像高さ: 150%（コンテナの高さの1.5倍に拡大）
```

#### **計算式**
```javascript
// 例：コンテナ400px、speed=1.3の場合
推奨画像高さ = 400 × 1.3 = 520px
```


## 推奨事項

#### 慣性スクロール
滑らかな表現のためLenisなどの慣性スクロールライブラリとの併用が推奨です。


### モバイルでガタツキが発生する場合
ScrollTriggerのscrub値を調整してください。

```javascript
// 現在の設定（推奨）
scrub: isMobile ? 0.3 : true

// より滑らかにしたい場合
scrub: isMobile ? 0.5 : true
```

