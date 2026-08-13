"use client";

import { ShelbyClientProvider } from "@shelby-protocol/react";
import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { Network } from "@aptos-labs/ts-sdk";

const shelbyClient = new ShelbyClient({
  network: Network.SHELBYNET,
});

export default function ShelbyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShelbyClientProvider client={shelbyClient}>
      {children}
    </ShelbyClientProvider>
  );
}