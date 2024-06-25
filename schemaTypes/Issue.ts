// ICONS
import { MdNote } from "react-icons/md"

export default {
    title: 'Issue',
    name: 'issue',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Publication date',
            name: 'publicationDate',
            type: 'date',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Main image',
            name: 'mainImage',
            type: 'image',
            options: {
                hotspot: true
            },
        },
        {
            title: 'Table of Content',
            name: 'tableOfContents',
            type: 'array',
            of: [
                {
                    title: 'Article',
                    name: 'articleLink',
                    type: 'reference',
                    to: [{ type: 'article' }]
                }
            ]
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200
            },
            validation: (Rule: any) => Rule.required()
        },
    ]
}