"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccountBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import ResourceItem from "./ResourceItem";

type ResourcesListProps = {
  search: string;
};

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

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export default function ResourcesList({
  search,
}: ResourcesListProps) {
  const { account, connected } = useWallet();

  const [page, setPage] = useState(0);

  const pageSize = 10;

  const {
    data: blobs,
    isLoading,
    error,
    isFetching,
  } = useAccountBlobs({
    client: shelbyClient,
    account: account?.address ?? "",
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  });

  if (!connected || !account) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
        <h3 className="text-xl font-semibold">
          Connect your wallet
        </h3>

        <p className="mt-2 text-gray-400">
          Connect your wallet to view your resources.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-gray-400">
          Loading resources...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center">
        <h3 className="text-xl font-semibold text-red-400">
          Failed to load resources
        </h3>

        <p className="mt-2 text-gray-400">
          Please try again.
        </p>
      </div>
    );
  }

  const filteredResources =
    blobs?.filter((blob) => {
      const fileName =
        blob.blobNameSuffix.split("/").pop() ||
        blob.blobNameSuffix;

      return fileName
        .toLowerCase()
        .includes(search.toLowerCase());
    }) ?? [];

  const hasNextPage =
    blobs?.length === pageSize;

  const hasPreviousPage =
    page > 0;

  const handlePrevious = () => {
    if (hasPreviousPage) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            All Resources
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Page {page + 1}
          </p>
        </div>

        {isFetching && (
          <span className="text-sm text-gray-400">
            Updating...
          </span>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((blob) => {
            const fileName =
              blob.blobNameSuffix.split("/").pop() ||
              blob.blobNameSuffix;

            const fileInfo = getFileInfo(fileName);

            return (
              <ResourceItem
                key={blob.name}
                icon={fileInfo.icon}
                title={fileName}
                type={fileInfo.type}
                blobName={blob.blobNameSuffix}
                size={Number(blob.size)}
                creationMicros={Number(blob.creationMicros)}
                expirationMicros={Number(blob.expirationMicros)}
                isWritten={blob.isWritten}
                isDeleted={blob.isDeleted}
              />
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
            <h3 className="mt-4 text-xl font-semibold">
              No resources found
            </h3>

            <p className="mt-2 text-gray-400">
              Try another search term.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={!hasPreviousPage || isFetching}
          className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium transition hover:border-white/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-gray-400">
          Page {page + 1}
        </span>

        <button
          onClick={handleNext}
          disabled={!hasNextPage || isFetching}
          className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium transition hover:border-white/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}