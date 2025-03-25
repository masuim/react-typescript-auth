import { Card } from "@/components/atoms/Card/Card";

interface PageLayoutProps {
  children: React.ReactNode;
  /** コンテンツを中央に配置するかどうか */
  centered?: boolean;
  /** コンテンツの最大幅 */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** カードのパディング */
  cardPadding?: string;
  /** カードのクラス名 */
  cardClassName?: string;
  /** レイアウトのクラス名 */
  className?: string;
}

/**
 * グレーの背景と白いコンテンツエリアを持つ統一レイアウトコンポーネント
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  centered = false,
  maxWidth = "lg",
  cardPadding = "p-6",
  cardClassName = "",
  className = "",
}) => {
  // 最大幅の設定
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  // centeredフラグに基づいて適用するクラスを決定
  const centeredClasses = centered ? "flex items-center justify-center" : "";

  return (
    <div className={`bg-page-bg dark:bg-page-bg-dark ${className}`}>
      <div
        className={`mx-auto px-4 sm:px-6 ${maxWidthClasses[maxWidth]} ${centeredClasses}`}
      >
        <Card padding={cardPadding} className={cardClassName}>
          {children}
        </Card>
      </div>
    </div>
  );
};
