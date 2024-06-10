/** 
 *  GROQ queries for Sanity CMS
 *  https://www.sanity.io/docs/groq
 */
export const queries = {
    news: "*[_type == 'news'] | order(publicationDate desc)",
    issues: "*[_type == 'issue'] | order(publicationDate desc)",
    about: "*[_id == 'about']{...}[0]",
    colophon: "*[_id == 'colophon']{...}[0]",
    singleIssue: "*[_type == 'issue' && slug.current == $slug][0] {..., tableOfContents[]->{...}}",
    singleArticle: "*[_type == 'article' && slug.current == $slug][0]",
    singleNews: "*[_type == 'news' && slug.current == $slug][0]",
}