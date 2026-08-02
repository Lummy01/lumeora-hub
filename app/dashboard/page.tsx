import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentResources from "@/components/dashboard/RecentResources";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

export default function DashboardPage() {
  return (
    <DashboardLayout>

  <div className="space-y-8">

    <div className="glass-card rounded-2xl p-10">

      <h1 className="text-4xl font-bold">
        Welcome to Lumeora Hub 👋
      </h1>

      <p className="mt-4 text-gray-400">
        This is your creator dashboard. From here you'll manage resources,
        uploads, analytics, and your profile.
      </p>

    </div>

    <StatsGrid />

   <div className="grid gap-8 lg:grid-cols-3">

  <div className="lg:col-span-2">
    <RecentResources />
  </div>

  <QuickActions />

</div>

<ActivityFeed />

  </div>

</DashboardLayout>
  );
}