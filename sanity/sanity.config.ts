import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['profile'])

export default defineConfig({
  name: 'default',
  title: 'my-portfolio',

  projectId: 'd4snwxn9',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Our singleton type has a list item with a custom child
            S.listItem().title('Profile').id('profile').child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document().schemaType('profile').documentId('profile'),
            ),
            // Regular document types
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('experience').title('Experience'),
            S.documentTypeListItem('technology').title('Technologies'),
          ]),
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin:
          process.env.NODE_ENV === 'production'
            ? 'https://ponochovny.vercel.app'
            : 'http://localhost:3000',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "New document" menu options
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
