# 型定義ガイドライン

## ディレクトリ構造

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

## 命名規則

### インターフェース

- 基本インターフェース: `[Domain]Base`
  - 例: `AuthenticationFormBase`
- 具体的な実装: `[UseCase][Domain]`
  - 例: `LoginFormData`, `RegisterFormData`
- Props: `[ComponentName]Props`
  - 例: `AuthInputProps`

### ファイル

- ドメイン固有のフォーム: `[domain]-forms.ts`
  - 例: `authentication-forms.ts`
- API 関連: `[domain]-[requests/responses].ts`
  - 例: `auth-requests.ts`, `auth-responses.ts`

## ベストプラクティス

1. **継承の活用**

   ```typescript
   interface AuthenticationFormBase {
     email: string;
     password: string;
   }

   interface LoginFormData extends AuthenticationFormBase {}
   ```

2. **ドキュメンテーション**

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

   ```typescript
   // forms/index.ts
   export * from "./authentication-forms";
   ```

4. **型の再利用**
   ```typescript
   // common/utility-types.ts
   export type Nullable<T> = T | null;
   ```

## 新しい型定義の追加手順

1. 適切なドメインディレクトリを選択または作成
2. 命名規則に従ってファイルを作成
3. JSDoc コメントで型の説明を追加
4. `index.ts`でエクスポートを追加
5. 必要に応じて既存の型を継承または拡張

## 注意事項

1. **型定義ファイルの配置**

   - 新しい型定義は必ず`src/types/`以下の適切なサブディレクトリに配置
   - ルートの`src/types/`直下には`index.ts`以外のファイルを配置しない
   - コンポーネント固有の型定義も`src/types/`以下に配置

2. **型定義の重複防止**

   - 既存の型の再利用を優先
   - 重複する型は適切な場所に統合
   - 共通の型は`common`ディレクトリに配置

3. **コンポーネントの型定義**
   - Props インターフェースはコンポーネントファイル内で直接定義
   - 共有される型定義は`src/types/`以下に配置
   - フォームデータの型定義は`src/types/forms/`に配置
