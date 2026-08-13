"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccountBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import StatCard from "./StatCard";

export default function PlatformStats() {
  const { account, connected } = useWallet();

  const { data: blobs } = useAccountBlobs({
    client: shelbyClient,
    account: account?.address ?? "",
  });

  const resourceCount = connected ? (blobs?.length ?? 0) : 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Platform Statistics</h2>
        <p className="mt-4 text-gray-400">
          A growing creative community powered by decentralized storage.
        </p>
      </div>

      <div className="mt-16 flex justify-center">
        <StatCard
          value={`${resourceCount}`}
          label="Resources Shared"
          color="text-violet-400"
        />
      </div>
    </section>
  );
}