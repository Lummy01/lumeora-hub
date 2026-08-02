import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="glass-card flex w-72 flex-col border-r border-white/10 p-6">

      <h1 className="text-3xl font-bold">
        Lumeora Hub
      </h1>

      <p className="mt-1 text-sm text-gray-400">
        Creator Dashboard
      </p>

      <nav className="mt-10 space-y-2">

        <Link
          href="/dashboard"
          className="block rounded-xl bg-violet-600 px-4 py-3 font-medium"
        >
          📊 Dashboard
        </Link>

        <Link
          href="#"
          className="block rounded-xl px-4 py-3 transition hover:bg-white/5"
        >
          📁 My Resources
        </Link>

        <Link
          href="#"
          className="block rounded-xl px-4 py-3 transition hover:bg-white/5"
        >
          ⬆️ Upload Resource
        </Link>

        <Link
          href="#"
          className="block rounded-xl px-4 py-3 transition hover:bg-white/5"
        >
          👤 Profile
        </Link>

        <Link
          href="#"
          className="block rounded-xl px-4 py-3 transition hover:bg-white/5"
        >
          ⚙️ Settings
        </Link>

      </nav>

    </aside>
  );
}