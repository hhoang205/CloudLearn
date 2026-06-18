export default function SocialLoginButton({ provider, onClick, disabled }) {
  const initials = provider === "GitHub" ? "GH" : "G";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Tiếp tục với ${provider}`}
      className="flex items-center justify-center gap-2 rounded-full border border-apple-hairline bg-white px-4 py-3 text-sm font-semibold text-apple-text transition hover:border-[#B8B8BD] hover:bg-apple-secondary active:bg-[#E8E8ED] disabled:cursor-not-allowed disabled:bg-apple-secondary disabled:text-apple-muted focus:outline-none focus:ring-2 focus:ring-apple-primary focus:ring-offset-2"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-apple-secondary text-xs font-bold text-apple-text">
        {initials}
      </span>
      {provider}
    </button>
  );
}
