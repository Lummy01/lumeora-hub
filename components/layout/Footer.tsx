import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/10 bg-black/40">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">

        {/* Brand */}

        <div>

          <Link
            href="/"
            className="inline-block transition hover:scale-105"
          >

            <h2 className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
              Lumeora Hub
            </h2>

          </Link>

          <p className="mt-4 text-gray-400">
            Discover, showcase, and securely share creative resources
            powered by Shelby decentralized storage.
          </p>

          <div className="mt-6 flex items-center gap-4">

  <a
    href="#"
    className="rounded-full border border-white/10 p-3 text-gray-400 transition hover:border-violet-500 hover:text-violet-400"
  >
    <Github size={18} />
  </a>

  <a
    href="#"
    className="rounded-full border border-white/10 p-3 text-gray-400 transition hover:border-violet-500 hover:text-violet-400"
  >
    <Twitter size={18} />
  </a>

  <a
    href="#"
    className="rounded-full border border-white/10 p-3 text-gray-400 transition hover:border-violet-500 hover:text-violet-400"
  >
    <Linkedin size={18} />
  </a>

  <a
    href="#"
    className="rounded-full border border-white/10 p-3 text-gray-400 transition hover:border-violet-500 hover:text-violet-400"
  >
    <Mail size={18} />
  </a>

</div>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="font-semibold text-white">
            Quick Links
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-gray-400">

            <a href="#home" className="hover:text-violet-400">
              Home
            </a>

            <a href="#resources" className="hover:text-violet-400">
              Explore
            </a>

            <a href="#categories" className="hover:text-violet-400">
              Categories
            </a>

            <a href="#about" className="hover:text-violet-400">
              About
            </a>

          </div>

        </div>

        {/* Platform */}

        <div>

          <h3 className="font-semibold text-white">
            Platform
          </h3>

          <div className="mt-4 space-y-3 text-gray-400">

            <p>Powered by Shelby</p>

            <p>Secure Storage</p>

            <p>Creator Portfolios</p>

            <p>Community Resources</p>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">

        © 2026 Lumeora Hub. Built on Aptos. Powered by Shelby.

      </div>

    </footer>
  );
}
