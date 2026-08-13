import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export const aptos = new Aptos(
  new AptosConfig({
    network: Network.TESTNET,
    clientConfig: {
      API_KEY: process.env.NEXT_PUBLIC_SHELBY_API_KEY,
    },
  })
);