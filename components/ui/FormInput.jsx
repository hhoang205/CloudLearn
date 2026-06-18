import { forwardRef, useId } from "react";

/**
 * Accessible labelled input with error + helper text.
 * Supports `as="select"` for dropdowns so all fields share one component.
 */
const FormInput = forwardRef(function FormInput(
  {
    label,
    type = "text",
    error,
    helperText,
    required = false,
    as = "input",
    children,
    className = "",
    id,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  const describedBy =
    [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(" ") || undefined;

  const baseField =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400";
  const stateField = error
    ? "border-red-300 focus:border-red-400 focus:ring-red-200"
    : "border-slate-200 focus:border-sky-400 focus:ring-sky-200";

  const fieldClass = `${baseField} ${stateField} ${className}`;

  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="mb-1 block text-sm font-medium text-slate-700">
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {as === "select" ? (
        <select
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={fieldClass}
          {...rest}
        >
          {children}
        </select>
      ) : (
        <input
          ref={ref}
          id={fieldId}
          type={type}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={fieldClass}
          {...rest}
        />
      )}

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1.5 text-xs text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default FormInput;
