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
        lib: {
          entry: resolve(__dirname, 'api/api.ts'),
          name: 'NflApi',
          fileName: 'api',
          formats: ['es']
        },
        outDir: 'dist/api',
        emptyOutDir: true,
        rollupOptions: {
          external: [],
          output: {
            globals: {}
          }
        }
      },
      resolve: {
        alias: {
          $lib: resolve(__dirname, 'src/lib')
        }
      }
    };
  }

  // Default SvelteKit configuration
  return {
    plugins: [tailwindcss(), sveltekit(), devtoolsJson()]
  };
});
