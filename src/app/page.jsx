import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to My E-commerce</h1>

        <div className="flex gap-4">
          <Link
            href="../auth/login/"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </Link>

          <Link
            href="../auth/signup/"
            className="px-6 py-3 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
}
