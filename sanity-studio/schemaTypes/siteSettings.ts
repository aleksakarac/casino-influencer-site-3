export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'kick',
          title: 'Kick URL',
          type: 'url',
          validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] })
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] })
        },
        {
          name: 'discord',
          title: 'Discord URL',
          type: 'url',
          validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] })
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Site Title',
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'sr', title: 'Serbian', type: 'string' }
          ]
        },
        {
          name: 'description',
          title: 'Site Description',
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'text' },
            { name: 'sr', title: 'Serbian', type: 'text' }
          ]
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image shown when sharing on social media'
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      };
    }
  }
}
