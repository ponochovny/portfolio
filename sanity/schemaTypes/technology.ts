import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (SVG string or Image)',
      type: 'image', // Or 'string', if you will be inserting SVG code
    }),
  ],
})
