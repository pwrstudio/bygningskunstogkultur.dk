import { defineField, defineType } from "sanity"

export default defineType({
  title: "About",
  name: "about",
  type: "document",
  fields: [
    defineField({ title: "Title", name: "title", type: "string" }),
    defineField({ title: "Content", name: "content", type: "contentEditor" }),
  ],
})
