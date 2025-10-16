import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'activeBet',
  title: 'Active Bet',
  type: 'document',
  fields: [
    defineField({
      name: 'useImageMode',
      title: 'Use Image Mode',
      type: 'boolean',
      description: 'Toggle ON to display a custom image instead of bet details',
      initialValue: false,
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      description: 'Upload an image to display as the entire card (covers full card)',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => !parent?.useImageMode,
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const parent = context.parent as any;
          if (parent?.useImageMode && !image) {
            return 'Image is required when Image Mode is enabled';
          }
          return true;
        }),
    }),
    defineField({
      name: 'matchTitle',
      title: 'Match Title',
      type: 'string',
      description: 'e.g., "Curacao vs. Trinidad and Tobago"',
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((title, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && !title) {
            return 'Match Title is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'betType',
      title: 'Bet Type',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', placeholder: 'e.g., Correct score' },
        { name: 'sr', title: 'Serbian', type: 'string', placeholder: 'e.g., Tačan rezultat' },
      ],
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((betType, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && !betType) {
            return 'Bet Type is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'selection',
      title: 'Bet Selection',
      type: 'text',
      rows: 2,
      description: 'e.g., "2:1", "Over 2.5", "Home Win" - accepts any characters',
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((selection, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && !selection) {
            return 'Bet Selection is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'matchDateTime',
      title: 'Match Date & Time',
      type: 'datetime',
      description: 'When the match takes place',
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((dateTime, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && !dateTime) {
            return 'Match Date & Time is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'isBoostedOdds',
      title: 'Is Boosted Odds?',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle if this bet has boosted odds',
      hidden: ({ parent }) => parent?.useImageMode === true,
    }),
    defineField({
      name: 'originalOdds',
      title: 'Original Odds',
      type: 'number',
      description: 'Original odds (shown if boosted)',
      hidden: ({ parent }) => !parent?.isBoostedOdds || parent?.useImageMode === true,
    }),
    defineField({
      name: 'odds',
      title: 'Current Odds',
      type: 'number',
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((odds, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && (!odds || odds <= 0)) {
            return 'Current Odds is required and must be positive';
          }
          return true;
        }),
    }),
    defineField({
      name: 'stake',
      title: 'Total Stake (€)',
      type: 'number',
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((stake, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && (!stake || stake <= 0)) {
            return 'Total Stake is required and must be positive';
          }
          return true;
        }),
    }),
    defineField({
      name: 'potentialWin',
      title: 'Potential Win (€)',
      type: 'number',
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((win, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && (!win || win <= 0)) {
            return 'Potential Win is required and must be positive';
          }
          return true;
        }),
    }),
    defineField({
      name: 'status',
      title: 'Bet Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Won', value: 'won' },
          { title: 'Lost', value: 'lost' },
          { title: 'Cashed Out', value: 'cashedOut' },
        ],
      },
      initialValue: 'open',
      hidden: ({ parent }) => parent?.useImageMode === true,
      validation: (Rule) =>
        Rule.custom((status, context) => {
          const parent = context.parent as any;
          if (!parent?.useImageMode && !status) {
            return 'Bet Status is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'cashoutAmount',
      title: 'Cashout Amount (€)',
      type: 'number',
      description: 'Available cashout amount (if applicable)',
      hidden: ({ parent }) => parent?.status !== 'open' || parent?.useImageMode === true,
    }),
    defineField({
      name: 'betId',
      title: 'Bet ID',
      type: 'string',
      description: 'Bet reference ID from Vavada',
      hidden: ({ parent }) => parent?.useImageMode === true,
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this bet on the site',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'matchTitle',
      subtitle: 'status',
      odds: 'odds',
      stake: 'stake',
    },
    prepare(selection) {
      const { title, subtitle, odds, stake } = selection;
      return {
        title: title,
        subtitle: `${subtitle?.toUpperCase()} | Odds: ${odds} | Stake: €${stake}`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Match Date, Newest',
      name: 'matchDateDesc',
      by: [{ field: 'matchDateTime', direction: 'desc' }],
    },
  ],
});
