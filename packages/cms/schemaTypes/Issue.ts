import { MdNote } from "react-icons/md"
import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  title: "Issue",
  name: "issue",
  icon: MdNote,
  type: "document",
  initialValue: {
    editorialState: "preview",
  },
  fields: [
    defineField({
      title: "Editorial state",
      name: "editorialState",
      type: "string",
      description:
        "Only live issues are listed on the public site; preview issues show on the preview site",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "Preview", value: "preview" },
        ],
        layout: "radio",
      },
    }),
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
    defineField({
      title: "Main image",
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      title: "Table of Content",
      name: "tableOfContents",
      type: "array",
      of: [
        defineArrayMember({
          title: "Article",
          name: "articleLink",
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],
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
