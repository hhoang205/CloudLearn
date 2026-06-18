import Icon from "./Icon";

export default function Avatar({ src, alt, size = 96, editable = false, onEdit }) {
  return (
    <div className="relative inline-block">
      {/* External avatar URL -> standard img per Next.js guidance for remote hosts */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="rounded-3xl border-4 border-sky-100 object-cover"
      />
      {editable && (
        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit avatar"
          className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-white shadow transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
        >
          <Icon name="pencil" size={16} />
        </button>
      )}
    </div>
  );
}
