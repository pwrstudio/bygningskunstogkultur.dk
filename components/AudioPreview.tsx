export const AudioPreview = (props: any) => {
    const { audioUrl } = props

    return (
        <div style={{ width: '100%', padding: '40px', border: '0', borderRadius: '0px' }}>
            {audioUrl ? <audio src={audioUrl} controls style={{ maxWidth: '300px', maxHeight: '300px' }} /> : 'No audiofile selected'}
        </div >
    )
}
