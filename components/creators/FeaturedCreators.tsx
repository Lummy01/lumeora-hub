import CreatorCard from "./CreatorCard";

export default function FeaturedCreators() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="text-center">

        <h2 className="text-4xl font-bold">
          Featured Creators
        </h2>

        <p className="mt-4 text-gray-400">
          Meet talented creators sharing amazing resources with the community.
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <CreatorCard
          avatar="👩‍🎨"
          name="Sarah Johnson"
          role="UI/UX Designer"
          resources="128 Resources"
        />

        <CreatorCard
          avatar="👨‍💻"
          name="David Kim"
          role="Frontend Developer"
          resources="94 Resources"
        />

        <CreatorCard
          avatar="🧑‍🎨"
          name="Emma Wilson"
          role="Brand Designer"
          resources="76 Resources"
        />

      </div>

    </section>
  );
}