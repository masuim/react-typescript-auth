# React TypeScript Authentication Template

このプロジェクトは、React と TypeScript を使用した認証機能を持つ Web アプリケーションのテンプレートです。

## 技術スタック

- React 19
- TypeScript
- Tailwind CSS v4
- React Router v ７
- Zod
- Universal Cookie
- Lucide React
- Zustand

# アーキテクチャ

** Atomic Design **

- atoms: 最小単位のコンポーネント（Button, Input, Label など）
- molecules: 複数の atoms で構成（AuthInput, SubmitButton など）
- organisms: 複数の molecules で構成（AuthForm など）
- templates: ページレイアウトのテンプレート
- pages: ページコンポーネント

```
src/
  ├── components/
  │   ├── atoms/
  │   │   ├── Button/
  │   │   ├── Input/
  │   │   └── Label/
  │   ├── molecules/
  │   │   ├── AuthInput/
  │   │   └── SubmitButton/
  │   └── organisms/
  │       └── AuthForm/
  ├── templates/
  │   └── AuthLayout/
  └── pages/
      ├── Login/
      └── Dashboard/
```

# 機能概要

** 認証機能 **

- ログインページ
  - Zod によるフォームバリデーション
  - エラーハンドリング
  - トークンベースの認証
  - パスワード表示/非表示切り替え
- トップページ
  - ログイン状態の維持
  - ユーザー情報の表示
  - ログアウト機能

** 状態管理 **

- ローカルステート: React useState
- コンテキスト: React Context API
- フォーム状態: useFormState と useFormStatus
- 非同期処理: async/await with Server Components
- 認証状態管理: Zustand

- トークン管理: Universal Cookie

# ルーティング

@react-router/fs-routes パッケージを用いたファイルシステムルーティング

## 参考情報

- https://react-router-docs-ja.techtalk.jp/start/framework/installation
- https://react-router-docs-ja.techtalk.jp/start/framework/installation
- https://react-router-docs-ja.techtalk.jp/start/framework/routing
- https://react-router-docs-ja.techtalk.jp/how-to/file-route-conventions

# 初期実行コマンド

% npx create-react-router@latest

```
Need to install the following packages:
create-react-router@7.4.0
Ok to proceed? (y) y
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported

         create-react-router v7.4.0

   dir   Where should we create your new project?
         react-typescript-auth

      ◼  Using default template See https://github.com/remix-run/react-router-templates for more
      ✔  Template copied

   git   Initialize a new git repository?
         No

  deps   Install dependencies with npm?
         Yes

      ✔  Dependencies installed

  done   That's it!

         Enter your project directory using cd ./react-typescript-auth
         Check out README.md for development and deploy instructions.

         Join the community at https://rmx.as/discord
```

% cd [プロジェクト名]

% npm i

% npm run dev
Local: http://localhost:5173/
