export const VideoPreview = (props: any) => {
    const { value } = props

    const url = value.video && value.video.asset && value.video.asset._ref ? 'https://cdn.sanity.io/files/1tpw92x3/production/' + value.video.asset._ref
        .replace('file-', '')
        .replace('-mp4', '.mp4') : ''


    return (
        <div style={{ width: '100%', padding: '40px', border: '0', borderRadius: '0px' }}>
            {value.video ? <video src={url} controls style={{ maxWidth: '300px', maxHeight: '300px' }} /> : 'No video selected'}
        </div >
    )
}