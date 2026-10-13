import { MdPreview } from "react-icons/md"

const getCategory = (props: any) => {
    switch(props.type) {
        case 'news':
            return 'nyhed/'
        case 'article':
            return 'preview-article/'
        case 'page':
            return "page/"
        case 'issue':
            return ""
        default:
            return ""
        }
    }

export function PreviewAction(props: any) { 
    return {
      label: 'Preview',
      icon: MdPreview,
      onHandle: () => {
        console.log('props', props)

        if(!props?.published) {
          window.alert('This document has not been published yet')
          return
        }

        // const category = props.type === "product" ? "shop" : props.published.taxonomy?.category
        const slug = props.published.slug?.current

        if(!slug) {
          window.alert('This document is missing a slug')
          return
        }

        const category = getCategory(props)

        const previewUrl = `https://preview-bygningskunstogkultur.netlify.app/${category}${slug}`
        window.open(previewUrl, '_blank', 'noopener,noreferrer')
      }    
    } 
  }