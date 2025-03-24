# React TypeScript Authentication Template

このプロジェクトは、React と TypeScript を使用した認証機能を持つ Web アプリケーションのテンプレートです。

## 技術スタック

- React 19
- TypeScript V5
- Tailwind CSS v4
- React Router v ７
- Zod
- Universal Cookie
- Lucide React
- Zustand

## ドキュメント

プロジェクトの詳細なガイドラインは以下のドキュメントを参照してください：

- [コンポーネント構造ガイドライン](./docs/component-structure.md)
- [型定義ガイドライン](./docs/type-definitions.md)
- [スタイル定義ガイドライン](./docs/styling-guidelines.md)
- [開発用コマンド集](./docs/development-commands.md)

## 機能概要

### 認証機能

- ログインページ
  - Zod によるフォームバリデーション
  - エラーハンドリング
  - トークンベースの認証
  - パスワード表示/非表示切り替え
- トップページ
  - ログイン状態の維持
  - ユーザー情報の表示
  - ログアウト機能

### 状態管理

- ローカルステート: React useState
- コンテキスト: React Context API
- フォーム状態: useFormState と useFormStatus
- 非同期処理: async/await with Server Components
- 認証状態管理: Zustand
- トークン管理: Universal Cookie

## ルーティング

@react-router/fs-routes パッケージを用いたファイルシステムルーティング

## 参考情報

- [React Router 公式ドキュメント（日本語）](https://react-router-docs-ja.techtalk.jp/)
