# 開発用コマンド集

## プロジェクト初期設定

### プロジェクト作成

```bash
% npx create-react-router@latest

Need to install the following packages:
create-react-router@7.4.0
Ok to proceed? (y) y

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
```

### 初期セットアップ

```bash
# プロジェクトディレクトリに移動
cd [プロジェクト名]

# 依存関係のインストール
npm i

# 開発サーバーの起動
npm run dev
  - Local: http://localhost:5173/
```

## 日常的な開発コマンド

### 開発サーバー

```bash
# 開発サーバーの起動
npm run dev

# 特定のポートで起動
npm run dev -- --port 3000
```

### ビルドとプレビュー

```bash
# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview
```

### テスト

```bash
# テストの実行
npm run test

# 特定のテストファイルの実行
npm run test [ファイル名]

# ウォッチモードでテスト実行
npm run test:watch
```

### リント

```bash
# リントの実行
npm run lint

# リント自動修正
npm run lint:fix
```

### 型チェック

```bash
# 型チェックの実行
npm run typecheck
```

## その他の有用なコマンド

### 依存関係の管理

```bash
# 新しいパッケージのインストール
npm install [パッケージ名]

# 開発用パッケージのインストール
npm install -D [パッケージ名]

# パッケージの削除
npm uninstall [パッケージ名]

# 依存関係の更新
npm update
```

### Git 関連

```bash
# ブランチの作成と切り替え
git checkout -b feature/[機能名]

# 変更のステージング
git add .

# コミット
git commit -m "feat: 機能の追加"

# プッシュ
git push origin feature/[機能名]
```

## トラブルシューティング

### よくある問題と解決方法

1. **依存関係のエラー**

   ```bash
   # node_modulesの削除
   rm -rf node_modules
   # パッケージロックファイルの削除
   rm package-lock.json
   # 依存関係の再インストール
   npm install
   ```

2. **キャッシュのクリア**

   ```bash
   # npmキャッシュのクリア
   npm cache clean --force
   ```

3. **ビルドエラー**
   ```bash
   # distディレクトリの削除
   rm -rf dist
   # 再ビルド
   npm run build
   ```
