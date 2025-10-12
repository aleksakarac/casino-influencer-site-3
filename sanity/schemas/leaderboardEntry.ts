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
      validation: (Rule) => Rule.required().integer().min(1).max(10),
      description: 'Leaderboard placement (1-10)',
    }),
    defineField({
      name: 'viewerName',
      title: 'Viewer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'watchtime',
      title: 'Watch Time (Display)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "245 hours" or "320h 15m"',
    }),
    defineField({
      name: 'watchTimeHours',
      title: 'Watch Time (Hours)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Numeric value of total watch time in hours',
    }),
    defineField({
      name: 'avatarEmoji',
      title: 'Avatar Emoji',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Emoji to represent the viewer (e.g., 🎮, 🏆, ⚡)',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional viewer avatar image (emoji will be used if not provided)',
    }),
    defineField({
      name: 'daysWatched',
      title: 'Days Watched',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
      description: 'Number of days the viewer has watched',
    }),
    defineField({
      name: 'avgDaily',
      title: 'Average Daily Hours',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Average hours watched per day',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Legend', value: 'Legend' },
          { title: 'Diamond', value: 'Diamond' },
          { title: 'Platinum', value: 'Platinum' },
          { title: 'Gold', value: 'Gold' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'change',
      title: 'Rank Change',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Rank change indicator: "+2" for up 2 places, "-1" for down 1 place, "0" for no change',
      initialValue: '0',
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
      media: 'avatar',
    },
    prepare(selection) {
      const { title, subtitle, place } = selection;
      return {
        title: `#${place} - ${title}`,
        subtitle: subtitle,
        media: selection.media,
      };
    },
  },
  orderings: [
    {
      title: 'Place',
      name: 'placeAsc',
      by: [{ field: 'place', direction: 'asc' }],
    },
  ],
});
