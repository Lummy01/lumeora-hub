"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { ShelbyClientProvider } from "@shelby-protocol/react";
import { Network } from "@aptos-labs/ts-sdk";

import { shelbyClient } from "@/lib/shelby/upload";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function AptosWalletProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ShelbyClientProvider client={shelbyClient}>
        <AptosWalletAdapterProvider
          autoConnect
          dappConfig={{
            network: Network.SHELBYNET,
          }}
        >
          {children}
        </AptosWalletAdapterProvider>
      </ShelbyClientProvider>
    </QueryClientProvider>
  );
}
