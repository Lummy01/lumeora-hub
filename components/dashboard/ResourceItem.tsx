"use client";

import { useRef, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  useDeleteObjects,
  useUploadBlobs,
} from "@shelby-protocol/react";
import { useQueryClient } from "@tanstack/react-query";
import { shelbyClient } from "@/lib/shelby/upload";

type ResourceItemProps = {
  icon: string;
  title: string;
  type: string;
  blobName: string;
  size: number;
  creationMicros: number;
  expirationMicros: number;
  isWritten: boolean;
  isDeleted?: boolean;
};

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

function formatDate(microseconds: number) {
  return new Date(microseconds / 1000).toLocaleString();
}

function getPreviewMimeType(fileName: string) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() ?? "";

  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    pdf: "application/pdf",
    txt: "text/plain",
    json: "application/json",
    html: "text/html",
    css: "text/css",
  };

  return mimeTypes[extension] || "application/octet-stream";
}

function isImageFile(fileName: string) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() ?? "";

  return [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "svg",
  ].includes(extension);
}

function isPdfFile(fileName: string) {
  return fileName
    .toLowerCase()
    .endsWith(".pdf");
}

function isTextFile(fileName: string) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() ?? "";

  return [
    "txt",
    "json",
    "html",
    "css",
  ].includes(extension);
}

