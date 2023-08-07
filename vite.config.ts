import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import pwaIcons from "./public/pwa_icons.js";

const manifestPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  workbox: {
    globPatterns: ["**/*"],
  },
  includeAssets: ["**/*"],
  manifest: {
    name: "Malaysian Prayer Times",
    short_name: "SolatMY",
    description: "Prayer Times Checker in Malaysia",
    theme_color: "#FFF",
    background_color: "#FFF",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: pwaIcons,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), VitePWA(manifestPlugin)],
});
