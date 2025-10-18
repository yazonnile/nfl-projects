import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  // API build configuration
  if (mode === 'api') {
    return {
      build: {
        outDir: 'dist/api',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            api: resolve(__dirname, 'api/api.ts'),
            json: resolve(__dirname, 'api/json.ts')
          },
          external: ['fs', 'path'],
          output: {
            entryFileNames: '[name].js',
            format: 'es',
            globals: {}
          }
        }
      }
    };
  }

  // Default SvelteKit configuration
  return {
    plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
  };
});
