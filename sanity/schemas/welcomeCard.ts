import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'welcomeCard',
  title: 'Welcome Bonus Card',
  type: 'document',
  fields: [
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
    }),
    defineField({
      name: 'bonusCode',
      title: 'Welcome Bonus Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points of benefits (e.g., "100 Besplatnih Spinova")',
      validation: (Rule) => Rule.required().min(1),
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
