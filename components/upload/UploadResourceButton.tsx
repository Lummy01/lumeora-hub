"use client";

import { useRef } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useUploadBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadResourceButton({
  className = "rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:border-violet-500 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50",
  label = "Upload Resource",
}: {
  className?: string;
  label?: string;
}) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
  account,
  signAndSubmitTransaction,
  connected,
} = useWallet();

  console.log("Connected wallet:", account?.address?.toString());

  const uploadBlobs = useUploadBlobs({
    client: shelbyClient,

    onSuccess: () => {
  console.log("=== Shelby upload complete ===");

  queryClient.invalidateQueries();

  alert("Resource uploaded successfully!");
},

    onError: (error) => {
      console.error("=== Shelby upload failed ===", error);
      alert("Upload failed. Check the console.");
    },
  });

  const handleClick = () => {
    if (!connected || !account || !signAndSubmitTransaction) {
  alert("Please connect your wallet first.");
  return;
}

    fileInputRef.current?.click();
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !account) {
      return;
    }

    try {
      console.log("=== Shelby upload starting ===");
      console.log("File:", file.name);
      console.log("Size:", file.size, "bytes");

      const arrayBuffer = await file.arrayBuffer();
      const blobData = new Uint8Array(arrayBuffer);

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
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={uploadBlobs.isPending}
        className={className}
      >
        {uploadBlobs.isPending ? "Uploading..." : label}
      </button>
    </>
  );
}
