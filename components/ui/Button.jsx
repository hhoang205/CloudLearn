import Spinner from "./Spinner";

// Reusable button with hover / active / disabled / loading states.
const VARIANTS = {
  primary:
    "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 focus-visible:ring-sky-500 disabled:bg-sky-300",
  secondary:
    "border border-sky-200 bg-white text-sky-700 hover:bg-sky-50 active:bg-sky-100 focus-visible:ring-sky-400 disabled:text-sky-300 disabled:border-sky-100",
  dark:
    "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus-visible:ring-slate-700 disabled:bg-slate-400",
  ghost:
    "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-slate-300 disabled:text-slate-300",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  block: "w-full px-6 py-3 text-sm",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {isLoading && <Spinner size={16} />}
      {children}
    </button>
  );
}
