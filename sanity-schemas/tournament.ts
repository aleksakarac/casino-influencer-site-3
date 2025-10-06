export default {
  name: 'tournament',
  title: 'Tournament',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tournament Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sr', title: 'Serbian', type: 'string' }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'sr', title: 'Serbian', type: 'text' }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Tournament Banner (16:9 ratio)',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'prizePool',
      title: 'Prize Pool (e.g., "$50,000 Prize Pool")',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'stats',
      title: 'Tournament Stats',
      type: 'object',
      fields: [
        {
          name: 'players',
          title: 'Current Players',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0)
        },
        {
          name: 'buyIn',
          title: 'Buy-In (e.g., "$10" or "Free")',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'winnerPrize',
          title: 'Winner Prize (e.g., "$10,000")',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'tableType',
          title: 'Table Type',
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'sr', title: 'Serbian', type: 'string' }
          ],
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'endDate',
      title: 'Tournament End Date/Time',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'joinLink',
      title: 'Join Tournament Link (External URL)',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'isActive',
      title: 'Active (Show on website)',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'prizePool',
      media: 'image'
    }
  }
}
