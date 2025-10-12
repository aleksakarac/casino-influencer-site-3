import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { schemas } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Aca Jankovic Influencer',

  projectId: '1s30e0de',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), colorInput()],

  schema: {
    types: schemas,
  },

  basePath: '/studio',

  vite: {
    css: {
      postcss: null,
    },
  },
});
