import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { News, About, Colophon } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const news: News[] = await loadData(queries.news, {})
    const colophon: Colophon = await loadData(queries.colophon, {})
    const about: About = await loadData(queries.about, {})

    return {
        news,
        colophon,
        about
    };
}