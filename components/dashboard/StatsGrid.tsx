import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Resources"
        value="128"
        icon="📁"
      />

      <StatCard
        title="Downloads"
        value="24.8K"
        icon="⬇️"
      />

      <StatCard
        title="Followers"
        value="1.2K"
        icon="👥"
      />

      <StatCard
        title="Storage Used"
        value="2.3 GB"
        icon="💾"
      />

    </div>
  );
}