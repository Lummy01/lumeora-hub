"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccountBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import ResourceDownloadButton from "./ResourceDownloadButton";
import ResourceDeleteButton from "./ResourceDeleteButton";

export default function ResourceList() {
  const { account, connected } = useWallet();

  const { data: blobs, isLoading, error } = useAccountBlobs({
    client: shelbyClient,
    account: account?.address ?? "",
  });

  if (!connected || !account) {
    return (
      <p className="text-gray-400">
        Please connect your wallet.
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-gray-400">
        Loading resources...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400">
        Failed to load resources.
      </p>
    );
  }

  if (!blobs || blobs.length === 0) {
    return (
      <p className="text-gray-400">
        No resources uploaded yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blobs.map((blob) => {
        const fileName =
  blob.blobNameSuffix.split("/").pop() || blob.blobNameSuffix;

const blobName = blob.blobNameSuffix;

        return (
          <div
            key={blob.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-violet-500/30 hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  📄 {fileName}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Stored on Shelby
                </p>
              </div>

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                Stored
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 text-sm text-gray-400">
              <span>Creative Resource</span>

<span>
  {(blob.size / 1024).toFixed(1)} KB
</span>
            </div>

            <ResourceDeleteButton blobName={blobName} />

<div className="mt-5">
  <ResourceDownloadButton
  account={account.address.toString()}
  blobName={blobName}
/>
</div>

          </div>
        );
      })}
    </div>
  );
}
