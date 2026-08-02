type ResourceRowProps = {
  icon: string;
  title: string;
  type: string;
  updated: string;
};

export default function ResourceRow({
  icon,
  title,
  type,
  updated,
}: ResourceRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-500/30 hover:bg-white/10">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-sm text-gray-400">
            {type}
          </p>
        </div>

      </div>

      <span className="text-sm text-gray-400">
        {updated}
      </span>

    </div>
  );
}