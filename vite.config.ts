import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

// {
//   src: "windows11/SmallTile.scale-100.png",
//   sizes: "71x71",
//   purpose: "any maskable",
// },
// {
//   src: "windows11/SmallTile.scale-125.png",
//   sizes: "89x89",
//   purpose: "any maskable",
// },

const pwaIcons = [
  {
  src: "icons/16.png",
  sizes: "16x16",
  purpose: "any maskable",
},
{
  src: "icons/32.png",
  sizes: "32x32",
  purpose: "any maskable",
},
{
  src: "icons/64.png",
  sizes: "64x64",
  purpose: "any maskable",
},
{
  src: "icons/128.png",
  sizes: "128x128",
  purpose: "any maskable",
},
{
  src: "icons/256.png",
  sizes: "256x256",
  purpose: "any maskable",
},
{
  src: "icons/512.png",
  sizes: "512x512",
  purpose: "any maskable",
},

];

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
