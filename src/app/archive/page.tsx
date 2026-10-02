import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import { fetchSanityArticles } from "@/sanity/fetch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News Archive & Latest Updates — DAILY UPDATE",
  description:
    "Browse the full editorial archive of latest news dispatches, reports, and real-time updates published via Sanity Studio.",
};

export default async function ArchivePage() {
  const articles = await fetchSanityArticles();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Newspaper Header */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        {/* Archive Page Banner */}
        <div className="mb-8 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-700 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Live Editorial Archive
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            News Archive &amp; Dispatches
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl font-sans">
            Real-time archive of all current updates, breaking stories, and field reports published directly by our editorial desk.
          </p>
        </div>

        {/* Dynamic News Feed with Category Filters */}
        <NewsFeed articles={articles} />
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
