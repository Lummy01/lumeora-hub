"use client";

type ResourceSearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function ResourceSearch({
  search,
  setSearch,
}: ResourceSearchProps) {
  return (
    <div className="glass-card rounded-2xl p-6">

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search your resources..."
        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      />

    </div>
  );
}