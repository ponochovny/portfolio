import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Add summary of the project',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      description: 'Year the project was completed',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      description: 'Set to true to feature this project on the homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'reference', to: {type: 'technology'}}],
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption displayed below the image.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      description: 'Add key features of the project',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'body', type: 'text', title: 'Body'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges',
      description: 'Add key challenges of the project',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'body', type: 'text', title: 'Body'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      description: 'Add key metrics of the project',
      type: 'object',
      fields: [
        defineField({name: 'performance', type: 'number', title: 'Performance (0-100)'}),
        defineField({name: 'accessibility', type: 'number', title: 'Accessibility (0-100)'}),
        defineField({name: 'seo', type: 'number', title: 'SEO (0-100)'}),
        defineField({name: 'commits', type: 'number', title: 'Commits'}),
        defineField({name: 'stars', type: 'number', title: 'Stars'}),
        defineField({name: 'lastUpdated', type: 'string', title: 'Last Updated'}),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      description: 'Add links to the project',
      type: 'object',
      fields: [
        defineField({name: 'demo', type: 'url', title: 'Demo URL'}),
        defineField({name: 'repo', type: 'url', title: 'Repository URL'}),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      description: 'Add video to the project',
      type: 'object',
      fields: [
        defineField({
          name: 'provider',
          type: 'string',
          title: 'Provider',
          options: {list: ['youtube', 'vimeo']},
        }),
        defineField({name: 'id', type: 'string', title: 'Video ID'}),
        defineField({name: 'title', type: 'string', title: 'Title'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cover',
    },
  },
})
