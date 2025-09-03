import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Authify</h1>
      <p className="mb-8 text-lg text-center max-w-xl">
        Authify is a modern authentication system starter kit. Easily integrate authentication into your projects!
      </p>
      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}