import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";
import CategoryBadge from "./CategoryBadge";

interface HeroSectionProps {
  article: Article;
}

export default function HeroSection({ article }: HeroSectionProps) {
  return (
    <section className="mb-12 border border-neutral-200 bg-white rounded-sm overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Hero Image */}
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[460px] bg-neutral-100 overflow-hidden group">
          <Link href={`/article/${article.slug}`} className="block w-full h-full">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
            />
          </Link>
          <div className="absolute bottom-0 inset-x-0 bg-neutral-950/60 text-white/90 text-[11px] px-3 py-1.5 backdrop-blur-[2px] truncate">
            {article.imageCaption}
          </div>
        </div>

        {/* Hero Content */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-200">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase bg-red-700 text-white px-2 py-0.5 rounded-sm">
                Lead Story
              </span>
              <CategoryBadge category={article.category} />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-[1.2] mb-4">
              <Link
                href={`/article/${article.slug}`}
                className="hover:text-neutral-700 transition-colors"
              >
                {article.title}
              </Link>
            </h2>

            <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed mb-6">
              {article.summary}
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-neutral-500 font-sans space-y-0.5">
                <div className="font-medium text-neutral-800">
                  By {article.author.name}
                </div>
                <div>
                  <time dateTime={article.isoDate}>{article.date}</time> &bull;{" "}
                  {article.readTime}
                </div>
              </div>

              <Link
                href={`/article/${article.slug}`}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-white hover:bg-red-700 transition-colors rounded-sm"
              >
                Read Full Story
                <svg
                  className="ml-2 w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
