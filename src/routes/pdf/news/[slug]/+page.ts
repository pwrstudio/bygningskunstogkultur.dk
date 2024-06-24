import type { News } from "$lib/types/sanity.types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const news: News = await loadData(queries.singleNews, { slug: params.slug })
    return {
        news
    };
}