import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //TODO activarlo cunado queramos https
  /* server: {
    https: {
      key: fs.readFileSync('./certs/private-key.pem'),
      cert: fs.readFileSync('./certs/certificate.pem'),
    },
    port: 5173,
  }, */
})
