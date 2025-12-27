import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() ],
  server: {
    https: {
      key: './localhost+1-key.pem',
      cert: './localhost+1.pem'
    },
    host: '127.0.0.1',
    port:5174
  }
})
