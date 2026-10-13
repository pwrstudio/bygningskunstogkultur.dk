import { MdVideocam } from "react-icons/md"
import { defineField, defineType } from "sanity"
import { VideoPreview } from "../components/VideoPreview"

export default defineType({
  name: "videoBlock",
  type: "object",
  title: "Video",
  icon: MdVideocam,
  fields: [
    defineField({
      name: "videoFile",
      type: "file",
      title: "video file",
      description: "File format: mp4",
    }),
    defineField({ name: "posterImage", type: "image", title: "Poster image" }),
    defineField({ title: "Autoplay", name: "autoPlay", type: "boolean" }),
    defineField({ title: "Caption", name: "caption", type: "simpleEditor" }),
  ],
  components: {
    preview: VideoPreview,
  },
  preview: {
    select: {
      videoUrl: "videoFile.asset.url",
    },
  },
})
