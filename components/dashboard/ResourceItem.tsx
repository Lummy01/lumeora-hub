type ResourceItemProps = {
  icon: string;
  title: string;
  type: string;
};

export default function ResourceItem({
  icon,
  title,
  type,
}: ResourceItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-500/30 hover:bg-white/10">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-3xl">
          {icon}
        </div>

        <div>

          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="text-sm text-gray-400">
            {type}
          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500">
          Edit
        </button>

        <button className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10">
          Delete
        </button>

      </div>

    </div>
  );
}
