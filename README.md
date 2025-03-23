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

# アーキテクチャ

### Atomic Design

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

# ルーティング

@react-router/fs-routes パッケージを用いたファイルシステムルーティング

## 参考情報

- https://react-router-docs-ja.techtalk.jp/start/framework/installation
- https://react-router-docs-ja.techtalk.jp/start/framework/installation
- https://react-router-docs-ja.techtalk.jp/start/framework/routing
- https://react-router-docs-ja.techtalk.jp/how-to/file-route-conventions

# 初期実行コマンド

```
% npx create-react-router@latest

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

```
% cd [プロジェクト名]

% npm i

% npm run dev
  - Local: http://localhost:5173/
```

## 型定義ガイドライン

### ディレクトリ構造

型定義ファイルは以下のディレクトリ構造に従って整理されています：

```
src/types/
├── common/              # 共通の型定義
│   ├── index.ts        # 共通の型定義のエクスポート
│   ├── utility-types.ts # ユーティリティ型
│   └── shared.ts       # 共有インターフェース
├── forms/              # フォーム関連の型定義
│   ├── index.ts        # フォーム関連の型定義のエクスポート
│   └── [domain]-forms.ts # ドメインごとのフォーム型定義
├── api/                # API関連の型定義
│   ├── index.ts        # API関連の型定義のエクスポート
│   ├── requests.ts     # APIリクエストの型定義
│   └── responses.ts    # APIレスポンスの型定義
└── index.ts            # すべての型定義のエクスポート
```

### 命名規則

#### インターフェース

- 基本インターフェース: `[Domain]Base`
  - 例: `AuthenticationFormBase`
- 具体的な実装: `[UseCase][Domain]`
  - 例: `LoginFormData`, `RegisterFormData`
- Props: `[ComponentName]Props`
  - 例: `AuthInputProps`

#### ファイル

- ドメイン固有のフォーム: `[domain]-forms.ts`
  - 例: `authentication-forms.ts`
- API 関連: `[domain]-[requests/responses].ts`
  - 例: `auth-requests.ts`, `auth-responses.ts`

### 型定義のベストプラクティス

1. **継承の活用**

   - 共通のフィールドは基本インターフェースに定義
   - 具体的な実装は基本インターフェースを継承

   ```typescript
   interface AuthenticationFormBase {
     email: string;
     password: string;
   }

   interface LoginFormData extends AuthenticationFormBase {}
   ```

2. **ドキュメンテーション**

   - 各インターフェースには JSDoc コメントを追加
   - 型の目的と使用方法を明確に説明

   ```typescript
   /**
    * 認証フォームの基本インターフェース
    * ログインと登録フォームの共通フィールドを定義
    */
   interface AuthenticationFormBase {
     // ...
   }
   ```

3. **エクスポート管理**

   - 各ディレクトリに`index.ts`を配置
   - 型定義は名前付きエクスポートを使用

   ```typescript
   // forms/index.ts
   export * from "./authentication-forms";
   ```

4. **型の再利用**
   - ユーティリティ型を活用して重複を避ける
   - 共通の型は`common`ディレクトリに配置
   ```typescript
   // common/utility-types.ts
   export type Nullable<T> = T | null;
   ```

### 新しい型定義の追加

1. 適切なドメインディレクトリを選択または作成
2. 命名規則に従ってファイルを作成
3. JSDoc コメントで型の説明を追加
4. `index.ts`でエクスポートを追加
5. 必要に応じて既存の型を継承または拡張

### 注意事項

1. **型定義ファイルの配置**

   - 新しい型定義は必ず`src/types/`以下の適切なサブディレクトリに配置してください
   - ルートの`src/types/`直下には`index.ts`以外のファイルを配置しないでください
   - 既存の型定義ファイルを見つけた場合は、このガイドラインに従って適切なディレクトリに移動してください
   - コンポーネント固有の型定義も`src/types/`以下の適切なディレクトリに配置してください（コンポーネントディレクトリ内には配置しない）

2. **型定義の重複防止**

   - 新しい型を作成する前に、既存の型が再利用できないか確認してください
   - 同じような型が複数の場所に定義されている場合は、適切な場所に統合してください
   - 共通で使用される型は`common`ディレクトリに配置することを検討してください

3. **コンポーネントの型定義**
   - コンポーネントの Props インターフェースは、そのコンポーネントのファイル内で直接定義してください
   - 複数のコンポーネントで共有される型定義は`src/types/`以下の適切なディレクトリに配置してください
   - フォームデータの型定義は必ず`src/types/forms/`に配置してください

## スタイル定義ガイドライン

### ディレクトリ構造

スタイル定数は以下のディレクトリ構造に従って整理されています：

```
src/styles/
├── components/          # コンポーネント固有のスタイル
│   ├── atoms/          # 原子コンポーネントのスタイル
│   │   ├── input.ts
│   │   ├── button.ts
│   │   └── label.ts
│   ├── molecules/      # 分子コンポーネントのスタイル
│   │   └── auth-input.ts
│   └── organisms/      # 有機体コンポーネントのスタイル
│       └── auth-form.ts
├── common/             # 共通のスタイル定数
│   ├── colors.ts      # カラーパレット
│   ├── spacing.ts     # スペーシング
│   └── typography.ts  # タイポグラフィ
└── index.ts           # すべてのスタイル定数のエクスポート
```

### 命名規則

#### 定数名

- コンポーネントスタイル: `[COMPONENT_NAME]_[VARIANT]_STYLES`
  - 例: `INPUT_BASE_STYLES`, `INPUT_ERROR_STYLES`
- 共通スタイル: `[CATEGORY]_[VARIANT]`
  - 例: `SPACING_SMALL`, `COLOR_PRIMARY`

#### ファイル

- コンポーネントスタイル: `[component-name].ts`
  - 例: `input.ts`, `auth-form.ts`
- 共通スタイル: `[category].ts`
  - 例: `colors.ts`, `typography.ts`

### スタイル定義のベストプラクティス

1. **カテゴリ分け**

   - コンポーネント固有のスタイルは`components/`以下に配置
   - 共通で使用されるスタイルは`common/`以下に配置
   - Atomic Design の階層に従ってディレクトリを分割

2. **定数化**

   - すべてのスタイル文字列は定数として定義
   - 直接文字列をコンポーネントに書かない
   - Tailwind のクラス名も定数として管理

3. **ドキュメンテーション**

   - 各スタイル定数ファイルには JSDoc コメントを追加
   - スタイルの目的と使用方法を明確に説明

4. **エクスポート管理**
   - 各ディレクトリに`index.ts`を配置
   - スタイル定数は名前付きエクスポートを使用

### 注意事項

1. **スタイル定数の配置**

   - 新しいスタイル定数は必ず`src/styles/`以下の適切なサブディレクトリに配置
   - コンポーネントディレクトリ内にスタイル定数を配置しない
   - 既存のスタイル定数を見つけた場合は、このガイドラインに従って適切なディレクトリに移動

2. **スタイルの再利用**
   - 新しいスタイルを作成する前に、既存のスタイルが再利用できないか確認
   - 同じようなスタイルが複数の場所に定義されている場合は、適切な場所に統合
   - 共通で使用されるスタイルは`common`ディレクトリに配置
