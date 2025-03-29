import { cn } from "@/lib/utils";

export const linkVariantStyles = {
  default:
    "text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20",
  subtle:
    "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
  button:
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
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
  return cn(linkVariantStyles[variant], className);
};

