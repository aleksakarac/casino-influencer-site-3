import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'leaderboardEntry',
  title: 'Leaderboard Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'viewerName',
      title: 'Viewer Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
      description: 'Display name of the viewer',
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
      description: 'Total points earned (based on watch time and bonuses). Viewers are automatically ranked by highest points.',
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
      points: 'points',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, points, isActive } = selection;
      return {
        title: title,
        subtitle: `${points.toLocaleString()} points ${isActive ? '✓ Active' : '✗ Hidden'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Points (Highest First)',
      name: 'pointsDesc',
      by: [{ field: 'points', direction: 'desc' }],
    },
    {
      title: 'Points (Lowest First)',
      name: 'pointsAsc',
      by: [{ field: 'points', direction: 'asc' }],
    },
  ],
});
