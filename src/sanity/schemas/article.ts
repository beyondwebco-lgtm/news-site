import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().error("An article title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("A slug is required for URL routing"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Technology", value: "Technology" },
          { title: "Business", value: "Business" },
          { title: "India", value: "India" },
          { title: "World", value: "World" },
          { title: "Science", value: "Science" },
          { title: "Health", value: "Health" },
          { title: "Sports", value: "Sports" },
          { title: "Environment", value: "Environment" },
          { title: "Education", value: "Education" },
          { title: "Entertainment", value: "Entertainment" },
        ],
      },
      validation: (rule) => rule.required().error("Please select a category"),
    }),
    defineField({
      name: "summary",
      title: "Summary / Subheading",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(350).warning("Keep summary concise for cards and SEO"),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      initialValue: "4 min read",
      description: "e.g. '4 min read' or '5 min read'",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Author Name",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "role",
          title: "Role / Beat",
          type: "string",
          description: "e.g. 'Technology Correspondent' or 'Staff Reporter'",
        }),
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Main Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Crucial for accessibility and SEO",
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
        defineField({
          name: "externalUrl",
          title: "External Image URL (Fallback)",
          type: "url",
          description: "Optional fallback if not uploading an asset",
        }),
      ],
    }),
    defineField({
      name: "featuredQuote",
      title: "Featured Pull Quote",
      type: "object",
      description: "Highlighted quote embedded in the story",
      fields: [
        defineField({
          name: "quote",
          title: "Quote Text",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "attribution",
          title: "Attribution",
          type: "string",
          description: "e.g. 'Dr. Evelyn Chen, Institute for Computational Ethics'",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
