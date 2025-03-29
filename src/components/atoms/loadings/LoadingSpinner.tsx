import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * 再利用可能なローディングスピナーコンポーネント
 *
 * このコンポーネントは以下のような場所で使用します：
 * - ボタン内のローディング状態
 * - フォームの送信中
 * - 小さなコンテンツの読み込み中
 *
 * - フルスクリーンのローディングは、Loadingコンポーネントを使用してください。
 */
interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-8 w-8",
} as const;

export const LoadingSpinner = ({
  className,
  size = "default",
}: LoadingSpinnerProps) => {
  return (
    <Loader2
      className={cn("animate-spin text-primary", sizeClasses[size], className)}
      aria-hidden="true"
    />
  );
};

