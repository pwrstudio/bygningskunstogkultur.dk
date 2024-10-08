import { createClient } from "@sanity/client"
import blocksToHtml from '@sanity/block-content-to-html'
import imageUrlBuilder from '@sanity/image-url'
import getVideoId from "get-video-id";
import { has } from "lodash-es"
import type { BlockContent } from "$lib/types/sanity.types";

const SANITY_ID = 'yesqrmft'

export const client = createClient({
    projectId: SANITY_ID,
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2024-06-06',
})

const h = blocksToHtml.h

const prepareTextElements = (props: any) => {
    let textElements = []
    if (has(props, 'node.caption.content'))
        textElements.push(h('figcaption', { className: 'caption' }, toPlainText(props.node.caption.content)))
    if (has(props, 'node.attribution'))
        textElements.push(h('figcaption', { className: 'credits' }, props.node.attribution))
    return textElements
}

export const renderBlockText = (blocks: BlockContent) =>
    blocksToHtml({
        blocks: blocks,
        serializers: serializers,
        projectId: SANITY_ID,
        dataset: 'production',
    })

export const toPlainText = (blocks: BlockContent) => {
    return (
        blocks
            .map(block => {
                if (block._type !== 'block' || !block.children) {
                    return ''
                }
                return block.children.map(child => child.text).join('')
            })
            .join('\n\n')
    )
}

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

const serializers = {
    marks: {
        link: (props: any) =>
            h(
                'a',
                { target: '_blank', rel: 'noreferrer', href: props.mark.href },
                props.children
            ),
        pageLink: (props: any) => {
                return h(
                    'a',
                    { href: `/page/${props.mark?.slug ?? ''}` },
                    props.children
                )
            },
        interviewName: (props: any) =>
            h(
                'span',
                { className: 'interview-name' },
                props.children
            ),
        footnote: (props: any) => {
            return h(
                'span',
                props.children,
                h(
                    'a',
                    { id: 'link-' + props.mark._key, className: 'footnote-link', href: '#note-' + props.mark._key },
                )
            )
        }
    },
    types: {
        block: (props: any) => {
            const style = props.node.style || 'normal'

            if (style === 'blockquote')
                return h('blockquote', {}, props.children)

            if (style === 'h2')
                return h('h2', {}, props.children)

            if (style === 'h3')
                return h('h3', {}, props.children)

            if (style === 'h4')
                return h('h4', {}, props.children)

            return h('p', { className: style }, props.children)
        },
        image: (props: any) => {
            return h('figure', { className: 'image' }, [
                h('img', {
                    src: urlFor(props.node.asset)
                        .width(800)
                        .quality(90)
                        .auto('format')
                        .url()
                }),
                ...prepareTextElements(props)
            ])
        },
        embedBlock: (props: any) => {
            // YOUTUBE
            if (props.node.url.includes('youtube')) {
                return h('figure', { className: 'youtube' }, [
                    h('div', { className: 'embed-container' },
                        h('iframe', { width: '720', height: '480', src: 'https://www.youtube.com/embed/' + getVideoId(props.node.url).id, frameborder: 'no', allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', allowfullscreen: true })),
                    ...prepareTextElements(props)
                ])
            }
            // VIMEO
            if (props.node.url.includes('vimeo')) {
                return h('figure', { className: 'vimeo' }, [
                    h('div', { className: 'embed-container' },
                        h('iframe', { width: '720', height: '480', src: 'https://player.vimeo.com/video/' + getVideoId(props.node.url).id, frameborder: 'no', byline: false, color: '#ffffff', allow: 'autoplay; fullscreen', allowfullscreen: true })),
                    ...prepareTextElements(props)
                ])
            }
            // SOUNDCLOUD
            if (props.node.url.includes('soundcloud')) {
                return h('figure', { className: 'soundcloud' }, [
                    h('div', { className: 'soundcloud-container' }, h('iframe', { width: '100%', height: '300', src: 'https://w.soundcloud.com/player/?url=' + props.node.url + '&color=%23fffff', frameborder: 'no', scrolling: "no", allow: 'autoplay' })),
                    ...prepareTextElements(props)
                ])
            }
        },
        videoBlock: (props: any) => {
            const videoUrl = 'https://cdn.sanity.io/files/yesqrmft/production/' + props.node.videoFile.asset._ref
                .replace('file-', '')
                .replace('-mp4', '.mp4')
            const posterUrl = props.node.posterImage ? urlFor(props.node.posterImage).width(640).quality(90).auto('format').url() : ''
            return h('figure', { className: 'video' }, [
                h('video', { src: videoUrl, controls: true, loop: true, autoplay: props.node.autoPlay, poster: posterUrl }),
                ...prepareTextElements(props)
            ])
        },
        audioBlock: (props: any) => {
            const audioUrl = 'https://cdn.sanity.io/files/yesqrmft/production/' + props.node.audioFile.asset._ref
                .replace('file-', '')
                .replace('-mp3', '.mp3')
            return h('figure', { className: 'audio' }, [
                h('audio', { src: audioUrl, controls: true }),
                ...prepareTextElements(props)
            ])
        }
    }
}

export const loadData = async (query: string, params: any) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject(new Error("404"));
        }
        return res
    } catch (err) {
        return Promise.reject(new Error("404"));
    }
}
