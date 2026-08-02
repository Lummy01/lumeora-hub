import ResourceItem from "./ResourceItem";

type ResourcesListProps = {
  search: string;
};

export default function ResourcesList({
  search,
}: ResourcesListProps) {

  const resources = [
    {
      icon: "🎨",
      title: "Modern UI Dashboard.fig",
      type: "Figma Design",
    },
    {
      icon: "📄",
      title: "Product Requirements.pdf",
      type: "PDF Document",
    },
    {
      icon: "🖼️",
      title: "Landing Page Concept.png",
      type: "PNG Image",
    },
  ];

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-card rounded-2xl p-6">

      <h2 className="text-2xl font-bold">
        All Resources
      </h2>

      <div className="mt-6 space-y-4">

  {filteredResources.length > 0 ? (
    filteredResources.map((resource) => (
      <ResourceItem
        key={resource.title}
        icon={resource.icon}
        title={resource.title}
        type={resource.type}
      />
    ))
  ) : (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center">

      <div className="text-5xl">🔍</div>

      <h3 className="mt-4 text-xl font-semibold">
        No resources found
      </h3>

      <p className="mt-2 text-gray-400">
        Try another search term.
      </p>

    </div>
  )}

</div>

    </div>
  );
}