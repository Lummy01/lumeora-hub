"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccountBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "@/lib/shelby/upload";
import ResourceCard from "../ui/ResourceCard";
import { useRouter } from "next/navigation";

function getFileInfo(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return { icon: "🖼️", type: "Image", color: "border-green-500/20 bg-green-500/10 hover:border-green-500/40" };
    case "svg":
      return { icon: "🎨", type: "SVG Image", color: "border-violet-500/20 bg-violet-500/10 hover:border-violet-500/40" };
    case "pdf":
      return { icon: "📄", type: "PDF Document", color: "border-blue-500/20 bg-blue-500/10 hover:border-blue-500/40" };
    case "doc":
    case "docx":
      return { icon: "📝", type: "Word Document", color: "border-blue-500/20 bg-blue-500/10 hover:border-blue-500/40" };
    case "fig":
      return { icon: "🎨", type: "Figma Design", color: "border-violet-500/20 bg-violet-500/10 hover:border-violet-500/40" };
    case "ppt":
    case "pptx":
      return { icon: "📊", type: "Presentation", color: "border-orange-500/20 bg-orange-500/10 hover:border-orange-500/40" };
    default:
      return { icon: "📁", type: "File", color: "border-white/10 bg-white/5 hover:border-violet-500/40" };
  }
}

export default function Hero() {
  const { account, connected } = useWallet();
  const router = useRouter();

  const { data: blobs } = useAccountBlobs({
    client: shelbyClient,
    account: account?.address ?? "",
  });

  const resourceCount = connected ? (blobs?.length ?? 0) : 0;

  const trending = [...(blobs ?? [])]
    .sort((a, b) => Number(b.creationMicros) - Number(a.creationMicros))
    .slice(0, 4);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-36"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            ✨ Powered by Shelby Decentralized Storage
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">
            The Home for
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              Creative Portfolios
            </span>
            <br />
            & Resources
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            <span className="font-semibold text-white">Lumeora Hub</span>{" "}
            is a decentralized platform where creators showcase portfolios,
            upload creative resources, and securely share files powered by
            Shelby. Discover inspiration, collaborate, and grow your creative
            presence.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href="#resources"
              className="rounded-xl bg-violet-600 px-8 py-4 font-semibold transition hover:scale-105 hover:bg-violet-500"
            >
              Explore Resources
            </a>

            <button
              onClick={() => {
                if (connected) {
                  router.push("/dashboard");
                } else {
                  alert("Please connect your wallet from the top-right corner first.");
                }
              }}
              className="cursor-pointer rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:scale-105 hover:border-violet-500 hover:bg-white/5"
            >
              Create Portfolio
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
            <div>✓ Aptos Wallet</div>
            <div>✓ Shelby Storage</div>
            <div>✓ Creator Ownership</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative hidden lg:block">
          <div className="absolute left-6 top-10 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 backdrop-blur-xl">
            🚀 {resourceCount}+ Resources
          </div>

          <div className="absolute right-6 bottom-16 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 backdrop-blur-xl">
            🌍 Global Creators
          </div>

          <div className="glass-card rounded-3xl p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Trending Resources</h3>
                <p className="mt-1 text-sm text-gray-400">Popular uploads from the community</p>
              </div>
            </div>

            <div className="space-y-5">
              {trending.length > 0 ? (
                trending.map((blob) => {
                  const fileName = blob.blobNameSuffix.split("/").pop() || blob.blobNameSuffix;
                  const { icon, type, color } = getFileInfo(fileName);
                  return (
                    <ResourceCard
                      key={blob.name}
                      icon={icon}
                      title={fileName}
                      type={type}
                      size={`${(blob.size / 1024).toFixed(1)} KB`}
                      color={color}
                    />
                  );
                })
              ) : (
                <p className="text-sm text-gray-400">No resources yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}