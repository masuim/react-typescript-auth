import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "src/lib/utils";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

const buttonStyles = {
  layout: "inline-flex items-center justify-center whitespace-nowrap",
  appearance: "rounded-md text-sm font-medium",
  interaction:
    "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  state: "disabled:pointer-events-none disabled:opacity-50",

  variants: {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    secondary:
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    destructive:
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline:
      "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },

  sizes: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  },
} as const;

export const buttonVariants = cva(
  [
    buttonStyles.layout,
    buttonStyles.appearance,
    buttonStyles.interaction,
    buttonStyles.state,
  ].join(" "),
  {
    variants: {
      variant: buttonStyles.variants,
      size: buttonStyles.sizes,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariant = keyof typeof buttonStyles.variants;
type ButtonSize = keyof typeof buttonStyles.sizes;
