import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-neutral-200">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500 font-sans tracking-wide gap-1 sm:gap-0">
        <div className="flex items-center space-x-2">
          <time dateTime="2026-10-01" className="font-medium text-neutral-700">
            Thursday, October 1, 2026
          </time>
          <span className="text-neutral-300">|</span>
          <span>Today&apos;s Edition</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-neutral-500">
          <span>Global &amp; National Reporting</span>
          <span className="text-neutral-300">•</span>
          <span>Updated Hourly</span>
        </div>
      </div>

      {/* Main Masthead / Logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
        <Link href="/" className="inline-block group">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors uppercase">
            DAILY UPDATE
          </h1>
          <p className="mt-1 text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-500 font-sans font-medium">
            Independent Journalism &bull; Reliable Analysis &bull; World Perspective
          </p>
        </Link>
      </div>

      {/* Primary Navigation */}
      <nav
        aria-label="Main Navigation"
        className="border-t border-b border-neutral-200 bg-neutral-50/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-6 sm:space-x-8 text-xs sm:text-sm font-medium tracking-wide uppercase">
              <Link
                href="/"
                className="text-neutral-900 hover:text-red-700 transition-colors py-3 border-b-2 border-transparent hover:border-red-700"
              >
                Home
              </Link>
              <Link
                href="/#latest"
                className="text-neutral-600 hover:text-red-700 transition-colors py-3 border-b-2 border-transparent hover:border-red-700"
              >
                Latest
              </Link>
              <Link
                href="/#categories"
                className="text-neutral-600 hover:text-red-700 transition-colors py-3 border-b-2 border-transparent hover:border-red-700"
              >
                Categories
              </Link>
            </div>

            {/* Quick date / count badge */}
            <div className="text-xs text-neutral-500 font-mono hidden sm:block">
              10 Top Stories
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
