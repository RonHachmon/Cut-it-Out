import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(), // Include any other plugins you need
  ],
  server: {
    // Enable polling
    watch: {
      usePolling: true,
      interval: 1000, // Optional: polling interval in milliseconds
    },
  },
});
