import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset URLs relative so the site works on GitHub Pages
// (project subpath) and locally alike; routing uses hash URLs.
export default defineConfig({
  plugins: [react()],
  base: './',
})
