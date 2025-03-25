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

## 動的スタイル

- 現状の対応：
  - コンポーネントレベルでの静的なクラス定義を優先
  - 条件分岐が必要な場合は`clsx`を使用して最適化
