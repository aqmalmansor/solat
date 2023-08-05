import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  workbox: {
    globPatterns: ["**/*"],
  },
  includeAssets: ["**/*"],
  manifest: {
    name: "Malaysian Prayer Times",
    short_name: "Malaysian Prayer Times",
    description: "Prayer Times Checker in Malaysia",
    theme_color: "#111111",
    background_color: "#111111",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        size: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        size: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        size: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        size: "512x512",
        type: "image/png",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), VitePWA(manifestPlugin)],
});
