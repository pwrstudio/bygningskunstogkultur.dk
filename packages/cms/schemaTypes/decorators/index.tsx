import type { BlockAnnotationProps, BlockStyleProps } from "sanity"

// How custom block styles and annotations look inside the editor

export const alignCenterRender = (props: BlockStyleProps) => (
  <p style={{ textAlign: "center" }}>{props.children}</p>
)

export const alignRightRender = (props: BlockStyleProps) => (
  <p style={{ textAlign: "right" }}>{props.children}</p>
)

export const noteRender = (props: BlockStyleProps) => (
  <p style={{ fontSize: "0.8em" }}>{props.children}</p>
)

export const footNoteRender = (props: BlockAnnotationProps) => (
  <span style={{ background: "rgba(0,0,255,0.2)" }}>{props.children}</span>
)
