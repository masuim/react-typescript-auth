# デザインシステムガイド

## 概要

このプロジェクトでは、一貫性のあるデザインを実現するために、デザインシステムを採用しています。
デザインシステムは`src/design-system/`ディレクトリで管理されています。

## 基本方針

このプロジェクトでは、Tailwind CSS を主要なスタイリングソリューションとして採用しています。

## ディレクトリ構造

```
src/design-system/
├── index.ts           # エクスポート用
├── button.ts          # ボタン関連のスタイル
├── typography.ts      # タイポグラフィ関連のスタイル
└── tokens.ts          # カラーやスペーシングなどの基本トークン
```

## スタイリング階層

### 1. Atomic Design に基づくスタイリング

- **Atoms（原子）**

  - 基本的な UI コンポーネント（ボタン、入力フィールド、ラベルなど）
  - Tailwind のユーティリティクラスを直接使用
  - 再利用可能な最小単位のスタイル定義

- **Molecules（分子）**

  - Atoms の組み合わせで構成される複合コンポーネント
  - Tailwind のユーティリティクラスを組み合わせて使用
  - 必要に応じて`clsx`を使用して条件付きスタイリング

- **Organisms（有機体）**

  - より複雑な UI セクション
  - レイアウトとコンポーネントの組み合わせに重点

- **Templates（テンプレート）**
  - ページレイアウトの基本構造
  - グリッドシステムとスペーシングの定義
  - レスポンシブデザインの基本設定

### 2. スタイル定義の優先順位

- 基本的には Tailwind のユーティリティクラスを直接使用
- 複雑な条件分岐が必要な場合は`clsx`を使用
- 将来的な拡張性を考慮したコンポーネント設計

## コンポーネントスタイル

### ボタン

ボタンのスタイルは`button.ts`で定義されています。

#### ベーススタイル

```typescript
base: {
  layout: "inline-flex items-center justify-center whitespace-nowrap",
  appearance: "rounded-md text-sm font-medium",
  interaction: "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  state: "disabled:pointer-events-none disabled:opacity-50"
}
```

#### バリアント

- `default`: プライマリカラーのボタン
- `secondary`: セカンダリカラーのボタン
- `destructive`: 削除などの危険な操作用のボタン
- `outline`: アウトラインスタイルのボタン
- `ghost`: ゴーストスタイルのボタン
- `link`: リンクスタイルのボタン

#### サイズ

- `default`: 標準サイズ
- `sm`: 小さいサイズ
- `lg`: 大きいサイズ
- `icon`: アイコンボタン用

### タイポグラフィ

タイポグラフィのスタイルは`typography.ts`で定義されています。

#### 見出し

- `h1` から `h6` までの 6 段階の見出しスタイル
- 各見出しは適切なサイズとウェイトを持ち、スクロール時のマージン調整も含まれています

#### テキスト

- `default`: 標準テキスト
- `large`: 大きめのテキスト
- `small`: 小さめのテキスト
- `subtle`: 控えめなテキスト
- `muted`: 薄い色のテキスト

#### リンク

- `default`: 標準リンク
- `subtle`: 控えめなリンク
- `button`: ボタンとして使用するリンク

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

## 使用方法

### インポート

```typescript
import { buttonStyles, typographyStyles } from "@/design-system";
```

### コンポーネントでの使用例

```typescript
// ボタンの使用例
<button className={buttonStyles.base.layout}>
  Click me
</button>

// 見出しの使用例
<h1 className={typographyStyles.heading.h1}>
  Title
</h1>
```

## カスタマイズ

デザインシステムのスタイルは、プロジェクトの要件に応じて`src/design-system/`ディレクトリ内の各ファイルでカスタマイズできます。

## ベストプラクティス

1. 新しいスタイルを追加する際は、適切なファイルに追加するか、必要に応じて新しいファイルを作成してください
2. コンポーネント固有のスタイルは、そのコンポーネントのディレクトリ内で管理してください
3. 共通のスタイルは、デザインシステムに追加してください
4. 動的スタイルの実装は、コンポーネントレベルでの静的なクラス定義を優先し、条件分岐が必要な場合は`clsx`を使用して最適化してください
