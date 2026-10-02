import React from "react";
import Link from "next/link";
import { getAllCategories } from "@/data/articles";

export default function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="mt-20 border-t border-neutral-300 bg-neutral-50/70 text-neutral-700">
      {/* Top section of footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl font-serif font-black tracking-tight text-neutral-900 uppercase">
              DAILY UPDATE
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans max-w-md">
              A minimalist, modern newspaper dedicated to clear, balanced, and
              objective reporting. Covering technological innovation, economic trends,
              public health, science, and global affairs with journalistic integrity.
            </p>
            <div className="text-xs text-neutral-500 font-sans pt-2">
              Published daily &bull; 10 curated stories per edition &bull; Static edition
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 font-sans border-b border-neutral-200 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <Link
                  href="/"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Front Page
                </Link>
              </li>
              <li>
                <Link
                  href="/archive"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
                >
                  News Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/#latest"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Latest Dispatches
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  All 10 Sections
                </Link>
              </li>
            </ul>
          </div>

          {/* All 10 Categories */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 font-sans border-b border-neutral-200 pb-2">
              Editorial Sections
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/#category-${cat.toLowerCase()}`}
                  className="inline-block text-xs bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400 px-2.5 py-1 rounded-sm transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-sans gap-2">
          <p>&copy; 2026 Daily Update. All rights reserved. Clean sample newspaper edition.</p>
          <p className="font-mono text-neutral-400">Strictly 10 Stories &bull; Lightweight &amp; Fast</p>
        </div>
      </div>
    </footer>
  );
}
