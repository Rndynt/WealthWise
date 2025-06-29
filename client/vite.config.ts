import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async ({ mode }) => {
  const isProd = mode === "production";
  const plugins = [react(), runtimeErrorOverlay()];

  if (!isProd && process.env.REPL_ID !== undefined) {
    const cartographer = await import("@replit/vite-plugin-cartographer").then((m) => m.cartographer());
    plugins.push(cartographer);
  }

  return {
    base: isProd && process.env.VERCEL !== "1" ? "/WealthWise/" : "/",
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "client", "dist"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
