import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     events: 'events/browser',
  //     util: 'util/',
  //   },
  // },
  server: {
    host: '0.0.0.0',
    port: 5173
  }

})
