interface LoadingProps {
  className?: string;
}

/**
 * フルスクリーンのローディングコンポーネント
 * 画面中央にスピナーを表示します
 */
export const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={`flex justify-center items-center h-screen ${className || ""}`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};
