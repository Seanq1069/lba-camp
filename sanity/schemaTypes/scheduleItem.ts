import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'scheduleItem',
  title: 'Daily Schedule',
  type: 'document',
  fields: [
    defineField({ name: 'time', title: 'Time', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'activity', title: 'Activity', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'activity', subtitle: 'time' },
  },
});
