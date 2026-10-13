import { defineArrayMember, defineField, defineType } from "sanity"

/** Text-only editor: paragraphs with strong, emphasis and links */
export default defineType({
  type: "object",
  name: "simpleEditor",
  fields: [
    defineField({
      title: "Simple editor",
      name: "content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", type: "string" })],
              }),
            ],
          },
        }),
      ],
    }),
  ],
})
