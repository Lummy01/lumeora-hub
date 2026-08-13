"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccountBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import StatCard from "./StatCard";

function formatStorage(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export default function StatsGrid() {
  const { account, connected } = useWallet();

  const {
    data: blobs,
    isLoading,
  } = useAccountBlobs({
    client: shelbyClient,
    account: account?.address ?? "",
  });

  if (!connected || !account) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Resources"
          value="0"
          icon="📁"
        />

        <StatCard
          title="Storage Used"
          value="0 B"
          icon="💾"
        />

        <StatCard
          title="Images"
          value="0"
          icon="🖼️"
        />

        <StatCard
          title="Documents"
          value="0"
          icon="📄"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Resources"
          value="..."
          icon="📁"
        />

        <StatCard
          title="Storage Used"
          value="..."
          icon="💾"
        />

        <StatCard
          title="Images"
          value="..."
          icon="🖼️"
        />

        <StatCard
          title="Documents"
          value="..."
          icon="📄"
        />
      </div>
    );
  }

  const resources = blobs ?? [];

  const totalResources = resources.length;

  const storageUsed = resources.reduce(
    (total, blob) => total + Number(blob.size),
    0
  );

  const imageCount = resources.filter((blob) => {
    const fileName =
      blob.blobNameSuffix.split("/").pop() ??
      blob.blobNameSuffix;

    const extension = getExtension(fileName);

    return [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
    ].includes(extension);
  }).length;

  const documentCount = resources.filter((blob) => {
    const fileName =
      blob.blobNameSuffix.split("/").pop() ??
      blob.blobNameSuffix;

    const extension = getExtension(fileName);

    return [
      "pdf",
      "doc",
      "docx",
      "txt",
      "csv",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
    ].includes(extension);
  }).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Resources"
        value={totalResources.toString()}
        icon="📁"
      />

      <StatCard
        title="Storage Used"
        value={formatStorage(storageUsed)}
        icon="💾"
      />

      <StatCard
        title="Images"
        value={imageCount.toString()}
        icon="🖼️"
      />

      <StatCard
        title="Documents"
        value={documentCount.toString()}
        icon="📄"
      />
    </div>
  );
}
