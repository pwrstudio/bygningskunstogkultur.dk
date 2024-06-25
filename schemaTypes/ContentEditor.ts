
import { MdImage, MdShortText } from "react-icons/md"
import { alignCenterRender, alignRightRender, noteRender, footNoteRender } from './decorators'
import { component } from "sanity/structure"

export default {
    type: 'object',
    name: 'contentEditor',
    options: { collapsible: false, collapsed: false },
    fields: [
        {
            title: 'Content editor',
            name: 'content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        {
                            title: 'Center aligned',
                            value: 'center-aligned',
                            component: alignCenterRender
                        },
                        {
                            title: 'Right aligned',
                            value: 'right-aligned',
                            component: alignRightRender
                        },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                        {
                            title: 'Note',
                            value: 'note',
                            component: noteRender
                        }
                    ],
                    marks: {
                        decorators: [
                            {
                                title: 'Strong',
                                value: 'strong'
                            },
                            {
                                title: 'Emphasis',
                                value: 'em'
                            },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'string'
                                    }
                                ]
                            },
                            {
                                name: 'footnote',
                                type: 'object',
                                title: 'Footnote',
                                component: footNoteRender,
                                icon: MdShortText,
                                fields: [
                                    {
                                        title: 'Footnote text',
                                        name: 'content',
                                        type: 'simpleEditor'
                                    },
                                ]
                            },
                        ]
                    },
                },
                {
                    type: 'image',
                    icon: MdImage,
                    fields: [
                        {
                            title: 'Caption',
                            name: 'caption',
                            type: 'simpleEditor'
                        },
                        {
                            name: 'attribution',
                            type: 'string',
                            title: 'Attribution'
                        },
                        {
                            title: 'Fullbredd',
                            name: 'fullWidth',
                            type: 'boolean'
                        },
                    ]
                },
                {
                    type: 'videoBlock'
                },
                {
                    type: 'audioBlock'
                },
                {
                    type: 'embedBlock'
                },
            ]
        }
    ]
}