import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
    // Redirect to the front page
    redirect(301, "/");
}