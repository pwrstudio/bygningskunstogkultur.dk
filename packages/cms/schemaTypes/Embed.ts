import { MdPictureInPicture } from "react-icons/md"
import { defineField, defineType } from "sanity"
import { EmbedPreview } from "../components/EmbedPreview"

export default defineType({
  name: "embedBlock",
  type: "object",
  title: "Embed code",
  icon: MdPictureInPicture,
  fields: [
    defineField({
      name: "url",
      description: "Link to Youtube or Vimeo video or soundcloud track",
      type: "url",
      title: "URL",
    }),
    defineField({ title: "Caption", name: "caption", type: "simpleEditor" }),
  ],
  components: {
    preview: EmbedPreview,
  },
  preview: {
    select: {
      url: "url",
    },
  },
})
