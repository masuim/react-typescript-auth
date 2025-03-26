# UI コンポーネント構造ガイドライン

## ディレクトリ構造

各コンポーネントは以下の構造に従って整理されています：

```
components/
  ├── atoms/          # 最小単位のコンポーネント
  ├── molecules/      # 複数のatomsで構成されるコンポーネント
  ├── organisms/      # 複数のmoleculesで構成されるコンポーネント
  └── templates/      # ページレイアウトのテンプレート
```

## Atomic Design パターン

コンポーネントは Atomic Design の原則に従って以下のように分類されています：

- **atoms**: 最小単位のコンポーネント

  - Button, Input, Label など
  - これ以上分解できない基本的な UI 要素

- **molecules**: 複数の atoms で構成

  - AuthInput, SubmitButton など
  - 特定の機能を持つ小さな UI ブロック

- **organisms**: 複数の molecules で構成

  - AuthForm など
  - 特定のドメインロジックを含む大きな UI ブロック

- **templates**: ページレイアウトのテンプレート
  - 複数の organisms を配置するレイアウト
  - ページの基本構造を定義

## ファイル構造と命名パターン

### コンポーネントファイルとエクスポートファイルの分離

プロジェクトでは、コンポーネントファイル（例：`Card.tsx`）とエクスポートファイル（`index.tsx`）を分離するパターンを採用しています。

```typescript
// Card.tsx - コンポーネントの実装
export const Card = ({ children, ...props }: CardProps) => {
  // 実装
};

// index.tsx - エクスポート
export * from "./Card";
```

#### このパターンの採用理由

1. **明確なコンポーネント識別**:

   - コンポーネント名とファイル名が一致し、コードの検索や理解が容易になる
   - エディタでのタブやファイル検索時に区別しやすい

2. **拡張の容易さ**:

   - 将来的にディレクトリ内に関連コンポーネントを追加する際に適切な構造が維持できる
   - 例: `Card` ディレクトリに後から `CardHeader`, `CardFooter` などを追加できる

3. **リファクタリングの柔軟性**:

   - コンポーネントの移動や名前変更が容易になる
   - インポートパスを変更せずに内部実装を変更できる

4. **パブリック API 管理**:

   - `index.tsx` で公開するコンポーネントや型を明示的に制御できる
   - 内部実装の詳細を隠蔽し、必要なものだけをエクスポートできる

## ファイル名の命名規則

プロジェクトでは、ファイルの種類に応じて以下の命名規則を採用しています：

### コンポーネントファイル

- パスカルケース（PascalCase）を使用
- 例：`Button.tsx`, `UserProfile.tsx`
- コンポーネントの名前と一致させる

### カスタムフックファイル

- パスカルケース（PascalCase）で`use`で始める
  - 例：`useAuth.ts`, `useForm.ts`
  - React の公式ドキュメントに準拠した命名規則

### ユーティリティファイル

- ケバブケース（kebab-case）を使用
  - 例：`use-auth.ts`, `date-utils.ts`

### テストファイル

- テスト対象のファイル名に`.test.ts`または`.test.tsx`
  - 例：`Button.test.tsx`

## 新しい UI コンポーネントの追加手順

1. コンポーネントの分類を決定（atom, molecule, organism, template）
2. 適切なディレクトリを作成
3. 必要なファイルを作成（index.tsx 漏れに注意）
4. 必要に応じてテスト、Storybook を追加
