import { format } from "date-fns";

export default {
    title: 'Article',
    name: 'article',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Byline',
            name: 'byline',
            type: 'simpleEditor'
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
            title: 'Zoomable slideshow layout',
            name: 'zoomableSlideshowLayout',
            type: 'boolean'
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor'
        },
        {
            title: 'Slideshow',
            name: 'slideshow',
            type: 'array',
            of: [{ type: 'image' }]
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200
            },
            validation: Rule => Rule.required()
        },
    ],
    // preview: {
    //     select: {
    //         title: 'title',
    //         publicationDate: 'publicationDate',
    //         mainImage: 'mainImage'
    //     },
    //     prepare(selection) {
    //         const { title, publicationDate, mainImage, author0, author1, author2, author3 } = selection

    //         const formattedDate = format(Date.parse(publicationDate), "yyyy.MM.dd")
    //         const authors = [author0, author1, author2].filter(Boolean)
    //         const subtitle = authors.length > 0 ? `${authors.join(', ')}` : ''
    //         const hasMoreAuthors = Boolean(author3)

    //         // console.dir(PostPreview)

    //         // return new PostPreview

    //         return {
    //             title: title,
    //             subtitle: hasMoreAuthors ? `${subtitle}…` : subtitle,
    //             media: mainImage,
    //             description: formattedDate
    //         }
    //     },
    //     // component: PostPreview
    // }
}
