import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:placeholder:text-gray-500",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      hasError: {
        true: "border-red-500 focus-visible:ring-red-500 dark:border-red-400",
        false: "",
      },
    },
    compoundVariants: [
      {
        hasError: false,
        className:
          "border-gray-300 focus-visible:ring-blue-500 dark:border-gray-600 dark:focus-visible:ring-blue-400",
      },
    ],
    defaultVariants: {
      size: "md",
      hasError: false,
    },
  },
);
