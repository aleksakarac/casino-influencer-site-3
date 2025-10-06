export default {
  name: 'heroGallery',
  title: 'Hero Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Active (Show in gallery)',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'altText.en',
      media: 'image',
      order: 'displayOrder'
    },
    prepare(selection: any) {
      const { title, media, order } = selection;
      return {
        title: title || 'Untitled',
        subtitle: `Order: ${order}`,
        media
      };
    }
  }
}
