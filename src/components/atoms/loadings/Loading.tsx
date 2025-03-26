/**
 * フルスクリーンローディングコンポーネント
 *
 * このコンポーネントは以下のような場所で使用します：
 * - ページ全体のローディング状態
 * - 大きなコンテンツの読み込み中
 * - アプリケーションの初期化中
 *
 * - 部分的なローディングは、LoadingSpinnerコンポーネントを使用してください。
 *
 */
interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={`flex justify-center items-center h-screen ${className || ""}`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};
