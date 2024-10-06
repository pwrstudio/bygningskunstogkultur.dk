import { MdNote } from "react-icons/md"

export default {
    title: 'Issue',
    name: 'issue',
    icon: MdNote,
    type: 'document',
    initialValue: {
        editorialState: "preview"
    },
    fields: [
        {
            title: "Editorial state",
            name: "editorialState",
            type: "string",
            options: {
                list: [
                    { title: "Live", value: "live" },
                    { title: "Preview", value: "preview" },
                ],
                layout: "radio"
            },
        },
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