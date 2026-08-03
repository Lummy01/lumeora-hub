"use client";

type WalletModalProps = {
  wallets: ReadonlyArray<{
    name: string;
  }>;
  onSelect: (walletName: string) => void;
  onClose: () => void;
};

export default function WalletModal({
  wallets,
  onSelect,
  onClose,
}: WalletModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
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

        <div className="mt-8 space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => onSelect(wallet.name)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-violet-500 hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
  <img
    src={(wallet as any).icon}
    alt={wallet.name}
    className="h-10 w-10 rounded-xl"
  />

  <span className="font-medium text-white">
    {wallet.name}
  </span>
</div>

              <span
  className={`text-sm font-medium ${
    (wallet as any).readyState === "Installed"
      ? "text-emerald-400"
      : "text-yellow-400"
  }`}
>
  {(wallet as any).readyState === "Installed"
    ? "Installed"
    : "Not Installed"}
</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}