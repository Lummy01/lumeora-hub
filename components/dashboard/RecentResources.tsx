import ResourceRow from "./ResourceRow";

export default function RecentResources() {
  return (
    <div className="glass-card rounded-2xl p-8">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Recent Resources
        </h2>

        <button className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:border-violet-500 hover:bg-white/5">
          View All
        </button>

      </div>

      <div className="space-y-4">

        <ResourceRow
          icon="🎨"
          title="Modern UI Dashboard.fig"
          type="Figma Design"
          updated="2 hours ago"
        />

        <ResourceRow
          icon="📄"
          title="Product Requirements.pdf"
          type="PDF Document"
          updated="Yesterday"
        />

        <ResourceRow
          icon="🖼️"
          title="Landing Page Concept.png"
          type="PNG Image"
          updated="3 days ago"
        />

      </div>

    </div>
  );
}