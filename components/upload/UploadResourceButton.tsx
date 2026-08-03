"use client";

import { useRef } from "react";

export default function UploadResourceButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    console.log("Selected file:", file);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />

      <button
        onClick={handleClick}
        className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:border-violet-500 hover:bg-white/5"
      >
        Upload Resource
      </button>
    </>
  );
}
