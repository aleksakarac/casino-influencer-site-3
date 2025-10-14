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
      description: 'Upload 1-5 images for the hero carousel. Ideal dimensions: 1920×800 pixels (2.4:1 aspect ratio)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Recommended size: 1920×800 pixels. Images will be cropped to fit this aspect ratio.',
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
