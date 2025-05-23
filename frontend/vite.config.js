import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config()

export default defineConfig({

  plugins: [react()],
  server: {
    proxy: {
      '/api': import.meta.env.VITE_BASE_PROXY
    }
  }
});