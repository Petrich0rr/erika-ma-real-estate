import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      // Static hosting: the analytics tracker POSTs to /api/app-logs/...
      // on every page view. Cloudflare Pages has no backend for that
      // path, so turn it off instead of firing a failed request per view.
      analyticsTracker: false,
      visualEditAgent: true
    }),
    react(),
  ]
});
