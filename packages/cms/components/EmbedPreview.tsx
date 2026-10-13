import getVideoId from "get-video-id";

export const EmbedPreview = (props: any) => {
    const { url } = props

    if (typeof url !== 'string') {
        return <div style={{ padding: '10px' }}>No URL</div>
    }

    // YOUTUBE
    if (url.includes('youtube')) {
        return (
            <iframe title='YouTube' style={{ padding: '10px' }} width='480' height='320' src={'https://www.youtube.com/embed/' + getVideoId(url).id} />
        )
    }

    // VIMEO
    if (url.includes('vimeo')) {
        return (
            <iframe title='Vimeo' style={{ padding: '10px' }} width='480' height='320' src={'https://player.vimeo.com/video/' + getVideoId(url).id} />
        )
    }

    // SOUNDCLOUD
    if (url.includes('soundcloud')) {
        return (
            <iframe title='SoundCloud' style={{ padding: '10px' }} width='480' height='320' src={'https://w.soundcloud.com/player/?url=' + url} />
        )
    }

    return <div style={{ padding: '10px' }}>{url}</div>
}
