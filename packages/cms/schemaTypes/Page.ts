import { MdEditDocument } from "react-icons/md"
import { defineField, defineType } from "sanity"

export default defineType({
  title: "Page",
  name: "page",
  icon: MdEditDocument,
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ title: "Content", name: "content", type: "contentEditor" }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 200 },
      validation: (rule) => rule.required(),
    }),
  ],
})
