import react from "@vitejs/plugin-react-swc";
import { loadEnv, type UserConfig, defineConfig, type ConfigEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { name, version } from "./package.json";
import path from "path";

export default function Config({ mode }: ConfigEnv): UserConfig {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    root: path.join(process.cwd(), "apps/web"),
    publicDir: path.join(process.cwd(), "public"),
    build: {
      outDir: path.join(process.cwd(), "dist"),
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
        "@": path.join(process.cwd(), "src"),
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
