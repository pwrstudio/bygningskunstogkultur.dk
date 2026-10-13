import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./schemaTypes"
import structure from "./deskStructure"
import { PreviewAction } from "./actions"

// Singletons (see deskStructure.ts): editors should not create more of these
const SINGLETON_TYPES = ["about", "colophon"]

export default defineConfig({
  name: "default",
  title: "Magasin for Bygningskunst og Kultur",

  projectId: "yesqrmft",
  dataset: "production",

  plugins: [structureTool({ structure })],

  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(
            (template) => !SINGLETON_TYPES.includes(template.templateId),
          )
        : prev,
    // Added to the default actions (publish, unpublish, delete, ...)
    actions: [PreviewAction],
  },

  schema: {
    types: schemaTypes,
  },
})
