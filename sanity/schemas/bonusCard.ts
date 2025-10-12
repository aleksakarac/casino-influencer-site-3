import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'bonusCard',
  title: 'Bonus Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Card Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag (Optional)',
      type: 'reference',
      to: [{ type: 'cardTag' }],
      description: 'Select a tag like NEW, HOT, etc. Leave empty for no tag',
    }),
    defineField({
      name: 'activationsCount',
      title: 'Activations Count',
      type: 'number',
      description: 'Number of available code activations (e.g., 12)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'bonusCode',
      title: 'Bonus Code',
      type: 'string',
      description: 'The code users will copy (e.g., SZYMOOL)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (left to right, top to bottom)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active cards are displayed on the site',
      initialValue: true,
    }),
  ],
});
