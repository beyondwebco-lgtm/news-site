import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import { fetchAllArticles } from "@/sanity/fetch";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await fetchAllArticles();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Newspaper Header */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <NewsFeed articles={articles} />
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
