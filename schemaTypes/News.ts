export default {
    title: 'News',
    name: 'news',
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
            title: 'Location',
            name: 'location',
            type: 'string'
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
            title: 'Content',
            name: 'content',
            type: 'simpleEditor'
        },
        {
            title: 'Extended view',
            name: 'extendedView',
            type: 'boolean'
        },
        {
            title: 'Extended content',
            name: 'extendedContent',
            type: 'simpleEditor'
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
