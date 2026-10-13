import { MdImage, MdShortText, MdInsertLink } from "react-icons/md"
import { defineArrayMember, defineField, defineType } from "sanity"
import {
  alignCenterRender,
  alignRightRender,
  noteRender,
  footNoteRender,
} from "./decorators"

/** Rich text editor: styled paragraphs, footnotes, page links, images, video, audio and embeds */
export default defineType({
  type: "object",
  name: "contentEditor",
  options: { collapsible: false, collapsed: false },
  fields: [
    defineField({
      title: "Content editor",
      description:
        "Pressing enter will create a new paragraph. Pressing shift+enter will create a new line in the same paragraph.",
      name: "content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            {
              title: "Center aligned",
              value: "center-aligned",
              component: alignCenterRender,
            },
            {
              title: "Right aligned",
              value: "right-aligned",
              component: alignRightRender,
            },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
            { title: "Note", value: "note", component: noteRender },
          ],
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
              defineArrayMember({
                name: "footnote",
                type: "object",
                title: "Footnote",
                components: { annotation: footNoteRender },
                icon: MdShortText,
                fields: [
                  defineField({
                    title: "Footnote text",
                    name: "content",
                    type: "simpleEditor",
                  }),
                ],
              }),
              defineArrayMember({
                name: "pageLink",
                type: "object",
                icon: MdInsertLink,
                title: "Page link",
                fields: [
                  defineField({
                    name: "reference",
                    type: "reference",
                    to: [{ type: "page" }],
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          icon: MdImage,
          fields: [
            defineField({
              title: "Caption",
              name: "caption",
              type: "simpleEditor",
            }),
            defineField({
              name: "attribution",
              type: "string",
              title: "Attribution",
            }),
            defineField({
              title: "Fullbredd",
              name: "fullWidth",
              type: "boolean",
            }),
          ],
        }),
        defineArrayMember({ type: "videoBlock" }),
        defineArrayMember({ type: "audioBlock" }),
        defineArrayMember({ type: "embedBlock" }),
      ],
    }),
  ],
})
