import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables for the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],

    // Only enable proxy in development mode
    server: mode === 'development' ? {
      proxy: {
        '/api': {
          target: env.VITE_BASE_PROXY, // your backend URL for dev (e.g., http://localhost:3000)
          changeOrigin: true,
          secure: false,
        },
      },
    } : undefined,

    // You can also expose env variables to your app code if needed here
    define: {
      __API_BASE_URL__: JSON.stringify(env.VITE_BASE_PROXY),
    },
  };
});
