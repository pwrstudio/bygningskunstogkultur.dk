import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: 'yesqrmft',
        dataset: 'production'
    },
    studioHost: 'mbk-admin',
    deployment: {
        appId: '111330b402a4f9b779bfa359'
    }
})
