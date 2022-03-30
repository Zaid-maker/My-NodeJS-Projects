import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsInlineLimit: "2048",
    chunkSizeWarningLimit: ''
  },
});
