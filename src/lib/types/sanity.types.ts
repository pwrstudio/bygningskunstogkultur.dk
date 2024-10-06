/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
    _type: "sanity.imagePaletteSwatch";
    background?: string;
    foreground?: string;
    population?: number;
    title?: string;
};

export type SanityImagePalette = {
    _type: "sanity.imagePalette";
    darkMuted?: SanityImagePaletteSwatch;
    lightVibrant?: SanityImagePaletteSwatch;
    darkVibrant?: SanityImagePaletteSwatch;
    vibrant?: SanityImagePaletteSwatch;
    dominant?: SanityImagePaletteSwatch;
    lightMuted?: SanityImagePaletteSwatch;
    muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
    _type: "sanity.imageDimensions";
    height?: number;
    width?: number;
    aspectRatio?: number;
};

export type Geopoint = {
    _type: "geopoint";
    lat?: number;
    lng?: number;
    alt?: number;
};

export type VideoBlock = {
    _type: "videoBlock";
    videoFile?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
        };
        _type: "file";
    };
    posterImage?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    autoPlay?: boolean;
    caption?: SimpleEditor;
};

export type News = {
    _id: string;
    _type: "news";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    publicationDate?: string;
    location?: string;
    mainImage?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    content?: SimpleEditor;
    extendedView?: boolean;
    extendedContent?: SimpleEditor;
    slug: Slug;
};

export type Page = {
    _id: string;
    _type: "page";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    content?: ContentEditor;
    slug?: Slug;
};

export type Issue = {
    _id: string;
    _type: "issue";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    publicationDate?: string;
    mainImage?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    tableOfContents?: Article[];
    slug: Slug;
};

export type EmbedBlock = {
    _type: "embedBlock";
    url?: string;
    caption?: SimpleEditor;
};

export type Colophon = {
    _id: string;
    _type: "colophon";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    logo?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    wideColumn?: ContentEditor;
    firstNarrowColumn?: ContentEditor;
    secondNarrowColumn?: ContentEditor;
};

export type AudioBlock = {
    _type: "audioBlock";
    title?: string;
    audioFile?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
        };
        _type: "file";
    };
};

export type ImageBlock = {
    asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    caption?: SimpleEditor;
    attribution?: string;
    fullWidth?: boolean;
    _type: "image";
}

export type TextBlock = {
    children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
    }>;
    style?: "normal" | "center-aligned" | "right-aligned" | "h1" | "h2" | "h3" | "h4" | "blockquote" | "note";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
    } | {
        content?: SimpleEditor;
        _type: "footnote";
        _key: string;
    }>;
    level?: number;
    _type: "block";
}

export type Article = {
    _id: string;
    _type: "article";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    byline?: SimpleEditor;
    author?: string;
    links?: Array<{
        url?: string;
        _type: "instagram";
        _key: string;
    } | {
        url?: string;
        _type: "facebook";
        _key: string;
    } | {
        url?: string;
        _type: "twitter";
        _key: string;
    } | {
        url?: string;
        _type: "other";
        _key: string;
    }>;
    mainImage?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    zoomableSlideshowLayout?: boolean;
    content?: ContentEditor;
    slideshow?: Slide[];
    slug: Slug;
};

export type Slide = {
    asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    cover?: boolean;
    caption?: ContentEditor;
    _type: "image";
    _key: string;
}

export type Slug = {
    _type: "slug";
    current: string;
    source?: string;
};

export type About = {
    _id: string;
    _type: "about";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    content?: ContentEditor;
};

export type BlockContent = Array<
    ({ _key: string; } & TextBlock) |
    ({ _key: string; } & ImageBlock) |
    ({ _key: string; } & VideoBlock) |
    ({ _key: string; } & AudioBlock) |
    ({ _key: string; } & EmbedBlock)>

export type ContentEditor = {
    _type: "contentEditor";
    content?: BlockContent;
};

export type SanityFileAsset = {
    _id: string;
    _type: "sanity.fileAsset";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    originalFilename?: string;
    label?: string;
    title?: string;
    description?: string;
    altText?: string;
    sha1hash?: string;
    extension?: string;
    mimeType?: string;
    size?: number;
    assetId?: string;
    uploadId?: string;
    path?: string;
    url?: string;
    source?: SanityAssetSourceData;
};

export type SanityImageCrop = {
    _type: "sanity.imageCrop";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};

export type SanityImageHotspot = {
    _type: "sanity.imageHotspot";
    x?: number;
    y?: number;
    height?: number;
    width?: number;
};

export type SanityImageAsset = {
    _id: string;
    _type: "sanity.imageAsset";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    originalFilename?: string;
    label?: string;
    title?: string;
    description?: string;
    altText?: string;
    sha1hash?: string;
    extension?: string;
    mimeType?: string;
    size?: number;
    assetId?: string;
    uploadId?: string;
    path?: string;
    url?: string;
    metadata?: SanityImageMetadata;
    source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
    _type: "sanity.assetSourceData";
    name?: string;
    id?: string;
    url?: string;
};

export type SanityImageMetadata = {
    _type: "sanity.imageMetadata";
    location?: Geopoint;
    dimensions?: SanityImageDimensions;
    palette?: SanityImagePalette;
    lqip?: string;
    blurHash?: string;
    hasAlpha?: boolean;
    isOpaque?: boolean;
};

export type SimpleEditor = {
    _type: "simpleEditor";
    content?: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?: "normal";
        listItem?: never;
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }>;
};

export type Footnote = {
    _key: string;
    _type: "footnote";
    content?: SimpleEditor;
}

export declare const internalGroqTypeReferenceTo: unique symbol;

