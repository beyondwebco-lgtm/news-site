import { defineQuery } from "next-sanity";

export const ARTICLES_QUERY = defineQuery(
  `*[_type == "article" && defined(slug.current)] | order(publishedAt desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    summary,
    publishedAt,
    readTime,
    author,
    mainImage {
      asset->,
      alt,
      caption,
      externalUrl
    },
    featuredQuote
  }`
);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    summary,
    publishedAt,
    readTime,
    author,
    mainImage {
      asset->,
      alt,
      caption,
      externalUrl
    },
    body,
    featuredQuote
  }`
);

export const ARTICLE_SLUGS_QUERY = defineQuery(
  `*[_type == "article" && defined(slug.current)]{
    "slug": slug.current
  }`
);
