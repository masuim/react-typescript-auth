import * as React from "react";
import { cn } from "../../../lib/utils";
import { theme } from "../../../config/theme";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * 見出しのレベル（h1-h6）
   */
  level: HeadingLevel;
  /**
   * 見出しのテキスト
   */
  children: React.ReactNode;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, className, children, ...props }, ref) => {
    const Component = level;
    const headingStyle = theme.typography.heading[level];

    return (
      <Component ref={ref} className={cn(headingStyle, className)} {...props}>
        {children}
      </Component>
    );
  }
);
