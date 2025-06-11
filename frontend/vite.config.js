import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables for the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
      base: '/',
    // Only enable proxy in development mode
    server: mode === 'development' ? {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    } : undefined,


  };
});
