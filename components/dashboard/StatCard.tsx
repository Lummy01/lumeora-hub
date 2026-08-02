type StatCardProps = {
  title: string;
  value: string;
  icon: string;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {value}
          </h3>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/15 text-3xl">
          {icon}
        </div>

      </div>

    </div>
  );
}