import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { LinkVariant } from "@/components/atoms/links-and-buttons/styles/link-styles";
import { linkVariants } from "@/components/atoms/links-and-buttons/styles/link-styles";

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  children: React.ReactNode;
  className?: string;
}

/**
 * 外部リンクコンポーネント
 * target="_blank"とrel="noopener noreferrer"を設定しています
 */
export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          linkVariants({
            variant,
            className,
          })
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

