import { defineField, defineType } from "sanity"

export default defineType({
  title: "News",
  name: "news",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: "Publication date",
      name: "publicationDate",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({ title: "Location", name: "location", type: "string" }),
    defineField({
      title: "Main image",
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ title: "Content", name: "content", type: "simpleEditor" }),
    defineField({
      title: "Extended view",
      name: "extendedView",
      type: "boolean",
    }),
    defineField({
      title: "Extended content",
      name: "extendedContent",
      type: "simpleEditor",
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 200 },
      validation: (rule) => rule.required(),
    }),
  ],
})
