import { defineConfig } from "vite";
import { name, version } from "./package.json";
import react from "@vitejs/plugin-react";
import path from "path";

const pathFromRoot = (...args: string[]) =>
  path.join(process.cwd(), "../..", ...args);

export default defineConfig({
  define: {
    pkgJson: { name, version },
  },
  publicDir: "public",
  build: {
    outDir: pathFromRoot("dist"),
    sourcemap: true,
    rollupOptions: {
      input: "index.html",
    },
  },
  css: {
    modules: {
      scopeBehaviour: "local",
    },
  },
  resolve: {
    alias: {
      "@": pathFromRoot("src"),
    },
  },
  plugins: [react()],
});
