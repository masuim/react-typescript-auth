/**
 * アプリケーション全体で使用されるテーマの設定
 */

export const theme = {
  button: {
    /**
     * ボタンのベーススタイル
     */
    base: {
      layout: "inline-flex items-center justify-center whitespace-nowrap",
      appearance: "rounded-md text-sm font-medium",
      interaction:
        "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      state: "disabled:pointer-events-none disabled:opacity-50",
    },

    /**
     * ボタンのバリアント
     */
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

    /**
     * ボタンのサイズ
     */
    sizes: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },

  typography: {
    /**
     * 見出し用のスタイル設定
     */
    heading: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
    },

    /**
     * 本文用のスタイル設定
     */
    text: {
      default: "text-base text-gray-700 dark:text-gray-300",
      large: "text-lg text-gray-700 dark:text-gray-300",
      small: "text-sm text-gray-500 dark:text-gray-400",
      subtle: "text-sm text-gray-500 dark:text-gray-400",
      muted: "text-sm text-gray-400 dark:text-gray-500",
    },

    /**
     * リンク用のスタイル設定
     */
    link: {
      default:
        "text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20",
      subtle:
        "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
      button:
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    },
  },
} as const;
