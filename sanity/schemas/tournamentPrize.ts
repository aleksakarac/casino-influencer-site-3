import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tournamentPrize',
  title: 'Tournament Prize',
  type: 'document',
  fields: [
    defineField({
      name: 'prizeNumber',
      title: 'Prize Number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1).max(4),
      description: 'Prize position (1-4)',
    }),
    defineField({
      name: 'prizeImage',
      title: 'Prize Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prizeTitle',
      title: 'Prize Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prizeDescription',
      title: 'Prize Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'sr', title: 'Serbian', type: 'text' },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
      initialValue: 1,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this prize',
    }),
  ],
  preview: {
    select: {
      title: 'prizeTitle.en',
      subtitle: 'prizeNumber',
      media: 'prizeImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Prize ${subtitle}: ${title}`,
        media: selection.media,
      };
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
