import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Correct for a user/organization GitHub Pages site
  build: {
    outDir: 'dist', // Standard Vite output directory
  },
  resolve: {
    alias: {
      // This ensures that all imports for 'react' and 'react-dom' resolve to the same files
      // in your project's node_modules, fixing the resolution error.
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
});
