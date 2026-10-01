export interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  paragraphs: string[];
  featuredQuote?: {
    quote: string;
    attribution: string;
  };
}
