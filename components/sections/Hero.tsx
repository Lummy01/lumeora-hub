import ResourceCard from "../ui/ResourceCard";

export default function Hero() {
  return (
    <section
  id="home"
  className="relative flex min-h-screen items-center overflow-hidden px-6 pt-36"
>

      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            ✨ Powered by Shelby Decentralized Storage
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">

            The Home for
            <br />

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              Creative Portfolios
            </span>

            <br />

            & Resources

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">

            <span className="font-semibold text-white">
              Lumeora Hub
            </span>{" "}
            is a decentralized platform where creators showcase portfolios,
            upload creative resources, and securely share files powered by
            Shelby. Discover inspiration, collaborate, and grow your creative
            presence.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <button className="rounded-xl bg-violet-600 px-8 py-4 font-semibold transition hover:scale-105 hover:bg-violet-500">
              Explore Resources
            </button>

            <button className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:border-violet-500 hover:bg-white/5">
              Start Sharing
            </button>

          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">

            <div>✅ Secure Storage</div>

            <div>✅ Fast Downloads</div>

            <div>✅ Creator Profiles</div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative hidden lg:block">

          <div className="absolute left-6 top-10 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 backdrop-blur-xl">
  🚀 12K+ Resources
</div>

<div className="absolute right-6 bottom-16 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 backdrop-blur-xl">
  🌍 Global Creators
</div>

          <div className="glass-card rounded-3xl p-8">

  <div className="mb-6 flex items-center justify-between">

    <div>
      <h3 className="text-xl font-bold text-white">
        Trending Resources
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        Popular uploads from the community
      </p>
    </div>

    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
      Live
    </span>

  </div>

  <div className="space-y-5">

              <ResourceCard
                icon="🎨"
                title="UI Design.fig"
                type="Design"
                size="2.3 MB"
                color="border-violet-500/20 bg-violet-500/10 hover:border-violet-500/40"
              />

              <ResourceCard
                icon="📄"
                title="Product Requirements.pdf"
                type="Document"
                size="1.4 MB"
                color="border-blue-500/20 bg-blue-500/10 hover:border-blue-500/40"
              />

              <ResourceCard
                icon="🖼️"
                title="Landing Page.png"
                type="Image"
                size="5.8 MB"
                color="border-green-500/20 bg-green-500/10 hover:border-green-500/40"
              />

              <ResourceCard
                icon="📊"
                title="Pitch Deck.pptx"
                type="Presentation"
                size="8.6 MB"
                color="border-orange-500/20 bg-orange-500/10 hover:border-orange-500/40"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}