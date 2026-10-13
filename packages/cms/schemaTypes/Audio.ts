import { MdAudiotrack } from "react-icons/md"
import { defineField, defineType } from "sanity"
import { AudioPreview } from "../components/AudioPreview"

export default defineType({
  name: "audioBlock",
  type: "object",
  title: "Audio",
  icon: MdAudiotrack,
  fields: [
    defineField({ title: "Title", name: "title", type: "string" }),
    defineField({
      name: "audioFile",
      type: "file",
      title: "Audio file",
      description: "File format: mp3",
    }),
  ],
  components: {
    preview: AudioPreview,
  },
  preview: {
    select: {
      audioUrl: "audioFile.asset.url",
    },
  },
})
