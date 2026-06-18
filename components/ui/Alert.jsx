import Icon from "./Icon";

// Inline feedback banner used for form-level success / error messages.
const STYLES = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-red-200 bg-red-50 text-red-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

export default function Alert({ variant = "info", children }) {
  if (!children) return null;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${STYLES[variant]}`}
    >
      {variant === "success" && <Icon name="check" size={18} className="mt-0.5 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}