export default function ResourceItem({
  icon,
  title,
  type,
  blobName,
  size,
  creationMicros,
  expirationMicros,
  isWritten,
  isDeleted,
}: ResourceItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showDetails, setShowDetails] = useState(false);

  const [showPreview, setShowPreview] =
    useState(false);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [previewLoading, setPreviewLoading] =
    useState(false);

  const [previewError, setPreviewError] =
    useState<string | null>(null);

  const { account, signAndSubmitTransaction } =
    useWallet();

  const queryClient = useQueryClient();

  const deleteObjects = useDeleteObjects({
    client: shelbyClient,

    onSuccess: () => {
      console.log("=== Shelby delete complete ===");

      queryClient.invalidateQueries();
    },

    onError: (error) => {
      console.error(
        "=== Shelby delete failed ===",
        error
      );

      alert("Delete failed. Check the console.");
    },
  });

  const uploadBlobs = useUploadBlobs({
    client: shelbyClient,

    onSuccess: () => {
      console.log(
        "=== Shelby replacement upload complete ==="
      );

      queryClient.invalidateQueries();
    },

    onError: (error) => {
      console.error(
        "=== Shelby replacement upload failed ===",
        error
      );

      alert(
        "Replacement upload failed. Check the console."
      );
    },
  });

  const handleDelete = async () => {
    if (!account || !signAndSubmitTransaction) {
      alert("Please connect your wallet first.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      console.log("=== Shelby delete starting ===");
      console.log("Blob:", blobName);

      await deleteObjects.mutateAsync({
        signer: {
          account: account.address,
          signAndSubmitTransaction,
        },

        blobNames: [blobName],
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (
      !file ||
      !account ||
      !signAndSubmitTransaction
    ) {
      return;
    }

    try {
      console.log(
        "=== Shelby replacement starting ==="
      );

      console.log("Old blob:", blobName);
      console.log("New file:", file.name);
      console.log("Size:", file.size, "bytes");

      const arrayBuffer =
        await file.arrayBuffer();

      const blobData =
        new Uint8Array(arrayBuffer);

      await uploadBlobs.mutateAsync({
        signer: {
          account: account.address,
          signAndSubmitTransaction,
        },

        blobs: [
          {
            blobName: file.name,
            blobData,
          },
        ],

        expirationMicros:
          Date.now() * 1000 +
          1000 * 1000 * 60 * 60 * 24 * 30,
      });

      console.log(
        "=== New resource uploaded ==="
      );

      await deleteObjects.mutateAsync({
        signer: {
          account: account.address,
          signAndSubmitTransaction,
        },

        blobNames: [blobName],
      });

      console.log(
        "=== Old resource deleted ==="
      );

      queryClient.invalidateQueries();

      alert(
        "Resource replaced successfully!"
      );
    } catch (error) {
      console.error(
        "Replacement failed:",
        error
      );

      alert(
        "Replacement failed. Check the console."
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleDownload = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      console.log(
        "=== Shelby download starting ==="
      );

      console.log("Blob:", blobName);

      const accountAddress =
        account.address.toString();

      const downloadUrl =
        `https://api.shelbynet.shelby.xyz/shelby/v1/blobs/` +
        `${accountAddress}/${blobName}`;

      console.log(
        "Download URL:",
        downloadUrl
      );

      const response =
        await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error(
          `Download failed: ${response.status} ${response.statusText}`
        );
      }

      const fileBlob =
        await response.blob();

      const url =
        URL.createObjectURL(fileBlob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = title;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      console.log(
        "=== Shelby download complete ==="
      );
    } catch (error) {
      console.error(
        "=== Shelby download failed ===",
        error
      );

      alert(
        "Download failed. Check the console."
      );
    }
  };

  const handlePreview = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      console.log(
        "=== Shelby preview starting ==="
      );

      console.log("Blob:", blobName);

      setPreviewError(null);
      setPreviewUrl(null);
      setPreviewLoading(true);
      setShowPreview(true);

      const accountAddress =
        account.address.toString();

      const previewEndpoint =
        `https://api.shelbynet.shelby.xyz/shelby/v1/blobs/` +
        `${accountAddress}/${blobName}`;

      console.log(
        "Preview endpoint:",
        previewEndpoint
      );

      const response =
        await fetch(previewEndpoint);

      if (!response.ok) {
        throw new Error(
          `Preview failed: ${response.status} ${response.statusText}`
        );
      }

      const arrayBuffer =
        await response.arrayBuffer();

      const mimeType =
        getPreviewMimeType(title);

      console.log(
        "Preview MIME type:",
        mimeType
      );

      const previewBlob =
        new Blob([arrayBuffer], {
          type: mimeType,
        });

      const objectUrl =
        URL.createObjectURL(previewBlob);

      setPreviewUrl(objectUrl);

      console.log(
        "=== Shelby preview ready ==="
      );
    } catch (error) {
      console.error(
        "=== Shelby preview failed ===",
        error
      );

      setPreviewError(
        "Unable to preview this resource."
      );
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setPreviewError(null);
    setShowPreview(false);
  };

  const status = isDeleted
    ? "Deleted"
    : isWritten
      ? "Stored"
      : "Pending";

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-500/30 hover:bg-white/10">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleEditSelect}
        />

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-3xl">
            {icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {title}
            </h3>

            <p className="text-sm text-gray-400">
              {type} • {formatFileSize(size)}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePreview}
            disabled={previewLoading}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition hover:border-white/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {previewLoading
              ? "Loading..."
              : "Preview"}
          </button>

          <button
            onClick={handleDownload}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
          >
            Download
          </button>

          <button
            onClick={() => setShowDetails(true)}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
          >
            Details
          </button>

          <button
            onClick={handleEditClick}
            disabled={uploadBlobs.isPending}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploadBlobs.isPending
              ? "Replacing..."
              : "Edit"}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteObjects.isPending}
            className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteObjects.isPending
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>

      {/* DETAILS MODAL */}

      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
          onClick={() =>
            setShowDetails(false)
          }
        >
          <div
  className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl"
  onClick={(event) => event.stopPropagation()}
>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Resource Details
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Information retrieved from
                  Shelby metadata
                </p>
              </div>

              <button
                onClick={() =>
                  setShowDetails(false)
                }
                className="rounded-lg px-3 py-1 text-2xl text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Name
                </p>

                <p className="mt-1 break-all font-medium text-white">
                  {title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Type
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {type}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Size
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {formatFileSize(size)}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Status
                </p>

                <p
                  className={`mt-1 font-medium ${
                    status === "Stored"
                      ? "text-green-400"
                      : status === "Deleted"
                        ? "text-red-400"
                        : "text-yellow-400"
                  }`}
                >
                  {status}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Created
                </p>

                <p className="mt-1 font-medium text-white">
                  {formatDate(creationMicros)}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Expires
                </p>

                <p className="mt-1 font-medium text-white">
                  {formatDate(expirationMicros)}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Blob Name
                </p>

                <p className="mt-1 break-all font-mono text-sm text-gray-300">
                  {blobName}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setShowDetails(false)
              }
              className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-medium transition hover:bg-violet-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}

      {showPreview && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111118] shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Preview
                </h2>

                <p className="text-sm text-gray-400">
                  {title}
                </p>
              </div>

              <button
                onClick={closePreview}
                className="rounded-lg px-3 py-1 text-2xl text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-auto bg-black/30 p-6">
              {previewLoading && (
                <p className="text-gray-400">
                  Loading preview...
                </p>
              )}

              {previewError && (
                <div className="text-center">
                  <p className="text-red-400">
                    {previewError}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    This file type may not support
                    browser preview.
                  </p>
                </div>
              )}

              {!previewLoading &&
                !previewError &&
                previewUrl &&
                isImageFile(title) && (
                  <img
                    src={previewUrl}
                    alt={title}
                    className="max-h-full max-w-full rounded-lg object-contain"
                  />
                )}

              {!previewLoading &&
                !previewError &&
                previewUrl &&
                isPdfFile(title) && (
                  <iframe
                    src={previewUrl}
                    title={title}
                    className="h-full w-full rounded-lg border border-white/10"
                  />
                )}

              {!previewLoading &&
                !previewError &&
                previewUrl &&
                isTextFile(title) && (
                  <iframe
                    src={previewUrl}
                    title={title}
                    className="h-full w-full rounded-lg border border-white/10 bg-white"
                  />
                )}

              {!previewLoading &&
                !previewError &&
                previewUrl &&
                !isImageFile(title) &&
                !isPdfFile(title) &&
                !isTextFile(title) && (
                  <div className="text-center">
                    <div className="text-6xl">
                      {icon}
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      Preview unavailable
                    </h3>

                    <p className="mt-2 text-gray-400">
                      This file type cannot be
                      previewed in the browser.
                    </p>

                    <button
                      onClick={handleDownload}
                      className="mt-5 rounded-xl bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
                    >
                      Download File
                    </button>
                  </div>
                )}
            </div>

            <div className="border-t border-white/10 px-6 py-4">
              <button
                onClick={closePreview}
                className="w-full rounded-xl bg-violet-600 py-3 font-medium transition hover:bg-violet-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
