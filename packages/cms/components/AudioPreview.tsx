import type { PreviewProps } from "sanity"

export const AudioPreview = (props: PreviewProps & { audioUrl?: unknown }) => {
  const { audioUrl } = props

  return (
    <div style={{ width: "100%", padding: "40px" }}>
      {typeof audioUrl === "string" ? (
        <audio src={audioUrl} controls style={{ maxWidth: "300px" }} />
      ) : (
        "No audio file selected"
      )}
    </div>
  )
}
