import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <section
  id="categories"
  className="mx-auto max-w-7xl px-6 py-24"
>

      <div className="text-center">

        <h2 className="text-4xl font-bold">
          Browse by Category
        </h2>

        <p className="mt-4 text-gray-400">
          Explore creative resources organized into categories.
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <CategoryCard
          icon="🎨"
          title="Design"
          description="UI Kits, Logos, Wireframes, Figma files and creative assets."
        />

        <CategoryCard
          icon="📄"
          title="Documents"
          description="Reports, PDFs, Research papers and documentation."
        />

        <CategoryCard
          icon="🖼️"
          title="Images"
          description="Illustrations, graphics, photographs and digital artwork."
        />

        <CategoryCard
          icon="📊"
          title="Presentations"
          description="Pitch decks, slide templates and presentation resources."
        />

        <CategoryCard
          icon="💻"
          title="Project Files"
          description="Source code, templates, components and development resources."
        />

        <CategoryCard
          icon="🎥"
          title="Media"
          description="Videos, animations, audio files and multimedia content."
        />

      </div>

    </section>
  );
}