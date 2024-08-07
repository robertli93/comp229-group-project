import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
const PORT = 5000
const PROD_URL = "https://comp229-groupproject-be.onrender.com"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: process.env.PORT || 4000,
    proxy: {
      '/api': {
        target: PROD_URL,
        changeOrigin: true,
      },
      '/auth': {
        target: PROD_URL,
        changeOrigin: true,
      },
      '/users': {
        target: PROD_URL,
        changeOrigin: true,
      },
    },
  },
})
