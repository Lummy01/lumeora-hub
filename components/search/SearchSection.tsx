export default function SearchSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Find Creative Resources
          </h2>

          <p className="mt-4 text-gray-400">
            Search thousands of designs, presentations, documents, images, code,
            and creative assets shared by the community.
          </p>

        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search resources..."
            className="flex-1 rounded-xl border border-white/10 bg-black/20 px-6 py-4 outline-none transition focus:border-violet-500"
          />

          <button className="rounded-xl bg-violet-600 px-8 py-4 font-semibold transition hover:bg-violet-500">
            Search
          </button>

        </div>

      </div>

    </section>
  );
}