export const typographyStyles = {
  heading: {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
  },

  text: {
    default: "text-base text-gray-700 dark:text-gray-300",
    large: "text-lg text-gray-700 dark:text-gray-300",
    small: "text-sm text-gray-500 dark:text-gray-400",
    subtle: "text-sm text-gray-500 dark:text-gray-400",
    muted: "text-sm text-gray-400 dark:text-gray-500",
  },

  link: {
    default:
      "text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20",
    subtle:
      "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
    button:
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  },
} as const;
