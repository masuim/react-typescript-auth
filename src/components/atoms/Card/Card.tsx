interface CardProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  className?: string;
}

/**
 * 白い背景を持つカードコンポーネント
 */
export const Card = ({
  children,
  width = "w-full",
  height = "",
  padding = "p-6",
  className = "",
}: CardProps) => {
  return (
    <div
      className={`bg-card-bg dark:bg-card-bg-dark rounded-card shadow-card ${width} ${height} ${padding} ${className}`}
    >
      {children}
    </div>
  );
};
