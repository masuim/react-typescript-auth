# React TypeScript Authentication Template

このプロジェクトは、React と TypeScript を使用した認証機能を持つ Web アプリケーションのテンプレートです。

## 技術スタック

- React ^19.0.0
- TypeScript ^5.7.2
- Tailwind CSS ^4.0.15
- React Router ^7.4.0
- React Hook Form ^7.54.2
- Radix UI
- Zod ^3.24.2
- Universal Cookie ^8.0.1
- Lucide React ^0.483.0
- Zustand ^5.0.3
- TanStack Query ^5.69.0

### UI/スタイリングユーティリティ

- class-variance-authority
- clsx
- tailwind-merge

## ドキュメント

プロジェクトの詳細なガイドラインは以下のドキュメントを参照してください：

- [コンポーネント構造ガイドライン](./docs/UI_COMPONENT_STRUCTURE.md)
  - [コンポーネントファイル構造パターン](./docs/UI_COMPONENT_STRUCTURE.md#ファイル構造と命名パターン)
- [型定義ガイドライン](./docs/TYPE_DEFINITIONS.md)
- [スタイル定義ガイドライン](./docs/STYLE_GUIDE.md)
- [開発用コマンド集](./docs/DEVELOPMENT_COMMANDS.md)
- [インポートパスの規約](./docs/IMPORT_PATHS.md)

## コーディング規約

プロジェクト全体で統一されたコードスタイルを維持するために、以下の規約に従ってください：

### コンポーネント定義

- 通常のコンポーネントは全てアロー関数を使用して定義する
  ```typescript
  // 良い例
  const Button = ({ children, ...props }: ButtonProps) => {
    return <button {...props}>{children}</button>;
  };
  ```

### インポートパス

- `src` ディレクトリのファイルは `@/` プレフィックスを使用する
- `app` ディレクトリのファイルは `~/` プレフィックスを使用する
- 詳細は [インポートパスの規約](./docs/IMPORT_PATHS.md) を参照

### ルーティング規約

- URL に表示させないファイル名は先頭にアンダースコア（`_`）をつける
- 認証が必要なページは `_protected` プレフィックスをつけたファイル名にする
- これは、@react-router/fs-routes パッケージ の規約に沿ったルート設定です
  - 例: `_protected.top.tsx` は `/top` でアクセス可能
  - 参考: [ネストされた URL なしのネストされたレイアウト URL](https://react-router-docs-ja.techtalk.jp/how-to/file-route-conventions#%E3%83%8D%E3%82%B9%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F-url-%E3%81%AA%E3%81%97%E3%81%AE%E3%83%8D%E3%82%B9%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88)

## 機能概要

### 認証機能

- ログインページ
  - Zod によるフォームバリデーション
  - エラーハンドリング
  - トークンベースの認証
- トップページ
  - ログイン状態の維持
  - ユーザー情報の表示
  - ログアウト機能

### 状態管理

- ローカルステート: React useState
- フォーム状態: React Hook Form
- サーバーステート管理: TanStack Query（キャッシュ、再取得、無効化など）
- 認証状態管理: Zustand
- トークン管理: Universal Cookie

## ルーティング

@react-router/fs-routes パッケージを用いたファイルシステムルーティング
