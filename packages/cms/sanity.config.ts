import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import deskStructure from './deskStructure'
import { PreviewAction } from './actions'

export default defineConfig({
    name: 'default',
    title: 'Magasin for Bygningskunst og Kultur',

    projectId: 'yesqrmft',
    dataset: 'production',

    plugins: [
        structureTool({ structure: deskStructure })
    ],

    document: {
        newDocumentOptions: (prev, { creationContext }) => {
            const { type } = creationContext;
            const DISABLED_TYPES = [
                'about',
                'colophon'
            ];
            if (type === 'global') {
                return prev.filter((template) => !DISABLED_TYPES.includes(template.templateId));
            }
            return prev;
        },
        actions: [PreviewAction]
    },
    schema: {
        types: schemaTypes,
    },
})
