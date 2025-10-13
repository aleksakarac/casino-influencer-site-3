import { defineType, defineField } from 'sanity';
import { WatchTimeInput } from '../components/WatchTimeInput';

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
      validation: (Rule) => Rule.required().custom((value) => {
        if (!value) return 'Watch time is required';

        // Check short format: "X:Y:Z"
        const shortFormat = /^\d+:\d+:\d+$/.test(value);
        // Check long format: "X Days, Y Hours, Z Minutes"
        const longFormat = /^\d+\s*Days?,\s*\d+\s*Hours?,\s*\d+\s*Minutes?$/i.test(value);

        if (!shortFormat && !longFormat) {
          return 'Invalid format. Use "3:5:40" or "3 Days, 5 Hours, 40 Minutes"';
        }

        return true;
      }),
      description: 'Formatted watch time display. Short: "3:5:40" or Long: "3 Days, 5 Hours, 40 Minutes"',
      placeholder: '3:5:40 or 3 Days, 5 Hours, 40 Minutes',
      components: {
        input: WatchTimeInput,
      },
    }),
    defineField({
      name: 'watchTimeHours',
      title: 'Watch Time (Hours) - Auto-calculated',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Total watch time in hours (automatically calculated from display field)',
      readOnly: true,
      hidden: false,
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
