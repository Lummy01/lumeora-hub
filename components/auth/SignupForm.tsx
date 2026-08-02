import Link from "next/link";

export default function SignupForm() {
  return (
    <form className="space-y-6">

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Full Name
        </label>

        <input
          type="text"
          placeholder="John Doe"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Email
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-violet-400 hover:text-violet-300"
        >
          Login
        </Link>
      </p>

    </form>
  );
}