import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // ⬅️ root langsung ke folder client
  base: "/", // ⬅️ biar path resource benar di Railway
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "..", "public"), // ⬅️ hasil build ke root/public biar Express bisa serve
    emptyOutDir: true,
  },
});
