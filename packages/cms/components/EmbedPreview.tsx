import getVideoId from "get-video-id"
import type { PreviewProps } from "sanity"

const frame = (title: string, src: string) => (
  <iframe
    title={title}
    style={{ padding: "10px" }}
    width="480"
    height="320"
    src={src}
  />
)

export const EmbedPreview = (props: PreviewProps & { url?: unknown }) => {
  const { url } = props

  if (typeof url !== "string") {
    return <div style={{ padding: "10px" }}>No URL</div>
  }

  if (url.includes("youtube")) {
    const { id } = getVideoId(url)
    if (id) return frame("YouTube", "https://www.youtube.com/embed/" + id)
  }

  if (url.includes("vimeo")) {
    const { id } = getVideoId(url)
    if (id) return frame("Vimeo", "https://player.vimeo.com/video/" + id)
  }

  if (url.includes("soundcloud")) {
    return frame("SoundCloud", "https://w.soundcloud.com/player/?url=" + url)
  }

  return <div style={{ padding: "10px" }}>{url}</div>
}
