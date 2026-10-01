export interface Article {
  id?: number | string;
  _id?: string;
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
  paragraphs?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  featuredQuote?: {
    quote: string;
    attribution: string;
  };
}
