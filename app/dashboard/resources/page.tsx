"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ResourceSearch from "@/components/dashboard/ResourceSearch";
import ResourcesList from "@/components/dashboard/ResourcesList";
import { useState } from "react";

export default function ResourcesPage() {
    const [search, setSearch] = useState("");
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="glass-card rounded-2xl p-10">

          <h1 className="text-4xl font-bold">
            My Resources
          </h1>

          <p className="mt-4 text-gray-400">
            Manage all your uploaded resources from one place.
          </p>

        </div>

        <ResourceSearch
  search={search}
  setSearch={setSearch}
/>

        <ResourcesList
  search={search}
/>

      </div>

    </DashboardLayout>
  );
}