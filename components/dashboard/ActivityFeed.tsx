import ActivityItem from "./ActivityItem";

export default function ActivityFeed() {
  return (
    <div className="glass-card rounded-2xl p-8">

      <h2 className="text-2xl font-bold">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">

        <ActivityItem
          icon="🟢"
          action='Uploaded "Modern UI Dashboard.fig"'
          time="5 min ago"
        />

        <ActivityItem
          icon="🔵"
          action='Updated "Landing Page Concept.png"'
          time="Yesterday"
        />

        <ActivityItem
          icon="🟣"
          action='Downloaded "Product Requirements.pdf"'
          time="2 days ago"
        />

      </div>

    </div>
  );
}