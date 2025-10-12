import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tournament',
  title: 'Tournament',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tournament Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'sr', title: 'Serbian', type: 'text' },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Tournament Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'prizePool',
      title: 'Prize Pool (e.g., "$50,000 Prize Pool")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'players',
      title: 'Number of Players',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'buyIn',
      title: 'Buy-in Amount (e.g., "$100")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'winnerPrize',
      title: 'Winner Prize (e.g., "$15,000")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tableType',
      title: 'Table Type',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' },
      ],
    }),
    defineField({
      name: 'endDate',
      title: 'Tournament End Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'joinLink',
      title: 'Join Tournament Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this tournament on the site',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'prizePool',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'End Date, Newest',
      name: 'endDateDesc',
      by: [{ field: 'endDate', direction: 'desc' }],
    },
  ],
});
