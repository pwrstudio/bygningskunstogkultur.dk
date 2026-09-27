export const VideoPreview = (props: any) => {
    const { videoUrl } = props

    return (
        <div style={{ width: '100%', padding: '40px', border: '0', borderRadius: '0px' }}>
            {videoUrl ? <video src={videoUrl} controls style={{ maxWidth: '300px', maxHeight: '300px' }} /> : 'No video selected'}
        </div >
    )
}
