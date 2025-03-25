import { Card } from "@/components/atoms/Card";

interface PageLayoutProps {
  children: React.ReactNode;
  centered?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  cardPadding?: string;
  cardClassName?: string;
  className?: string;
}

/**
 * グレーの背景と白いコンテンツエリアを持つ統一レイアウトコンポーネント
 */
export const PageLayout = ({
  children,
  centered = false,
  maxWidth = "lg",
  cardPadding = "p-6",
  cardClassName = "",
  className = "",
}: PageLayoutProps) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

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
