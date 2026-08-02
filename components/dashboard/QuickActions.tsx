export default function QuickActions() {
  return (
    <div className="glass-card rounded-2xl p-8">

      <h2 className="text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <button className="rounded-xl bg-violet-600 px-6 py-4 text-left font-semibold transition hover:bg-violet-500">
          ⬆️ Upload Resource
        </button>

        <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-left font-semibold transition hover:border-violet-500">
          📁 Manage Resources
        </button>

        <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-left font-semibold transition hover:border-violet-500">
          📊 View Analytics
        </button>

        <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-left font-semibold transition hover:border-violet-500">
          👤 Edit Profile
        </button>

      </div>

    </div>
  );
}