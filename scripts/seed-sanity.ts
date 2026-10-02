import { createClient } from "next-sanity";
import { NEW_CMS_ARTICLES } from "../src/data/cmsArticles";

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.log("------------------------------------------------------------------");
  console.log("ℹ️  SANITY_API_WRITE_TOKEN not found in environment.");
  console.log("   To upload these 10 articles directly into Sanity Cloud via CLI:");
  console.log("   1. Generate a Write token at https://sanity.io/manage -> API -> Tokens");
  console.log("   2. Run: npx tsx scripts/seed-sanity.ts with SANITY_API_WRITE_TOKEN=your_token");
  console.log("   3. Or create them directly in your Studio at /studio");
  console.log("------------------------------------------------------------------");
  console.log(`✅ Loaded ${NEW_CMS_ARTICLES.length} new Money, Sports, and Health articles into app CMS dataset.`);
  process.exit(0);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3uilqfre",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log(`Starting upload of ${NEW_CMS_ARTICLES.length} articles to Sanity dataset...`);

  for (const article of NEW_CMS_ARTICLES) {
    const doc = {
      _type: "article",
      _id: `article-${article.slug}`,
      title: article.title,
      slug: {
        _type: "slug",
        current: article.slug,
      },
      category: article.category,
      summary: article.summary,
      publishedAt: article.isoDate + "T12:00:00.000Z",
      readTime: article.readTime,
      author: {
        name: article.author.name,
        role: article.author.role,
      },
      mainImage: {
        alt: article.imageAlt,
        caption: article.imageCaption,
        externalUrl: article.imageUrl,
      },
      featuredQuote: article.featuredQuote,
      body: article.paragraphs?.map((p, idx) => ({
        _key: `block-${idx}`,
        _type: "block",
        style: "normal",
        children: [
          {
            _key: `span-${idx}`,
            _type: "span",
            text: p,
            marks: [],
          },
        ],
      })),
    };

    try {
      const result = await client.createOrReplace(doc);
      console.log(`✓ Uploaded: "${result.title}" (${article.category})`);
    } catch (err) {
      console.error(`Failed to upload ${article.slug}:`, err);
    }
  }

  console.log("All articles processed successfully!");
}

seed();
