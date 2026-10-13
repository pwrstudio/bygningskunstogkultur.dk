import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import { MdLanguage } from "react-icons/md"
import { defineArrayMember, defineField, defineType } from "sanity"

const link = (name: string, title: string, icon: React.ComponentType) =>
  defineArrayMember({
    title,
    name,
    icon,
    type: "object",
    fields: [defineField({ title: "URL", name: "url", type: "url" })],
  })

export default defineType({
  title: "Article",
  name: "article",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ title: "Byline", name: "byline", type: "simpleEditor" }),
    defineField({ title: "Author", name: "author", type: "string" }),
    defineField({
      title: "Links",
      name: "links",
      type: "array",
      options: { modal: { type: "popover" } },
      of: [
        link("instagram", "Instagram", FaInstagram),
        link("facebook", "Facebook", FaFacebook),
        link("twitter", "Twitter", FaTwitter),
        link("other", "Other", MdLanguage),
      ],
    }),
    defineField({
      title: "Main image",
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      title: "Zoomable slideshow layout",
      name: "zoomableSlideshowLayout",
      type: "boolean",
    }),
    defineField({ title: "Content", name: "content", type: "contentEditor" }),
    defineField({
      title: "Slideshow",
      name: "slideshow",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              type: "boolean",
              name: "cover",
              title: "Cover",
              description: "Crop image to fill slideshow area",
            }),
            defineField({
              type: "contentEditor",
              name: "caption",
              title: "Caption",
            }),
          ],
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
