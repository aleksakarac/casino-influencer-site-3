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
      description: 'Upload 1-5 images for the hero carousel. Desktop: 1920×600px (3.2:1), Mobile: 1920×800px (2.4:1)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'desktopImage',
              title: 'Desktop Image',
              type: 'image',
              description: 'Recommended: 1920×600 pixels (3.2:1 aspect ratio) - Wide format for desktop/tablet displays',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'mobileImage',
              title: 'Mobile Image',
              type: 'image',
              description: 'Recommended: 1920×800 pixels (2.4:1 aspect ratio) or 1200×800 pixels (1.5:1) for mobile displays',
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
              media: 'desktopImage',
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
