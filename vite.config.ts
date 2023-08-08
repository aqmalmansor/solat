import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaIcons = [
  {
    src: "windows11/SmallTile.scale-100.png",
    sizes: "71x71",
    purpose: "any maskable",
  },
  {
    src: "windows11/SmallTile.scale-125.png",
    sizes: "89x89",
    purpose: "any maskable",
  },
  {
    src: "windows11/SmallTile.scale-150.png",
    sizes: "107x107",
    purpose: "any maskable",
  },
  {
    src: "windows11/SmallTile.scale-200.png",
    sizes: "142x142",
    purpose: "any maskable",
  },
  {
    src: "windows11/SmallTile.scale-400.png",
    sizes: "284x284",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square150x150Logo.scale-100.png",
    sizes: "150x150",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square150x150Logo.scale-125.png",
    sizes: "188x188",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square150x150Logo.scale-150.png",
    sizes: "225x225",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square150x150Logo.scale-200.png",
    sizes: "300x300",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square150x150Logo.scale-400.png",
    sizes: "600x600",
    purpose: "any maskable",
  },
  {
    src: "windows11/Wide310x150Logo.scale-100.png",
    sizes: "310x150",
    purpose: "any maskable",
  },
  {
    src: "windows11/Wide310x150Logo.scale-125.png",
    sizes: "388x188",
    purpose: "any maskable",
  },
  {
    src: "windows11/Wide310x150Logo.scale-150.png",
    sizes: "465x225",
    purpose: "any maskable",
  },
  {
    src: "windows11/Wide310x150Logo.scale-200.png",
    sizes: "620x300",
    purpose: "any maskable",
  },
  {
    src: "windows11/Wide310x150Logo.scale-400.png",
    sizes: "1240x600",
    purpose: "any maskable",
  },
  {
    src: "windows11/LargeTile.scale-100.png",
    sizes: "310x310",
    purpose: "any maskable",
  },
  {
    src: "windows11/LargeTile.scale-125.png",
    sizes: "388x388",
    purpose: "any maskable",
  },
  {
    src: "windows11/LargeTile.scale-150.png",
    sizes: "465x465",
    purpose: "any maskable",
  },
  {
    src: "windows11/LargeTile.scale-200.png",
    sizes: "620x620",
    purpose: "any maskable",
  },
  {
    src: "windows11/LargeTile.scale-400.png",
    sizes: "1240x1240",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.scale-100.png",
    sizes: "44x44",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.scale-125.png",
    sizes: "55x55",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.scale-150.png",
    sizes: "66x66",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.scale-200.png",
    sizes: "88x88",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.scale-400.png",
    sizes: "176x176",
    purpose: "any maskable",
  },
  {
    src: "windows11/StoreLogo.scale-100.png",
    sizes: "50x50",
    purpose: "any maskable",
  },
  {
    src: "windows11/StoreLogo.scale-125.png",
    sizes: "63x63",
    purpose: "any maskable",
  },
  {
    src: "windows11/StoreLogo.scale-150.png",
    sizes: "75x75",
    purpose: "any maskable",
  },
  {
    src: "windows11/StoreLogo.scale-200.png",
    sizes: "100x100",
    purpose: "any maskable",
  },
  {
    src: "windows11/StoreLogo.scale-400.png",
    sizes: "200x200",
    purpose: "any maskable",
  },
  {
    src: "windows11/SplashScreen.scale-100.png",
    sizes: "620x300",
    purpose: "any maskable",
  },
  {
    src: "windows11/SplashScreen.scale-125.png",
    sizes: "775x375",
    purpose: "any maskable",
  },
  {
    src: "windows11/SplashScreen.scale-150.png",
    sizes: "930x450",
    purpose: "any maskable",
  },
  {
    src: "windows11/SplashScreen.scale-200.png",
    sizes: "1240x600",
    purpose: "any maskable",
  },
  {
    src: "windows11/SplashScreen.scale-400.png",
    sizes: "2480x1200",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-16.png",
    sizes: "16x16",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-20.png",
    sizes: "20x20",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-24.png",
    sizes: "24x24",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-30.png",
    sizes: "30x30",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-32.png",
    sizes: "32x32",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-36.png",
    sizes: "36x36",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-40.png",
    sizes: "40x40",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-44.png",
    sizes: "44x44",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-48.png",
    sizes: "48x48",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-60.png",
    sizes: "60x60",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-64.png",
    sizes: "64x64",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-72.png",
    sizes: "72x72",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-80.png",
    sizes: "80x80",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-96.png",
    sizes: "96x96",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.targetsize-256.png",
    sizes: "256x256",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
    sizes: "16x16",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
    sizes: "20x20",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
    sizes: "24x24",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
    sizes: "30x30",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
    sizes: "32x32",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
    sizes: "36x36",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
    sizes: "40x40",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
    sizes: "44x44",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
    sizes: "48x48",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
    sizes: "60x60",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
    sizes: "64x64",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
    sizes: "72x72",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
    sizes: "80x80",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
    sizes: "96x96",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
    sizes: "256x256",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
    sizes: "16x16",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
    sizes: "20x20",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
    sizes: "24x24",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
    sizes: "30x30",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
    sizes: "32x32",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
    sizes: "36x36",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
    sizes: "40x40",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
    sizes: "44x44",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
    sizes: "48x48",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
    sizes: "60x60",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
    sizes: "64x64",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
    sizes: "72x72",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
    sizes: "80x80",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
    sizes: "96x96",
    purpose: "any maskable",
  },
  {
    src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
    sizes: "256x256",
    purpose: "any maskable",
  },
  {
    src: "android/android-launchericon-512-512.png",
    sizes: "512x512",
    purpose: "any maskable",
  },
  {
    src: "android/android-launchericon-192-192.png",
    sizes: "192x192",
    purpose: "any maskable",
  },
  {
    src: "android/android-launchericon-144-144.png",
    sizes: "144x144",
    purpose: "any maskable",
  },
  {
    src: "android/android-launchericon-96-96.png",
    sizes: "96x96",
    purpose: "any maskable",
  },
  {
    src: "android/android-launchericon-72-72.png",
    sizes: "72x72",
    purpose: "any maskable",
  },
  {
    src: "android/android-launchericon-48-48.png",
    sizes: "48x48",
    purpose: "any maskable",
  },
  {
    src: "ios/16.png",
    sizes: "16x16",
    purpose: "any maskable",
  },
  {
    src: "ios/20.png",
    sizes: "20x20",
    purpose: "any maskable",
  },
  {
    src: "ios/29.png",
    sizes: "29x29",
    purpose: "any maskable",
  },
  {
    src: "ios/32.png",
    sizes: "32x32",
    purpose: "any maskable",
  },
  {
    src: "ios/40.png",
    sizes: "40x40",
    purpose: "any maskable",
  },
  {
    src: "ios/50.png",
    sizes: "50x50",
    purpose: "any maskable",
  },
  {
    src: "ios/57.png",
    sizes: "57x57",
    purpose: "any maskable",
  },
  {
    src: "ios/58.png",
    sizes: "58x58",
    purpose: "any maskable",
  },
  {
    src: "ios/60.png",
    sizes: "60x60",
    purpose: "any maskable",
  },
  {
    src: "ios/64.png",
    sizes: "64x64",
    purpose: "any maskable",
  },
  {
    src: "ios/72.png",
    sizes: "72x72",
    purpose: "any maskable",
  },
  {
    src: "ios/76.png",
    sizes: "76x76",
    purpose: "any maskable",
  },
  {
    src: "ios/80.png",
    sizes: "80x80",
    purpose: "any maskable",
  },
  {
    src: "ios/87.png",
    sizes: "87x87",
    purpose: "any maskable",
  },
  {
    src: "ios/100.png",
    sizes: "100x100",
    purpose: "any maskable",
  },
  {
    src: "ios/120.png",
    sizes: "120x120",
    purpose: "any maskable",
  },
  {
    src: "ios/128.png",
    sizes: "128x128",
    purpose: "any maskable",
  },
  {
    src: "ios/152.png",
    sizes: "152x152",
    purpose: "any maskable",
  },
  {
    src: "ios/167.png",
    sizes: "167x167",
    purpose: "any maskable",
  },
  {
    src: "ios/180.png",
    sizes: "180x180",
    purpose: "any maskable",
  },
  {
    src: "ios/192.png",
    sizes: "192x192",
    purpose: "any maskable",
  },
  {
    src: "ios/256.png",
    sizes: "256x256",
    purpose: "any maskable",
  },
  {
    src: "ios/512.png",
    sizes: "512x512",
    purpose: "any maskable",
  },
  {
    src: "ios/1024.png",
    sizes: "1024x1024",
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
