// ICONS
import {
    MdHome,
    MdStars,
    MdEmail,
    MdNote,
    MdLibraryBooks,
    MdEditDocument,
} from "react-icons/md"

export default (S: any) =>
    S.list()
        .title("Magasin for Bygningskunst og Kultur")
        .items([
            S.listItem()
                .title('Issues')
                .icon(MdLibraryBooks)
                .child(
                    S.documentList()
                        .title('Issues')
                        .showIcons(true)
                        .filter('_type == $type')
                        .params({ type: 'issue' })
                        .defaultOrdering([{ field: 'publicationDate', direction: 'asc' }])
                ),
            S.listItem()
                .title('Articles')
                .icon(MdNote)
                .child(
                    S.documentList()
                        .title('Articles')
                        .filter('_type == $type')
                        .params({ type: 'article' })
                ),
            S.divider(),
            S.listItem()
                .title('News')
                .icon(MdStars)
                .child(
                    S.documentList()
                        .title('News')
                        .filter('_type == $type')
                        .params({ type: 'news' })
                        .defaultOrdering([{ field: 'publicationDate', direction: 'asc' }])
                ),
            S.divider(),
            S.listItem()
                .title("Om IBK")
                .icon(MdHome)
                .child(
                    S.editor()
                        .id('about')
                        .schemaType("about")
                        .documentId("about")
                ),
            S.listItem()
                .title("Kolofon")
                .icon(MdEmail)
                .child(
                    S.editor()
                        .id('colophon')
                        .schemaType("colophon")
                        .documentId("colophon")
                ),
            S.divider(),
            S.listItem()
                .title('Pages')
                .icon(MdEditDocument)
                .child(
                    S.documentList()
                        .title('Pages')
                        .filter('_type == $type')
                        .params({ type: 'page' })
                ),
        ]);