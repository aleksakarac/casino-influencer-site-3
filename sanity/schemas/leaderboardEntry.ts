import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'leaderboardEntry',
  title: 'Leaderboard Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'place',
      title: 'Place',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1).max(100),
      description: 'Leaderboard placement (1-10 for top viewers)',
    }),
    defineField({
      name: 'viewerName',
      title: 'Viewer Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
      description: 'Display name of the viewer',
    }),
    defineField({
      name: 'watchtime',
      title: 'Watch Time (Display)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Formatted watch time display (e.g., "1,247h")',
      placeholder: '1,247h',
    }),
    defineField({
      name: 'watchTimeHours',
      title: 'Watch Time (Hours)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Total watch time in hours (for sorting)',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this entry',
    }),
  ],
  preview: {
    select: {
      title: 'viewerName',
      subtitle: 'watchtime',
      place: 'place',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, place, isActive } = selection;
      return {
        title: `#${place} - ${title}`,
        subtitle: `${subtitle} ${isActive ? '✓ Active' : '✗ Hidden'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Place (Ascending)',
      name: 'placeAsc',
      by: [{ field: 'place', direction: 'asc' }],
    },
    {
      title: 'Watch Time (Descending)',
      name: 'watchTimeDesc',
      by: [{ field: 'watchTimeHours', direction: 'desc' }],
    },
  ],
});
