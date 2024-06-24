import type { Article, Issue, BlockContent, Footnote } from "$lib/types/sanity.types"
import { PageType } from "$lib/enums"
import { format, getYear } from "date-fns";
import { flatMap } from "lodash-es"
import { toPlainText } from "$lib/modules/sanity"

export const formattedDate = (start: string, end?: string) => {
    if (!start) return "";

    const startDate = Date.parse(start);

    if (!end) return format(startDate, "dd.MM.yyyy");

    const endDate = Date.parse(end);

    if (format(startDate, "dd.MM.yyyy") == format(endDate, "dd.MM.yyyy")) {
        return format(startDate, "dd.MM.yyyy");
    }

    const startFormat =
        getYear(startDate) == getYear(endDate) ? "dd.MM" : "dd.MM.yyyy";
    const endFormat = "dd.MM.yyyy";

    return format(startDate, startFormat) + " – " + format(endDate, endFormat);
};

export const currentDateAndTime = (): string => {
    const currentDate = new Date();
    const startDate = currentDate.getTime();
    return format(startDate, "HH:mm dd.MM.yyyy");
};


export function scrollBack(target: HTMLElement, delay: number) {
    if (!target) return
    setTimeout(() => {
        target.scrollTop = 0
    }, delay)
}

export function extractFootnotes(mainContent: BlockContent) {
    let a = flatMap(mainContent.filter(c => c._type == "block").map(x => x.markDefs))
    let footnotes: Footnote[] = a.filter(x => x._type === "footnote")
    return footnotes
}

export function calculateArticleReadingTime(article: Article) {
    const blockContent = article?.content?.content
    if (!blockContent) return 0
    const wordsPerMinute = 200 // average reading speed
    const text = toPlainText(blockContent)
    const words = text.split(/\s/g).length // split by spaces
    const minutes = words / wordsPerMinute
    const readTime = Math.ceil(minutes)
    return readTime
}

export function mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function splitTextBlocks(text: BlockContent) {
    let shortText = []
    let extendedText = []

    // Check if there is at least one block to add to shortText
    if (text.length > 0) {
        shortText.push(text[0]) // Add the first text block to shortText
    }

    // Add all remaining blocks to extendedText
    for (let i = 1; i < text.length; i++) {
        extendedText.push(text[i])
    }

    return [shortText, extendedText]
}

export function getNextArticle(issue: Issue, article: Article) {
    if (!issue.tableOfContents) return null

    const articleIndex = issue.tableOfContents.findIndex(
        tocItem => tocItem._id === article._id,
    )

    if (articleIndex < issue.tableOfContents.length - 1) {
        return issue.tableOfContents[articleIndex + 1]
    } else {
        return null
    }
}

export function scrollToHash() {
    const newHash = window.location.hash.substring(1) // Remove the '#' from the hash
    const targetElement = document.getElementById(newHash)
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    } else {
        console.log("Element not found for hash: " + newHash)
    }
}

export function getPageType(route: string): PageType {
    console.log(route)
    switch (route) {
        case "/":
            return PageType.Landing
        case "/[issue]/[article]":
            return PageType.Article
        case "/nyhed/[slug]":
            return PageType.News
        case "/pdf/article/[slug]":
        case "/pdf/issue/[slug]":
        case "/pdf/news/[slug]":
            return PageType.Pdf
        default:
            return PageType.Error
    }
}

