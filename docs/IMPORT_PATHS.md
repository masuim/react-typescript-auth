# インポートパスの規約

このプロジェクトでは、パスエイリアスを使用したインポート方式を採用しています。

## エイリアスの設定

以下のエイリアスが `tsconfig.json` で設定されています：

- `@/*`: `src` ディレクトリからのパス
- `~/*`: `app` ディレクトリからのパス

## 使用方法

### `@` エイリアス（src ディレクトリ）

`src` ディレクトリ内のファイルをインポートする場合は、`@` プレフィックスを使用します：

```typescript
// 良い例
import { Button } from "@/components/atoms/LinkAndButton/Button/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";

// 避けるべき例
import { Button } from "../../atoms/LinkAndButton/Button/Button";
import { cn } from "../../../lib/utils";
import { useAuth } from "src/features/auth/hooks/useAuth";
```

### `~` エイリアス（app ディレクトリ）

`app` ディレクトリ内のファイルをインポートする場合は、`~` プレフィックスを使用します：

```typescript
// 良い例
import { RootLayout } from "~/layouts/RootLayout";
import type { RouteConfig } from "~/types/routes";

// 避けるべき例
import { RootLayout } from "../../layouts/RootLayout";
import type { RouteConfig } from "../types/routes";
```

## メリット

1. **可読性の向上**: 長い相対パス（`../../../`）が不要になり、コードが読みやすくなります
2. **リファクタリングの容易さ**: ファイルを移動しても、インポートパスを変更する必要がなくなります
3. **一貫性**: プロジェクト全体で統一された方法でインポートを記述できます

## 設定の詳細

このエイリアス設定は以下のファイルで定義されています：

- `tsconfig.json`: TypeScript のパス解決設定
- `vite.config.ts`: Vite のエイリアス設定（vite-tsconfig-paths プラグインを使用）

エイリアスを追加または変更する場合は、これらのファイルを更新してください。
