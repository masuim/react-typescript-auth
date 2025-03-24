# スタイル定義ガイドライン

## 基本方針

このプロジェクトでは、Tailwind CSS を主要なスタイリングソリューションとして採用しています。

## スタイリング階層

1. **ユーティリティファースト**

   - 基本的には Tailwind のユーティリティクラスを使用
   - コンポーネント内で直接スタイルを適用

2. **コンポーネント固有のスタイル**

   - 複雑なスタイルは`styles.ts`に分離
   - コンポーネントディレクトリ内に配置

3. **グローバルスタイル**
   - `src/styles/global.css`に定義
   - リセット CSS やベーススタイル
   - カスタムユーティリティクラス

## Tailwind の使用ガイドライン

### 推奨される使用方法

```tsx
// 基本的なスタイリング
<button className="px-4 py-2 bg-blue-500 text-white rounded-md">
  Click me
</button>

// 条件付きスタイリング
<div className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}>
  Content
</div>

// 複数クラスの整理
<div className={clsx(
  'base-class',
  'layout-class',
  isActive && 'active-class'
)}>
  Content
</div>
```

### カスタマイズ

1. **テーマの拡張**

   ```js
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           primary: "#1a73e8",
           secondary: "#5f6368",
         },
       },
     },
   };
   ```

2. **プラグインの使用**
   ```js
   // tailwind.config.js
   module.exports = {
     plugins: [
       require("@tailwindcss/forms"),
       require("@tailwindcss/typography"),
     ],
   };
   ```

## コンポーネント固有のスタイル

### スタイルファイルの構造

```typescript
// components/atoms/Button/styles.ts
export const buttonStyles = {
  base: "px-4 py-2 rounded-md",
  variants: {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-gray-800",
  },
  sizes: {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  },
};
```

### 使用例

```tsx
import { buttonStyles } from "./styles";

const Button = ({ variant = "primary", size = "md" }) => (
  <button
    className={`${buttonStyles.base} ${buttonStyles.variants[variant]} ${buttonStyles.sizes[size]}`}
  >
    Click me
  </button>
);
```

## レスポンシブデザイン

### ブレークポイント

```
sm: 640px   // スマートフォン横向き
md: 768px   // タブレット
lg: 1024px  // デスクトップ
xl: 1280px  // ワイドスクリーン
2xl: 1536px // 超ワイドスクリーン
```

### 使用例

```tsx
<div
  className="
  w-full         // モバイル
  md:w-1/2      // タブレット
  lg:w-1/3      // デスクトップ
  xl:w-1/4      // ワイドスクリーン
"
>
  Content
</div>
```

## アニメーションとトランジション

### 基本的なトランジション

```tsx
<div
  className="
  transition-all
  duration-300
  ease-in-out
  hover:scale-105
"
>
  Hover me
</div>
```

### カスタムアニメーション

```css
/* src/styles/global.css */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
```

## アクセシビリティ

- 適切な ARIA ラベルの使用
- フォーカス可能な要素のアウトライン維持
- 十分なコントラスト比の確保
- キーボードナビゲーションのサポート

## パフォーマンス考慮事項と実装状況

1. **クラス名の最適化**

   - 現状の対応：
     ```tsx
     // components/atoms/Button/styles.ts で共通のスタイルをオブジェクトとして定義
     export const buttonStyles = {
       base: "px-4 py-2 rounded-md",
       variants: {
         /* ... */
       },
     };
     ```
   - 今後の課題：
     - より多くのコンポーネントでスタイルオブジェクトの活用を検討
     - 共通のスタイルパターンの抽出と再利用

2. **動的スタイルの制限**

   - 現状の対応：
     - コンポーネントレベルでの静的なクラス定義を優先
     - 条件分岐が必要な場合は`clsx`を使用して最適化
   - 改善の余地：
     - CSS Variables の活用検討（テーマ切り替えなど）
     - 動的クラスの使用箇所の見直し

3. **バンドルサイズの最適化**

   - 現状の対応：
     ```js
     // tailwind.config.js
     export default {
       content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
     };
     ```
   - 自動的な最適化：
     - 未使用のスタイルは本番ビルド時に自動的に除去
     - Tailwind の設定により、使用されているクラスのみがバンドルに含まれる

4. **モニタリングと改善**
   - 定期的なパフォーマンス計測
     - Lighthouse スコアの確認
     - ビルドサイズの監視
   - 改善が必要な指標：
     - First Contentful Paint (FCP)
     - Largest Contentful Paint (LCP)
     - Total Blocking Time (TBT)

## パフォーマンス改善の TODO

1. [ ] CSS-in-JS ライブラリの導入検討

   - Emotion や styled-components の評価
   - パフォーマンスへの影響を測定

2. [ ] ビルド最適化の強化

   - PostCSS の設定見直し
   - Critical CSS の抽出検討

3. [ ] モニタリングツールの導入
   - パフォーマンスメトリクスの自動計測
   - CI でのパフォーマンステスト実装
