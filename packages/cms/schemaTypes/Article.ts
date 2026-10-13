import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import { MdLanguage } from "react-icons/md"

export default {
  title: 'Article',
  name: 'article',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'Byline',
      name: 'byline',
      type: 'simpleEditor'
    },
    {
      title: 'Author',
      name: 'author',
      type: 'string'
    },
    {
      title: "Links",
      name: "links",
      type: "array",
      options: {
        modal: "popover",
      },
      of: [
        {
          title: "Instagram",
          name: "instagram",
          icon: FaInstagram,
          type: "object",
          fields: [
            {
              title: "URL",
              name: "url",
              type: "url",
            },
          ],
        },
        {
          title: "Facebook",
          name: "facebook",
          icon: FaFacebook,
          type: "object",
          fields: [
            {
              title: "URL",
              name: "url",
              type: "url",
            },
          ],
        },
        {
          title: "Twitter",
          name: "twitter",
          icon: FaTwitter,
          type: "object",
          fields: [
            {
              title: "URL",
              name: "url",
              type: "url",
            },
          ],
        },
        {
          title: "Other",
          name: "other",
          icon: MdLanguage,
          type: "object",
          fields: [
            {
              title: "URL",
              name: "url",
              type: "url",
            },
          ],
        },
      ],
    },
    {
      title: 'Main image',
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      title: 'Zoomable slideshow layout',
      name: 'zoomableSlideshowLayout',
      type: 'boolean'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'contentEditor'
    },
    {
      title: 'Slideshow',
      name: 'slideshow',
      type: 'array',
      options: {
        modal: 'fullscreen'
      },
      of: [
        {
          type: 'image',
          options: {
            hotspot: true // <-- Defaults to false
          },
          fields: [
            {
              type: 'boolean',
              name: 'cover',
              title: 'Cover',
              description: 'Crop image to fill slideshow area',
            },
            {
              type: 'contentEditor',
              name: 'caption',
              title: 'Caption',
            }
          ]
        }
      ]
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200
      },
      validation: (Rule: any) => Rule.required()
    },
  ],
}
