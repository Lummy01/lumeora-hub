"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type WalletModalProps = {
  wallets: ReadonlyArray<{
    name: string;
    icon?: string;
    readyState?: string;
  }>;
  onSelect: (walletName: string) => void;
  onClose: () => void;
};

export default function WalletModal({
  wallets,
  onSelect,
  onClose,
}: WalletModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
    setMounted(false);
  };
}, []);

  if (!mounted) return null;

  const aptosWallets = wallets.filter((wallet) => {
  const name = wallet.name.toLowerCase();

  return (
    !name.includes("google") &&
    !name.includes("apple")
  );
});

  const preferredOrder = [
  "Petra",
  "Nightly",
  "Martian",
  "OKX Wallet",
  "Pontem Wallet",
];

const sortedWallets = [...aptosWallets].sort((a, b) => {
  const aInstalled = a.readyState === "Installed";
  const bInstalled = b.readyState === "Installed";

  // Installed wallets first
  if (aInstalled !== bInstalled) {
    return aInstalled ? -1 : 1;
  }

  // Preferred Aptos wallet order
  const aIndex = preferredOrder.findIndex((name) =>
    a.name.toLowerCase().includes(name.toLowerCase())
  );

  const bIndex = preferredOrder.findIndex((name) =>
    b.name.toLowerCase().includes(name.toLowerCase())
  );

  if (aIndex === -1 && bIndex === -1) {
    return a.name.localeCompare(b.name);
  }

  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;

  return aIndex - bIndex;
});

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Connect Wallet
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-400">
          Choose an Aptos wallet to continue.
        </p>

        <div className="mt-8 space-y-3 max-h-[50vh] overflow-y-auto">
          {sortedWallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => onSelect(wallet.name)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500 hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <img
                  src={wallet.icon}
                  alt={wallet.name}
                  className="h-10 w-10 rounded-xl"
                />

                <span className="font-medium text-white">
                  {wallet.name}
                </span>
              </div>

              {wallet.readyState === "Installed" ? (
  <span className="text-2xl text-violet-300">→</span>
) : (
  <span className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
    Install
  </span>
)}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}