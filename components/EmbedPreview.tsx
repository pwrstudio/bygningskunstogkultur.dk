import getVideoId from "get-video-id";

export const EmbedPreview = (props: any) => {
    const { value } = props

    // YOUTUBE
    if (value.url.includes('youtube')) {
        return (
            <iframe style={{ padding: '10px' }} width='480' height='320' src={'https://www.youtube.com/embed/' + getVideoId(value.url).id} />
        )
    }

    // VIMEO
    if (value.url.includes('vimeo')) {
        return (
            <iframe style={{ padding: '10px' }} width='480' height='320' src={'https://player.vimeo.com/video/' + getVideoId(value.url).id} />
        )
    }

    // SOUNDCLOUD
    if (value.url.includes('soundcloud')) {
        return (
            <iframe style={{ padding: '10px' }} width='480' height='320' src={'https://w.soundcloud.com/player/?url=' + value.url} />
        )
    }
}