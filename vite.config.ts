import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
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
        src: "/public/vite.svg",
        size: " 192x192",
        type: "image/svg+xml",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), VitePWA(manifestPlugin)],
});
