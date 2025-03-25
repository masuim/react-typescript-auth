import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";
import { forwardRef } from "react";

type TextVariant = keyof typeof theme.typography.text;

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * テキストのバリアント
   * @default "default"
   */
  variant?: TextVariant;
  /**
   * テキストの内容
   */
  children: React.ReactNode;
  /**
   * HTML要素の指定
   * @default "p"
   */
  as?: "p" | "span" | "div";
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { variant = "default", as: Component = "p", className, children, ...props },
    ref
  ) => {
    const textStyle = theme.typography.text[variant];

    return (
      <Component ref={ref} className={cn(textStyle, className)} {...props}>
        {children}
      </Component>
    );
  }
);
