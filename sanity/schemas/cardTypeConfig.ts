import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'cardTypeConfig',
  title: 'Card Type Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'bonusCardBorderColor',
      title: 'Bonus Card Border Color',
      type: 'color',
      description: 'Border color for all Bonus cards',
    }),
    defineField({
      name: 'playCardBorderColor',
      title: 'Play Card Border Color',
      type: 'color',
      description: 'Border color for all Play cards',
    }),
    defineField({
      name: 'welcomeCardBorderColor',
      title: 'Welcome Bonus Border Color',
      type: 'color',
      description: 'Border color for all Welcome Bonus cards',
    }),
  ],
});
