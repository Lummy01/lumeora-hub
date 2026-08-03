"use client";

import { ReactNode } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

type Props = {
  children: ReactNode;
};

export default function AptosWalletProvider({ children }: Props) {
  return (
    <AptosWalletAdapterProvider autoConnect={false}>
      {children}
    </AptosWalletAdapterProvider>
  );
}
