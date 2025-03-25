interface CardProps {
  children: React.ReactNode;
  /** カードの幅（Tailwindのクラス名） */
  width?: string;
  /** カードの高さ（Tailwindのクラス名） */
  height?: string;
  /** 追加のパディング（Tailwindのクラス名） */
  padding?: string;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * 白い背景を持つカードコンポーネント
 */
export const Card: React.FC<CardProps> = ({
  children,
  width = "w-full",
  height = "",
  padding = "p-6",
  className = "",
}) => {
  return (
    <div
      className={`bg-card-bg dark:bg-card-bg-dark rounded-card shadow-card ${width} ${height} ${padding} ${className}`}
    >
      {children}
    </div>
  );
};
