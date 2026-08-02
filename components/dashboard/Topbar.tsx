export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-8 py-5">

      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="rounded-xl bg-violet-600 px-5 py-2 font-medium transition hover:bg-violet-500">
          + Upload
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-lg">
          👤
        </div>

      </div>

    </header>
  );
}