"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import { ARTICLES, getAllCategories } from "@/data/articles";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getAllCategories();
  const leadArticle = ARTICLES[0]; // Article 1: AI Technology

  const displayedArticles = selectedCategory
    ? ARTICLES.filter((article) => article.category === selectedCategory)
    : ARTICLES;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Newspaper Header */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        {/* Hero Section: Lead Story */}
        {!selectedCategory && (
          <HeroSection article={leadArticle} />
        )}

        {/* Section Header & Category Filter Bar */}
        <section id="categories" className="mb-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-neutral-900 pb-3 mb-6 gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-700 block">
                Editorial Archive
              </span>
              <h2 id="latest" className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                {selectedCategory ? `${selectedCategory} Reporting` : "All 10 News Stories"}
              </h2>
            </div>

            <div className="text-xs text-neutral-500 font-sans">
              Showing {displayedArticles.length} of {ARTICLES.length} articles
            </div>
          </div>

          {/* Clean Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                selectedCategory === null
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(isActive ? null : cat)
                  }
                  className={`px-3 py-1.5 rounded-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* 10 News Posts Grid */}
        <section aria-label="News Articles Grid" className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {displayedArticles.length === 0 && (
            <div className="text-center py-16 border border-dashed border-neutral-300 rounded-sm">
              <p className="text-neutral-500 font-sans">
                No stories found for this category.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="mt-3 text-xs font-semibold uppercase tracking-wider text-red-700 hover:underline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
