# 型定義ガイドライン

## 型の分類

型定義は以下の 2 つのカテゴリに分類されます：

1. **スキーマ（`schemas/`）**

   - Zod を使用したバリデーションスキーマの定義
   - フォームの入力値の検証ルール
   - 例：`loginSchema`, `registerSchema`
   - スキーマから型を生成する場合は`z.infer`を使用
   - 例：`type LoginFormValues = z.infer<typeof loginSchema>`

2. **型定義（`types/`）**
   - スキーマ以外のすべての型定義
   - ドメインの型（`User`, `Profile`など）
   - API 関連の型（`LoginRequest`, `LoginResponse`など）
   - エラー型（`AuthError`など）
   - その他のインターフェースや型

## 型定義の記法

### interface vs type

型定義には`interface`と`type`の 2 つの方法があります。それぞれの特徴と使い分けは以下の通りです：

#### interface を使用する場合

1. **コンポーネントの Props 型**

   ```typescript
   interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: ButtonVariant;
     size?: ButtonSize;
   }
   ```

2. **オブジェクトの型定義**
   ```typescript
   interface User {
     id: string;
     name: string;
     email: string;
   }
   ```

`interface`を使用する理由：

- 宣言のマージが可能
- オブジェクト指向的な設計が可能
- エラーメッセージが分かりやすい
- IDE のサポートが充実
- 拡張性が高い

#### type を使用する場合

1. **ユニオン型**

   ```typescript
   type ButtonVariant = "default" | "primary" | "secondary";
   ```

2. **インターセクション型**

   ```typescript
   type AdminUser = User & { role: "admin" };
   ```

3. **型エイリアス**
   ```typescript
   type UserId = string;
   ```

`type`を使用する理由：

- ユニオン型やインターセクション型の定義が直感的
- プリミティブ型やリテラル型のエイリアスとして使用しやすい
- より柔軟な型定義が可能

### extends の使用

`extends`で継承する記載方法を採用しています。

```typescript
// 採用している記法
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// その他の記法
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};
```

> **注意**: 上記の 2 つの記法は機能的に同等です。チーム内で統一された記法を使用すれば`&`を使用した記法でも問題ありません。

## ディレクトリ構造

型定義ファイルは以下のディレクトリ構造に従って整理されています：

```
src/
├── features/
│   └── [feature-name]/       # 機能ごとのディレクトリ
│       ├── types/           # 型定義
│       │   ├── index.ts    # 型定義のエクスポート
│       │   └── domain.ts   # ドメインの型定義
│       └── schemas/         # バリデーションスキーマ
│           └── [feature-name]Schemas.ts  # zodで利用するスキーマと関連する型定義
└── types/             　　　　# 現在利用していませんが、共有の型定義が必要になったらこちらに追加予定です。
    └── shared/             # 共有の型定義
        └── index.ts       # 共有型定義のエクスポート
```

## 命名規則

### ファイル名

- ドメイン型定義: `domain.ts`
  - 例: `src/features/auth/types/domain.ts`
- API 関連: `api.ts`
  - 例: `src/features/auth/types/api.ts`
- スキーマ: `[feature-name]Schemas.ts`
  - 例: `authSchemas.ts`

### 型名

- ドメイン型: `[Domain]`
  - 例: `User`, `Profile`
- フォーム値: `[UseCase]FormValues`
  - 例: `LoginFormValues`, `RegisterFormValues`
- エラー: `[Feature]Error`
  - 例: `AuthError`
- API 関連: `[UseCase][Request/Response]`
  - 例: `LoginRequest`, `LoginResponse`

## ベストプラクティス

1. **型定義の分類**

   ```typescript
   // domain.ts - ドメインの型定義
   export interface User {
     id: string;
     name: string;
     email: string;
   }

   // api.ts - API関連の型定義
   export interface LoginRequest {
     email: string;
     password: string;
   }
   ```

2. **スキーマと型定義の連携**

   ```typescript
   // authSchemas.ts
   export const loginSchema = z.object({...});
   export type LoginFormValues = z.infer<typeof loginSchema>;
   ```

3. **エクスポート管理**

   ```typescript
   // types/index.ts
   export * from "./domain";
   export * from "./api";
   ```

4. **型の再利用**

   ```typescript
   // 共通のプロパティを持つ型の定義
   interface BaseUser {
     id: string;
     email: string;
   }

   interface AdminUser extends BaseUser {
     role: "admin";
   }
   ```

## 新しい型定義の追加手順

1. 適切な機能（feature）ディレクトリを選択または作成
2. `types`ディレクトリ内に適切なファイルを作成
   - ドメインの型定義は`domain.ts`
   - API 関連の型は`api.ts`
   - バリデーションスキーマは`schemas/[feature-name]Schemas.ts`
3. JSDoc コメントで型の説明を追加
4. `index.ts`でエクスポートを追加

## 注意事項

1. **型定義ファイルの配置**

   - 機能固有の型定義は各機能の`src/features/[feature-name]/types/`に配置
   - 複数の機能で共有される型定義は`src/types/shared/`に配置
   - スキーマ関連の型定義は`src/features/[feature-name]/schemas/`に配置

2. **型定義の重複防止**

   - 既存の型の再利用を優先
   - 共通の型は適切な場所に抽出
   - 重複する型定義は統合
