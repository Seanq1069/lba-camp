import React from 'react';
import { defineField, defineType } from 'sanity';

const colorMark = (title: string, value: string, color: string) => ({
  title,
  value,
  icon: () => React.createElement('span', { style: { color, fontWeight: 700 } }, 'A'),
  component: (props: { children: React.ReactNode }) =>
    React.createElement('span', { style: { color } }, props.children),
});

export default defineType({
  name: 'campSettings',
  title: 'Camp Settings',
  type: 'document',
  fields: [
    defineField({ name: 'campName', title: 'Camp name', type: 'string' }),
    defineField({ name: 'presentedBy', title: 'Presented by', type: 'string' }),
    defineField({ name: 'headline', title: 'Hero headline', type: 'string' }),
    defineField({
      name: 'headlineRich',
      title: 'Hero headline (rich text)',
      description:
        'If filled in, this replaces the plain headline above. Select any word to make it bold, italic, or a different color.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              colorMark('Brick Red', 'brick', '#c94a5a'),
              colorMark('Gold', 'gold', '#e8c15a'),
              colorMark('Light Blue', 'lightblue', '#9db8e8'),
              colorMark('Navy', 'navy', '#25407a'),
              colorMark('Light Grey', 'lightgrey', '#c8ccd4'),
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({ name: 'subheadline', title: 'Hero subheadline', type: 'text', rows: 3 }),
    defineField({
      name: 'headlineColor',
      title: 'Hero headline color',
      type: 'string',
      options: {
        list: [
          { title: 'White (default)', value: '#ffffff' },
          { title: 'Brick Red', value: '#c94a5a' },
          { title: 'Gold', value: '#e8c15a' },
          { title: 'Cream', value: '#f7f5f0' },
          { title: 'Light Blue', value: '#9db8e8' },
          { title: 'Light Grey', value: '#c8ccd4' },
        ],
        layout: 'dropdown',
      },
      initialValue: '#ffffff',
    }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'lbaLogo', title: 'LBA logo', type: 'image' }),
    defineField({ name: 'qLogo', title: 'Q Athletics logo', type: 'image' }),
    defineField({
      name: 'experienceHeading',
      title: 'Experience section — heading',
      type: 'string',
    }),
    defineField({
      name: 'experienceIntro',
      title: 'Experience section — intro text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'experienceCards',
      title: 'Experience section — cards',
      description: 'The numbered cards (01, 02, 03…). Add, remove, or reorder freely.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Card title', type: 'string' },
            { name: 'text', title: 'Card text', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({ name: 'dates', title: 'Dates', type: 'string' }),
    defineField({ name: 'dailyHours', title: 'Daily hours', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'ages', title: 'Ages', type: 'string' }),
    defineField({ name: 'tuition', title: 'Tuition', type: 'string' }),
    defineField({ name: 'tuitionIncludes', title: 'Tuition includes', type: 'text', rows: 3 }),
    defineField({ name: 'maxEnrollment', title: 'Max enrollment', type: 'string' }),
    defineField({ name: 'bring', title: 'What to bring', type: 'string' }),
    defineField({ name: 'weatherPolicy', title: 'Weather policy', type: 'text', rows: 2 }),
    defineField({ name: 'refundPolicy', title: 'Refund policy', type: 'text', rows: 2 }),
    defineField({
      name: 'registrationStatus',
      title: 'Registration status',
      description: 'Set to Closed when camp is full — the registration form is replaced by the closed message below.',
      type: 'string',
      options: {
        list: [
          { title: '🟢 OPEN — accepting registrations', value: 'open' },
          { title: '🔴 CLOSED — camp is full', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'open',
    }),
    defineField({
      name: 'registrationClosedMessage',
      title: 'Registration closed message',
      type: 'text',
      rows: 2,
      description: 'Shown instead of the form when registration is closed.',
    }),
    defineField({ name: 'waiver', title: 'Waiver document (PDF)', type: 'file', options: { accept: '.pdf' } }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
    defineField({ name: 'motto', title: 'Footer motto', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Camp Settings' }) },
});
