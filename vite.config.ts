import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // If this app is deployed to the root domain (e.g. https://spaceleadss.vercel.app),
  // use root base path to avoid 404s on generated assets.
  // Keep `/spaceleads/` only if you deploy under that subpath.
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
