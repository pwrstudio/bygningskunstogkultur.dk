export default {
    title: 'Colophon',
    name: 'colophon',
    type: 'document',
    __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'Logo',
            name: 'logo',
            type: 'image'
        },
        {
            title: 'Wide column',
            name: 'wideColumn',
            type: 'contentEditor'
        },
        {
            title: 'First narrow column',
            name: 'firstNarrowColumn',
            type: 'contentEditor'
        },
        {
            title: 'Second narrow column',
            name: 'secondNarrowColumn',
            type: 'contentEditor'
        },
    ]
}
