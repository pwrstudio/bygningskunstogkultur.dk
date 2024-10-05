/** 
 *  GROQ queries for Sanity CMS
 *  https://www.sanity.io/docs/groq
 */

const resolvePageLinks = `{
        ...,
        content {
          ...,
          content[] {
            ...,
            markDefs[]{
              ...,
              "slug": select(
                _type == "pageLink" => reference->slug.current,
                null
              )
            }
          }
        }
      }`

const resolvePageLinksColophon = `{
        ...,
        wideColumn {
          ...,
          content[] {
            ...,
            markDefs[]{
              ...,
              "slug": select(
                _type == "pageLink" => reference->slug.current,
                null
              )
            }
          }
        }
      }`


export const queries = {
    news: `*[_type == 'news']${resolvePageLinks} | order(publicationDate desc)`,
    issues: "*[_type == 'issue'] | order(publicationDate desc)",
    about: `*[_id == 'about']{...}[0]${resolvePageLinks}`,
    colophon: `*[_id == 'colophon']{...}[0]${resolvePageLinksColophon}`,
    singleIssue: `*[_type == 'issue' && slug.current == $slug][0] {..., tableOfContents[]->${resolvePageLinks}}`,
    issueByArticle: "*[_type == 'issue' && references($id)][0]",
    singleArticle: `*[_type == 'article' && slug.current == $slug][0]${resolvePageLinks}`,
    singleNews: `*[_type == 'news' && slug.current == $slug][0]${resolvePageLinks}`,
    singlePage: `*[_type == 'page' && slug.current == $slug][0]${resolvePageLinks}`
};
