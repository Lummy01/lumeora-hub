type ActivityItemProps = {
  icon: string;
  action: string;
  time: string;
};

export default function ActivityItem({
  icon,
  action,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-xl">
          {icon}
        </div>

        <p className="font-medium">
          {action}
        </p>

      </div>

      <span className="text-sm text-gray-400">
        {time}
      </span>

    </div>
  );
}