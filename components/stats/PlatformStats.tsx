import StatCard from "./StatCard";

export default function PlatformStats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="text-center">

        <h2 className="text-4xl font-bold">
          Platform Statistics
        </h2>

        <p className="mt-4 text-gray-400">
          A growing creative community powered by decentralized storage.
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <StatCard
          value="12K+"
          label="Resources Shared"
          color="text-violet-400"
        />

        <StatCard
          value="2.5K+"
          label="Creators"
          color="text-blue-400"
        />

        <StatCard
          value="95K+"
          label="Downloads"
          color="text-green-400"
        />

        <StatCard
          value="150+"
          label="Categories"
          color="text-orange-400"
        />

      </div>

    </section>
  );
}