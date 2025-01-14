import { defineWorkspace } from "vitest/config";
import path from "path";

export default defineWorkspace([
  {
    // add "extends" to merge two configs together
    // extends: './vite.config.js',
    test: {
      // include: ['tests/**/*.{browser}.test.{ts,js}'],
      // it is recommended to define a name when using inline configs
      // name: 'happy-dom',
      name: "client",
      // environment: 'happy-dom',
      environment: "node",
      // removes the need for `import { describe, test, ... } from 'vitest'`
      globals: true,
      setupFiles: "./setup.ts",
      // you might want to disable it, if you don't have tests that rely on CSS
      // since parsing CSS is slow
      css: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  },
]);
