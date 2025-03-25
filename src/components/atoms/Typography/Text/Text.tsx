/**
 * テキストを表示するためのコンポーネント
 */
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type TextVariant = "default" | "large" | "small" | "subtle" | "muted";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  children: React.ReactNode;
  as?: "p" | "span" | "div";
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { variant = "default", as: Component = "p", className, children, ...props },
    ref
  ) => {
    const textStyle = cn(textStyles[variant], className);

    return (
      <Component ref={ref} className={textStyle} {...props}>
        {children}
      </Component>
    );
  }
);

const textStyles = {
  default: "text-base text-gray-700 dark:text-gray-300",
  large: "text-lg text-gray-700 dark:text-gray-300",
  small: "text-sm text-gray-500 dark:text-gray-400",
  subtle: "text-sm text-gray-500 dark:text-gray-400",
  muted: "text-sm text-gray-400 dark:text-gray-500",
} as const;
