import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Page } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const page: Page = await loadData(queries.singlePage, { slug: params.slug })
    return {
        page
    };
}