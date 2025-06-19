import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Required for path.resolve

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js')
  }
})
