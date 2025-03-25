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
  - [コンポーネントファイル構造パターン](./docs/component-structure.md#ファイル構造と命名パターン)
- [型定義ガイドライン](./docs/type-definitions.md)
- [スタイル定義ガイドライン](./docs/styling-guidelines.md)
- [開発用コマンド集](./docs/development-commands.md)

## コーディング規約

プロジェクト全体で統一されたコードスタイルを維持するために、以下の規約に従ってください：

### コンポーネント定義

- 通常のコンポーネントは全てアロー関数を使用して定義する
  ```typescript
  // 良い例
  const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return <button {...props}>{children}</button>;
  };
  ```

### ルーティング規約

- URL に表示させないファイル名は先頭にアンダースコア（`_`）をつける
- 認証が必要なページは `_protected` プレフィックスをつけたファイル名にする
- これは、@react-router/fs-routes パッケージ の規約に沿ったルート設定です
  - 例: `_protected.top.tsx` は `/top` でアクセス可能
  - 参考: [ネストされた URL なしのネストされたレイアウト URL](https://react-router-docs-ja.techtalk.jp/how-to/file-route-conventions#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AE%E3%83%8D%E3%82%B9%E3%83%88%E3%81%AA%E3%81%97%E3%81%AE%E3%83%8D%E3%82%B9%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F-url:~:text=%E5%89%8A%E9%99%A4%E3%81%97%E3%81%BE%E3%81%99%E3%80%82-,%E3%83%8D%E3%82%B9%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F%20URL%20%E3%81%AA%E3%81%97%E3%81%AE%E3%83%8D%E3%82%B9%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88,-%E3%81%93%E3%82%8C%E3%82%89%E3%82%92%20%E3%83%91%E3%82%B9)

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
