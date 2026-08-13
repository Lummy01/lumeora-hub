"use client";

import { useState } from "react";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import { shelbyClient } from "@/lib/shelby/upload";

interface ResourceDownloadButtonProps {
  account: string;
  blobName: string;
}

export default function ResourceDownloadButton({
  account,
  blobName,
}: ResourceDownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const blob = await shelbyClient.download({
        account: AccountAddress.from(account),
        blobName,
      });

      const reader = blob.readable.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        if (value) {
          chunks.push(value);
        }
      }

      const fileBlob = new Blob(chunks as BlobPart[]);

      const url = URL.createObjectURL(fileBlob);
      const link = document.createElement("a");

      link.href = url;
      link.download = blobName.split("/").pop() || "download";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {downloading ? "Downloading..." : "Download"}
    </button>
  );
}
