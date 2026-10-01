import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";
import CategoryBadge from "./CategoryBadge";

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group flex flex-col bg-white border border-neutral-200 rounded-sm overflow-hidden hover:border-neutral-400 transition-colors duration-200 h-full shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Article Image Container */}
      <Link
        href={`/article/${article.slug}`}
        className="block relative aspect-[16/10] w-full overflow-hidden bg-neutral-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
        />
      </Link>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Date Line */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <CategoryBadge category={article.category} />
            <time
              dateTime={article.isoDate}
              className="text-xs text-neutral-500 font-sans tracking-tight"
            >
              {article.date}
            </time>
          </div>

          {/* Headline */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 leading-snug tracking-tight mb-2.5 group-hover:text-neutral-700 transition-colors">
            <Link
              href={`/article/${article.slug}`}
              className="focus:outline-none focus:underline"
            >
              {article.title}
            </Link>
          </h3>

          {/* 2-3 Line Summary */}
          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4 font-sans">
            {article.summary}
          </p>
        </div>

        {/* Card Footer: Read More Button & Meta */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <span className="text-xs text-neutral-400 font-sans">
            {article.readTime}
          </span>
          <Link
            href={`/article/${article.slug}`}
            className="inline-flex items-center text-xs font-semibold text-neutral-900 group-hover:text-red-700 tracking-wide uppercase transition-colors"
          >
            Read More
            <svg
              className="ml-1.5 w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
    </article>
  );
}
