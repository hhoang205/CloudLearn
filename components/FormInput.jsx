export default function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  error,
  onChange,
  autoComplete,
  disabled,
  required,
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-apple-text">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-2xl border border-apple-hairline bg-white px-4 py-3 text-sm text-apple-text outline-none transition placeholder:text-[#A1A1A6] hover:border-[#B8B8BD] disabled:cursor-not-allowed disabled:bg-apple-secondary disabled:text-apple-muted focus:border-apple-primary focus:ring-2 focus:ring-[#0071E3]/20"
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-apple-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
