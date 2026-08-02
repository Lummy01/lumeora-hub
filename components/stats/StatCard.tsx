type StatCardProps = {
  value: string;
  label: string;
  color: string;
};

export default function StatCard({
  value,
  label,
  color,
}: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">

      <h3 className={`text-5xl font-bold ${color}`}>
        {value}
      </h3>

      <p className="mt-4 text-gray-400">
        {label}
      </p>

    </div>
  );
}