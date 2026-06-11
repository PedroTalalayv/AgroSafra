import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Em dev, /api é repassado ao Spring Boot — evita configurar CORS no navegador
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
