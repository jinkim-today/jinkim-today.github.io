import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  root: "./client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "./client/index.html",
    },
  },
  base: "/blog/", // ✅ GitHub Pages requires this
  server: {
    port: 5000,
    host: true,
    allowedHosts: true,
  },
});
