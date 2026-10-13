import type { PreviewProps } from "sanity"

export const VideoPreview = (props: PreviewProps & { videoUrl?: unknown }) => {
  const { videoUrl } = props

  return (
    <div style={{ width: "100%", padding: "40px" }}>
      {typeof videoUrl === "string" ? (
        <video
          src={videoUrl}
          controls
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
      ) : (
        "No video selected"
      )}
    </div>
  )
}
