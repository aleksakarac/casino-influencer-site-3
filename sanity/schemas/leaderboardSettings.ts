import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'leaderboardSettings',
  title: 'Leaderboard Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'sr', title: 'Serbian', type: 'text' },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide the leaderboard page',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'subtitle.en',
    },
  },
});
