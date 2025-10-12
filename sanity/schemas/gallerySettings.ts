import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'gallerySettings',
  title: 'Hero Gallery Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'sr', title: 'Serbian', type: 'string' },
              ],
            },
          ],
          preview: {
            select: {
              title: 'alt.en',
              media: 'image',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'autoPlaySpeed',
      title: 'Auto-play Speed (seconds)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(3).max(10),
    }),
  ],
});
