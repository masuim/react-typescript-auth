import { cn } from "@/lib/utils";
import { typographyStyles } from "@/design-system";
import { forwardRef } from "react";

type TextVariant = keyof typeof typographyStyles.text;

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
    const textStyle = typographyStyles.text[variant];

    return (
      <Component ref={ref} className={cn(textStyle, className)} {...props}>
        {children}
      </Component>
    );
  }
);
