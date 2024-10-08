import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'], // Include .glb files as assets
  resolve: {
    alias: {
      // Add this alias if necessary
      '@': '/src',
    },
  },
})
