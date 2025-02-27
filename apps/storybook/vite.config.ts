import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const pathFromRoot = (...args: string[]) =>
  path.join(process.cwd(), "../..", ...args);

export default defineConfig({
  plugins: [react()],
  publicDir: pathFromRoot("public"),
  resolve: {
    alias: {
      "@": path.join(process.cwd(), "../..", "src"),
    },
  },
});
