import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'cardTag',
  title: 'Card Tags',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      description: 'E.g., NEW, HOT, EXCLUSIVE, VIP',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Tag Color',
      type: 'color',
      description: 'Background color for this tag',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
      description: 'Text color for readability',
      options: {
        disableAlpha: true,
      },
    }),
  ],
});
