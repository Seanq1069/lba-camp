'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { projectId, dataset } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  basePath: '/studio',
  title: 'Leesburg Baseball Academy',
  projectId: projectId || 'placeholder',
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
