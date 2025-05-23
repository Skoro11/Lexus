import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { path } from 'path';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), 'VITE_');

export default defineConfig(({ mode }) => {
  // Load env variables for current mode (development, production, etc)


  return {
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: env.VITE_BASE_PROXY, // Use the environment variable
                changeOrigin: true,
                secure: false,
            },
        },
    },
  }
})
