import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo at /korrente/, not /. Without this,
  // every built asset (JS/CSS/favicon) resolves against the domain root
  // and 404s. Custom-domain deploys can override with `vite build --base=/`.
  base: '/korrente/',
  server: {
    port: 5173,
    open: true
  }
})
