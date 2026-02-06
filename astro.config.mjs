// @ts-check
import { defineConfig } from 'astro/config';

import cleanAstro from '@leomart/clean-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [cleanAstro()],
});
