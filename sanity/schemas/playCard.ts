import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'playCard',
  title: 'Play Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Game Title',
      type: 'string',
      description: 'E.g., Sweet Rush Bonanza, Dead West',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gameImage',
      title: 'Game Image',
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
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
