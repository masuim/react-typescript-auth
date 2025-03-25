import { cn } from "@/lib/utils";

export const linkBaseStyles =
  "inline-flex items-center justify-center transition-colors hover:text-accent-foreground/80 underline-offset-4";

export const linkVariantStyles = {
  default: "text-foreground hover:underline",
  muted: "text-muted-foreground hover:text-muted-foreground/80",
  accent: "text-accent-foreground hover:text-accent-foreground/80",
  destructive: "text-destructive hover:text-destructive/80",
} as const;

export type LinkVariant = keyof typeof linkVariantStyles;

interface LinkVariantsProps {
  variant?: LinkVariant;
  className?: string;
}

export const linkVariants = ({
  variant = "default",
  className,
}: LinkVariantsProps) => {
  return cn(linkBaseStyles, linkVariantStyles[variant], className);
};
