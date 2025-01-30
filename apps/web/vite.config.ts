import react from "@vitejs/plugin-react-swc";
import { loadEnv, type UserConfig, defineConfig, type ConfigEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { name, version } from "./package.json";
import path from "path";

const pathFromRoot = (...args: string[]) =>
  path.join(process.cwd(), "../..", ...args);

export default function Config({ mode }: ConfigEnv): UserConfig {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("Config env", env);

  return defineConfig({
    root: process.cwd(),
    publicDir: pathFromRoot("public"),
    build: {
      outDir: pathFromRoot("dist"),
      sourcemap: true,
    },
    define: {
      pkgJson: { name, version },
    },
    css: {
      modules: {
        scopeBehaviour: "local",
      },
      preprocessorOptions: {
        less: {
          math: "always",
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": pathFromRoot("src"),
      },
    },
    plugins: [
      nodePolyfills({
        include: ["buffer", "process"],
        globals: {
          Buffer: true,
          process: "dev",
        },
      }),
      react(),
      sentryVitePlugin({
        org: "moonshot-llc",
        project: "lfv",
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        disable: env.VITE_SENTRY_ENV === "dev",
      }),
    ],
  });
}
