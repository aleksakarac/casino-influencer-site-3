import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'sr', title: 'Serbian', type: 'text' },
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image shown when sharing on social media',
    }),
    defineField({
      name: 'backgroundTheme',
      title: 'Background Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Vavada Style (Default)', value: 'vavada' },
          { title: 'Minimal Dark', value: 'minimal' },
          { title: 'Animated Gradient', value: 'gradient' },
          { title: 'Geometric Grid', value: 'geometric' },
          { title: 'Particle Field', value: 'particles' },
        ],
      },
      initialValue: 'vavada',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'kick', title: 'Kick URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'discord', title: 'Discord URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'vavadaRefLink',
      title: 'Vavada Referral Link',
      type: 'url',
      description: 'Your Vavada casino referral link (will open in new tab)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
});
