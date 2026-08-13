import Link from "next/link";
import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
  <main className="flex min-h-screen items-center justify-center px-6">

    <div className="w-full max-w-md">

      <Link
        href="/"
        className="mb-8 block text-center transition hover:scale-105"
      >

        <h1 className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
          Lumeora Hub
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Powered by Shelby
        </p>

      </Link>

      <div className="glass-card rounded-3xl p-10">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            {title}
          </h1>

          <p className="mt-3 text-gray-400">
            {subtitle}
          </p>

        </div>

        <div className="mt-10">
          {children}
        </div>

      </div>

    </div>

  </main>
);
}
