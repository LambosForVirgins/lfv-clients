import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

console.log(path.join(process.cwd(), "src"));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.join(process.cwd(), "../..", "src"),
    },
  },
});
