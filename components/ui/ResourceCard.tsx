type ResourceCardProps = {
  icon: string;
  title: string;
  type: string;
  size: string;
  color: string;
  author?: string;
  downloads?: string;
};

export default function ResourceCard({
  icon,
  title,
  type,
  size,
  color,
  author,
  downloads,
}: ResourceCardProps) {
  return (
    <div
      className={`cursor-pointer rounded-2xl border p-5 transition duration-300 hover:scale-[1.02] hover:shadow-xl ${color}`}
    >
      <div className="flex items-start justify-between">

        <div>
          <div className="text-xl font-semibold">
            {icon} {title}
          </div>

          <p className="mt-2 text-sm text-gray-400">
            {type} • {size}
          </p>
        </div>

        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-300">
          New
        </span>

      </div>

      {(author || downloads) && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">

          <span>👤 {author}</span>

          <span>⬇ {downloads}</span>

        </div>
      )}
    </div>
  );
}