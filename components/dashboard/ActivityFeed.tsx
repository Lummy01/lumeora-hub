"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccountBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import ActivityItem from "./ActivityItem";

function timeAgo(microseconds: number) {
  const ms = microseconds / 1000;
  const diffSeconds = Math.floor((Date.now() - ms) / 1000);

  if (diffSeconds < 60) return "Just now";
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} min ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hr ago`;
  if (diffSeconds < 172800) return "Yesterday";
  return `${Math.floor(diffSeconds / 86400)} days ago`;
}

export default function ActivityFeed() {
  const { account, connected } = useWallet();

  const {
    data: blobs,
    isLoading,
    error,
  } = useAccountBlobs({
    client: shelbyClient,
    account: account?.address ?? "",
  });

  const recentActivity = [...(blobs ?? [])]
    .sort((a, b) => Number(b.creationMicros) - Number(a.creationMicros))
    .slice(0, 3);

  return (
    <div className="glass-card rounded-2xl p-8">
      <h2 className="text-2xl font-bold">Recent Activity</h2>

      <div className="mt-6 space-y-4">
        {!connected || !account ? (
          <p className="text-gray-400">Connect your wallet to view recent activity.</p>
        ) : isLoading ? (
          <p className="text-gray-400">Loading recent activity...</p>
        ) : error ? (
          <p className="text-red-400">Failed to load recent activity.</p>
        ) : recentActivity.length > 0 ? (
          recentActivity.map((blob) => {
            const fileName = blob.blobNameSuffix.split("/").pop() || blob.blobNameSuffix;
            return (
              <ActivityItem
                key={blob.name}
                icon="🟢"
                action={`Uploaded "${fileName}"`}
                time={timeAgo(Number(blob.creationMicros))}
              />
            );
          })
        ) : (
          <p className="text-gray-400">No activity yet.</p>
        )}
      </div>
    </div>
  );
}