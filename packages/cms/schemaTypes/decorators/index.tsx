export const highlightRender = (props: any) => (
    <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

export const interviewNameRender = (props: any) => (
    <span style={{ backgroundColor: 'lightgrey', fontWeight: 'bold' }}>{props.children}</span>
)

export const alignCenterRender = (props: any) => (
    <p style={{ textAlign: 'center' }}>{props.children}</p>
)

export const alignRightRender = (props: any) => (
    <p style={{ textAlign: 'right' }}>{props.children}</p>
)

export const footNoteRender = (props: any) => (
    <span style={{ background: 'rgba(0,0,255,0.2)' }}>{props.children}</span>
)

export const noteRender = (props: any) => (
    <p style={{ fontSize: '0.8em' }}>{props.children}</p>
)

export const pageLinkRender = (props: any) => (
    <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)