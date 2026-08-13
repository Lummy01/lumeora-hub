"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useAccountBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import ResourceRow from "./ResourceRow";

function getFileInfo(fileName: string) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() ?? "";

  switch (extension) {
    case "jpg":
    case "jpeg":
      return {
        icon: "🖼️",
        type: "JPG Image",
      };

    case "png":
      return {
        icon: "🖼️",
        type: "PNG Image",
      };

    case "gif":
      return {
        icon: "🖼️",
        type: "GIF Image",
      };

    case "webp":
      return {
        icon: "🖼️",
        type: "WebP Image",
      };

    case "svg":
      return {
        icon: "🎨",
        type: "SVG Image",
      };

    case "pdf":
      return {
        icon: "📄",
        type: "PDF Document",
      };

    case "doc":
    case "docx":
      return {
        icon: "📝",
        type: "Word Document",
      };

    case "txt":
      return {
        icon: "📃",
        type: "Text File",
      };

    case "csv":
      return {
        icon: "📊",
        type: "CSV Spreadsheet",
      };

    case "xls":
    case "xlsx":
      return {
        icon: "📊",
        type: "Excel Spreadsheet",
      };

    case "ppt":
    case "pptx":
      return {
        icon: "📊",
        type: "PowerPoint Presentation",
      };

    case "fig":
      return {
        icon: "🎨",
        type: "Figma Design",
      };

    case "zip":
      return {
        icon: "📦",
        type: "ZIP Archive",
      };

    case "json":
      return {
        icon: "🧩",
        type: "JSON File",
      };

    case "js":
    case "jsx":
      return {
        icon: "💻",
        type: "JavaScript File",
      };

    case "ts":
    case "tsx":
      return {
        icon: "💻",
        type: "TypeScript File",
      };

    case "html":
      return {
        icon: "🌐",
        type: "HTML File",
      };

    case "css":
      return {
        icon: "🎨",
        type: "CSS File",
      };

    default:
      return {
        icon: "📁",
        type: "File",
      };
  }
}

function formatDate(microseconds: number) {
  return new Date(microseconds / 1000).toLocaleString();
}

export default function RecentResources() {
    const router = useRouter();
  const { account, connected } = useWallet();

  const {
    data: blobs,
    isLoading,
    error,
  } = useAccountBlobs({
    client: shelbyClient,
    account: account?.address ?? "",
  });

  if (!connected || !account) {
    return (
      <div className="glass-card rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Recent Resources
          </h2>
        </div>

        <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
          <p className="text-gray-400">
            Connect your wallet to view your recent resources.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Recent Resources
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-gray-400">
            Loading recent resources...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Recent Resources
          </h2>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="text-red-400">
            Failed to load recent resources.
          </p>
        </div>
      </div>
    );
  }

  const recentResources = [...(blobs ?? [])]
    .sort(
      (a, b) =>
        Number(b.creationMicros) -
        Number(a.creationMicros)
    )
    .slice(0, 3);

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Recent Resources
        </h2>

        <button
  onClick={() => router.push("/dashboard/resources")}
  className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:border-violet-500 hover:bg-white/5"
>
  View All
</button>
      </div>

      <div className="space-y-4">
        {recentResources.length > 0 ? (
          recentResources.map((blob) => {
            const fileName =
              blob.blobNameSuffix.split("/").pop() ||
              blob.blobNameSuffix;

            const fileInfo = getFileInfo(fileName);

            return (
              <ResourceRow
                key={blob.name}
                icon={fileInfo.icon}
                title={fileName}
                type={fileInfo.type}
                updated={formatDate(
                  Number(blob.creationMicros)
                )}
              />
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
            <p className="text-gray-400">
              No resources uploaded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
