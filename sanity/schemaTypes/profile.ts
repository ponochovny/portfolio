import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'since',
      title: 'Since Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy',
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
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Label'}),
            defineField({name: 'href', type: 'url', title: 'URL'}),
            defineField({name: 'handle', type: 'string', title: 'Handle'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume (File or URL)',
      type: 'file',
    }),
    defineField({
      name: 'stackGroups',
      title: 'Stack Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Group Title'}),
            defineField({name: 'items', title: 'Technologies', type: 'array', of: [{type: 'reference', to: {type: 'technology'}}]}),
          ],
        },
      ],
    }),
  ],
})
