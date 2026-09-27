// ICONS
import { MdVideocam } from "react-icons/md"
import { VideoPreview } from '../components/VideoPreview'

export default {
    name: 'videoBlock',
    type: 'object',
    title: 'Video',
    icon: MdVideocam,
    fields: [
        {
            name: 'videoFile',
            type: 'file',
            title: 'video file',
            description: 'File format: mp4',
        },
        {
            name: 'posterImage',
            type: 'image',
            title: 'Poster image'
        },
        {
            title: 'Autoplay',
            name: 'autoPlay',
            type: 'boolean',
        },
        {
            title: 'Caption',
            name: 'caption',
            type: 'simpleEditor',
        },
    ],
    components: {
        preview: VideoPreview
    },
    preview: {
        select: {
            videoUrl: 'videoFile.asset.url',
            caption: 'caption',
            attribution: 'attribution'
        }
    }
}