/**
 * フォーム要素のラベルを表示するためのコンポーネント
 */
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

/**
 * Labelコンポーネントのプロパティ
 * @property {LabelVariant} [variant] - ラベルのバリアント
 * - default: 通常のラベル
 * - required: 必須項目を示す赤いアスタリスク付き
 * - optional: 任意項目を示す「(任意)」テキスト付き
 */
interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  variant?: LabelVariant;
}

export const Label = forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, className }))}
    {...props}
  />
));

const labelStyles = {
  base: "text-sm font-medium leading-none",
  disabled: "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  variants: {
    default: "",
    required: "after:text-destructive after:content-['*'] after:ml-0.5",
    optional:
      "after:text-muted-foreground after:content-['(任意)'] after:ml-1 after:text-xs",
  },
} as const;

const labelVariants = cva([labelStyles.base, labelStyles.disabled].join(" "), {
  variants: {
    variant: labelStyles.variants,
  },
  defaultVariants: {
    variant: "default",
  },
});

type LabelVariant = keyof typeof labelStyles.variants;
