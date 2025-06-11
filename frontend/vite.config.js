import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables with prefix VITE_ (e.g., VITE_API_BASE_URL)
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],

    server: {
      host: '0.0.0.0', // allow Docker or external devices to connect
      port: 5173,
      origin: 'http://lexusshop.local:5173', // pretend this is production
      proxy: mode === 'development' ? {
        '/api': {
          target: env.VITE_API_BASE_URL, // should be 'http://localhost:3000'
          changeOrigin: true,
          secure: false,
        },
      } : undefined,
    }
  };
});
