import { defineConfig } from "vitest/config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: ".env",
});

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["./src/**/*.test.(ts|tsx)"],
    coverage: {
      include: ["src"],
      exclude: ["**/index.ts"],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      skipFull: true,
    },
  },
});
