"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8"
        aria-label="Global">
        <div className="flex items-end gap-x-4 sm:gap-x-8 md:gap-x-12">
          <Link
            href="/workspace"
            className={`text-sm/6 font-semibold hover:text-blue-700 ${
              pathname === "/workspace" ? "text-blue-500" : "text-gray-900"
            }`}>
            Workspace
          </Link>
          <Link
            href="/transactions"
            className={`text-sm/6 font-semibold hover:text-blue-700 ${
              pathname === "/transactions" ? "text-blue-500" : "text-gray-900"
            }`}>
            Transactions
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
