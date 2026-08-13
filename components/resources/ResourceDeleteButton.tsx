"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useDeleteObjects } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";

type ResourceDeleteButtonProps = {
  blobName: string;
};

export default function ResourceDeleteButton({
  blobName,
}: ResourceDeleteButtonProps) {
  const { account, signAndSubmitTransaction } = useWallet();

  const deleteObjects = useDeleteObjects({
    client: shelbyClient,
  });

  const handleDelete = async () => {
    if (!account) {
      return;
    }

    try {
      await deleteObjects.mutateAsync({
        signer: {
          signAndSubmitTransaction,
        },
        blobNames: [blobName],
      });

      console.log("Delete transaction submitted");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleteObjects.isPending}
      className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleteObjects.isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
