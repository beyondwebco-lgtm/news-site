import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchArticleBySlug, fetchAllArticles } from "@/sanity/fetch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleView from "@/components/ArticleView";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found — DAILY UPDATE",
      description: "The requested news article could not be located.",
    };
  }

  return {
    title: `${article.title} — DAILY UPDATE`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.imageUrl }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await fetchAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ArticleView article={article} relatedArticles={relatedArticles} />
      <Footer />
    </div>
  );
}
