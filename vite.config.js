import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During `npm run dev`, /api is proxied to the Express server on :4000.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
