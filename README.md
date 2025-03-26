# React TypeScript Authentication Template

このプロジェクトは、React と TypeScript を使用した認証機能を持つ Web アプリケーションのテンプレートです。

## 技術スタック

- React ^19.0.0
- TypeScript ^5.7.2
- Tailwind CSS ^4.0.15
- React Router ^7.4.0

その他の依存関係については、`package.json`を参照してください。

## ドキュメント

プロジェクトの詳細なガイドラインは以下のドキュメントを参照してください：

- [コンポーネント構造ガイドライン](./docs/UI_COMPONENT_STRUCTURE.md)
- [型定義ガイドライン](./docs/TYPE_DEFINITIONS.md)
- [スタイル定義ガイドライン](./docs/STYLE_GUIDE.md)
- [開発用コマンド集](./docs/DEVELOPMENT_COMMANDS.md)
- [インポートパスの規約](./docs/IMPORT_PATHS.md)

## コーディング規約

プロジェクト全体で統一されたコードスタイルを維持するために、以下の規約に従ってください：

### コンポーネント定義

- 通常のコンポーネントは全てアロー関数を使用して定義する
  ```typescript
  const Button = ({ children, ...props }: ButtonProps) => {
    return <button {...props}>{children}</button>;
  };
  ```

### インポートパス

- `src` ディレクトリのファイルは `@/` プレフィックスを使用する
- `app` ディレクトリのファイルは `~/` プレフィックスを使用する
  - 詳細は [インポートパスの規約](./docs/IMPORT_PATHS.md) を参照

### ルーティング規約

@react-router/fs-routes パッケージを用いたファイルシステムルーティング

- URL に表示させないファイル名は先頭にアンダースコア（`_`）をつける
- 認証が必要なページは `_protected` プレフィックスをつけたファイル名にする
  - 例: `_protected.top.tsx` は `/top` でアクセス可能

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
