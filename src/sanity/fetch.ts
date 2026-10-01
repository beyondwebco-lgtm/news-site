import { client } from "./client";
import { ARTICLES_QUERY, ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from "./queries";
import { ARTICLES, getArticleBySlug as getStaticArticleBySlug } from "@/data/articles";
import { Article } from "@/types/article";
import { urlFor } from "./image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityDocToArticle(doc: any): Article {
  let imageUrl =
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80";
  if (doc.mainImage?.asset?.url) {
    imageUrl = doc.mainImage.asset.url;
  } else if (doc.mainImage?.asset) {
    try {
      imageUrl = urlFor(doc.mainImage).width(1200).height(800).url();
    } catch {
      imageUrl = "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80";
    }
  } else if (doc.mainImage?.externalUrl) {
    imageUrl = doc.mainImage.externalUrl;
  }

  const rawDate = doc.publishedAt || new Date().toISOString();
  let formattedDate = rawDate;
  try {
    const d = new Date(rawDate);
    formattedDate = d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    formattedDate = rawDate;
  }

  return {
    _id: doc._id,
    id: doc._id || doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: doc.category || "General",
    summary: doc.summary || "",
    date: formattedDate,
    isoDate: rawDate,
    readTime: doc.readTime || "4 min read",
    author: {
      name: doc.author?.name || "Daily Update Staff",
      role: doc.author?.role || "Staff Reporter",
    },
    imageUrl,
    imageAlt: doc.mainImage?.alt || doc.title,
    imageCaption: doc.mainImage?.caption || "",
    body: doc.body,
    paragraphs: [],
    featuredQuote: doc.featuredQuote,
  };
}

export async function fetchAllArticles(): Promise<Article[]> {
  try {
    const sanityArticles = await client.fetch(
      ARTICLES_QUERY,
      {},
      { cache: "no-store" }
    );
    if (Array.isArray(sanityArticles) && sanityArticles.length > 0) {
      return sanityArticles.map(mapSanityDocToArticle);
    }
  } catch (error) {
    console.warn("Failed to fetch articles from Sanity, falling back to static data:", error);
  }
  return ARTICLES;
}

export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  try {
    const doc = await client.fetch(
      ARTICLE_BY_SLUG_QUERY,
      { slug },
      { cache: "no-store" }
    );
    if (doc) {
      return mapSanityDocToArticle(doc);
    }
  } catch (error) {
    console.warn(`Failed to fetch article ${slug} from Sanity, falling back to static data:`, error);
  }
  return getStaticArticleBySlug(slug);
}

export async function fetchAllSlugs(): Promise<string[]> {
  try {
    const docs = await client.fetch(ARTICLE_SLUGS_QUERY, {}, { cache: "no-store" });
    if (Array.isArray(docs) && docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return docs.map((d: any) => d.slug).filter(Boolean);
    }
  } catch {
    // Fall back to static slugs
  }
  return ARTICLES.map((a) => a.slug);
}
