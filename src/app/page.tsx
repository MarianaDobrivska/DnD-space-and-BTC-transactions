import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-gray-100 h-[calc(100vh-72px)]">
      <div className="max-w-xl text-center space-y-4 p-6 bg-white shadow-lg rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-gray-700 text-lg leading-relaxed">
          Explore a{" "}
          <span className="font-semibold">real-time Interactive Workspace</span>{" "}
          and experience
          <span className="font-semibold">
            {" "}
            WebSocket-powered Bitcoin transactions
          </span>{" "}
          in action. See live data updates, interact seamlessly, and test key
          features in a dynamic environment.
        </p>
        <Link
          href="/transactions"
          className="inline-block px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
          Get started
        </Link>
      </div>
    </div>
  );
}
