import {defineField, defineType} from 'sanity'

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
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
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
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'features',
      title: 'Features',
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
      type: 'object',
      fields: [
        defineField({name: 'demo', type: 'url', title: 'Demo URL'}),
        defineField({name: 'repo', type: 'url', title: 'Repository URL'}),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        defineField({name: 'provider', type: 'string', title: 'Provider', options: {list: ['youtube', 'vimeo']}}),
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
