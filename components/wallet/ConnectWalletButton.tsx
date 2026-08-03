"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import WalletModal from "./WalletModal";
import SignMessageButton from "./SignMessageButton";

export default function ConnectWalletButton() {
  const {
    connected,
    account,
    connect,
    disconnect,
    wallets,
  } = useWallet();

  const [open, setOpen] = useState(false);

  const handleSelectWallet = async (walletName: string) => {
    try {
      await connect(walletName);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (connected) {
  return (
    <div className="flex items-center gap-3">
      <SignMessageButton />

      <button
        onClick={() => disconnect()}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:scale-105 hover:from-violet-500 hover:to-blue-500"
      >
        {account?.address.toString().slice(0, 6)}...
        {account?.address.toString().slice(-4)}
      </button>
    </div>
  );
}

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:scale-105 hover:from-violet-500 hover:to-blue-500"
      >
        Connect Wallet
      </button>

      {open && (
        <WalletModal
          wallets={wallets}
          onSelect={handleSelectWallet}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
