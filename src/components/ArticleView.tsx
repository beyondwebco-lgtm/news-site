import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";
import CategoryBadge from "./CategoryBadge";

interface ArticleViewProps {
  article: Article;
  relatedArticles?: Article[];
}

export default function ArticleView({
  article,
  relatedArticles = [],
}: ArticleViewProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Navigation / Back Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors py-2 group"
          id="back-to-news-top"
        >
          <svg
            className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to News
        </Link>
      </div>

      <article className="space-y-8">
        {/* Article Header */}
        <header className="space-y-4 border-b border-neutral-200 pb-6">
          <div className="flex items-center gap-3">
            <CategoryBadge category={article.category} />
            <span className="text-neutral-300">&bull;</span>
            <span className="text-xs text-neutral-500 font-sans">
              {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            {article.summary}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500 font-sans gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-neutral-900">
                By {article.author.name}
              </span>
              <span className="text-neutral-400">&mdash;</span>
              <span className="text-neutral-600">{article.author.role}</span>
            </div>
            <time dateTime={article.isoDate} className="text-neutral-500">
              Published on {article.date}
            </time>
          </div>
        </header>

        {/* Large Featured Image */}
        <figure className="space-y-2">
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden bg-neutral-100 border border-neutral-200 rounded-sm">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          {article.imageCaption && (
            <figcaption className="text-xs text-neutral-500 font-sans leading-normal px-1">
              <span className="font-medium text-neutral-700">Photo:</span>{" "}
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Article Body Content */}
        <div className="font-sans text-neutral-800 space-y-6 pt-4 text-base sm:text-lg leading-relaxed">
          {article.paragraphs.map((paragraph, index) => {
            // After second paragraph, insert featured quote if present
            if (index === 2 && article.featuredQuote) {
              return (
                <React.Fragment key={index}>
                  <blockquote className="my-8 border-l-4 border-red-700 pl-6 py-2 italic font-serif text-lg sm:text-xl text-neutral-900 bg-neutral-50 rounded-r-sm">
                    &ldquo;{article.featuredQuote.quote}&rdquo;
                    <footer className="mt-2 text-xs font-sans not-italic font-semibold tracking-wide uppercase text-neutral-600">
                      &mdash; {article.featuredQuote.attribution}
                    </footer>
                  </blockquote>
                  <p>{paragraph}</p>
                </React.Fragment>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Bottom Back Button & Article Signoff */}
        <div className="pt-10 border-t border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-500 font-sans">
            Filed under: <span className="font-medium text-neutral-800">{article.category}</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-white hover:bg-neutral-800 transition-colors rounded-sm shadow-sm"
            id="back-to-news-bottom"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to News
          </Link>
        </div>

        {/* Related / Other stories from this edition */}
        {relatedArticles.length > 0 && (
          <section className="pt-12 mt-12 border-t border-neutral-200">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              More Stories from Daily Update
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="p-4 border border-neutral-200 rounded-sm bg-neutral-50/50 hover:border-neutral-400 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                    <CategoryBadge category={rel.category} />
                    <span>{rel.date}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-neutral-900 mb-2">
                    <Link
                      href={`/article/${rel.slug}`}
                      className="hover:underline"
                    >
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
