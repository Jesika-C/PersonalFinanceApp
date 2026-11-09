import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // register plugin here
  ],
   server: {
    proxy: {
      // Redirects all /record request to the dev server
      '/login': 'http://localhost:5050',
    },
  },
})
 

