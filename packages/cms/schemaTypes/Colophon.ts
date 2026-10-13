import { defineField, defineType } from "sanity"

export default defineType({
  title: "Colophon",
  name: "colophon",
  type: "document",
  fields: [
    defineField({ title: "Title", name: "title", type: "string" }),
    defineField({ title: "Logo", name: "logo", type: "image" }),
    defineField({
      title: "Wide column",
      name: "wideColumn",
      type: "contentEditor",
    }),
    defineField({
      title: "First narrow column",
      name: "firstNarrowColumn",
      type: "contentEditor",
    }),
    defineField({
      title: "Second narrow column",
      name: "secondNarrowColumn",
      type: "contentEditor",
    }),
  ],
})
