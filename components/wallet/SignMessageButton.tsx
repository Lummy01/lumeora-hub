"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function SignMessageButton() {
  const { connected, signMessage } = useWallet();

  const handleSign = async () => {
    if (!connected || !signMessage) return;

    try {
      await signMessage({
        message: "Welcome to Lumeora Hub! Sign this message to authenticate.",
        nonce: crypto.randomUUID(),
      });

      alert("Message signed successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!connected) return null;

  return (
    <button
      onClick={handleSign}
      className="rounded-xl border border-violet-500 px-6 py-3 font-semibold text-violet-400 transition hover:bg-violet-500 hover:text-white"
    >
      Sign Message
    </button>
  );
}