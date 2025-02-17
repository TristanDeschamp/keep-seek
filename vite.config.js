import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: "/keep-seek",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      manifest: {
        name: "KeepPeek",
        description: "KeepPeek",
        start_url: "https://tristandeschamp.github.io/keep-seek/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#3B82F6",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 86400
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
        ],
      },
    })
  ],
})
