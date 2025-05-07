import { twMerge } from "tailwind-merge";

// Utility function to convert Tailwind classes to a style object
const twStyle = (classes) => ({
  className: twMerge(classes),
});

// Common base styles for all toasts
const baseStyles = `
  rounded-xl p-4 text-sm font-medium font-inter
  transition-all duration-300 ease-in-out
  flex items-center gap-2 max-w-sm mx-auto my-2
  shadow-lg hover:shadow-xl
  focus:ring-2 focus:ring-offset-2
  toast-slide-in
  bg-opacity-90 backdrop-blur-sm
  bg-gradient-to-r from-gray-900 to-gray-800
  dark:from-gray-950 dark:to-gray-900
  text-white
`;

// Toast styles for each type
const toastStyles = {
  error: {
    style: twStyle(`
      ${baseStyles}
      border-l-4 border-red-600
      focus:ring-red-600
    `),
    iconTheme: {
      primary: "#fff",
      secondary: "#dc2626",
    },
  },
  success: {
    style: twStyle(`
      ${baseStyles}
      border-l-4 border-green-600
      focus:ring-green-600
    `),
    iconTheme: {
      primary: "#fff",
      secondary: "#16a34a",
    },
  },
  info: {
    style: twStyle(`
      ${baseStyles}
      border-l-4 border-blue-600
      text-base font-semibold
      focus:ring-blue-600
    `),
    iconTheme: {
      primary: "#fff",
      secondary: "#2563eb",
    },
  },
  warning: {
    style: twStyle(`
      ${baseStyles}
      border-l-4 border-amber-600
      text-base font-semibold
      focus:ring-amber-600
    `),
    iconTheme: {
      primary: "#fff",
      secondary: "#d97706",
    },
  },
  loading: {
    style: twStyle(`
      ${baseStyles}
      border-l-4 border-gray-600
      focus:ring-gray-600
    `),
    iconTheme: {
      primary: "#fff",
      secondary: "#4b5563",
    },
  },
  compact: {
    style: twStyle(`
      rounded-lg p-2 text-xs font-medium font-inter
      transition-all duration-300 ease-in-out
      flex items-center gap-1 max-w-xs mx-auto my-1
      shadow-md hover:shadow-lg
      focus:ring-2 focus:ring-offset-1
      toast-slide-in
      bg-opacity-80 backdrop-blur-sm
      bg-gradient-to-r from-gray-800 to-gray-700
      dark:from-gray-900 dark:to-gray-800
      text-gray-200
      border-l-2 border-gray-500
      focus:ring-gray-500
    `),
    iconTheme: {
      primary: "#fff",
      secondary: "#6b7280",
    },
  },
};

export default toastStyles;