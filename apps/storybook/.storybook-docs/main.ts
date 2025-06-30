import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const getAddonPath = (value: string): string => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  stories: ["../../../src/@(components|elements)/**/*.mdx"],
  addons: [
    // getAddonPath("@storybook/addon-links"),
    // getAddonPath("@storybook/addon-essentials"),
    // getAddonPath("@storybook/addon-interactions"),
    getAddonPath("@storybook/addon-docs"),
  ],
  framework: {
    name: getAddonPath("@storybook/react-vite"),
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen",
    check: false,
  },
  staticDirs: ["../../../public"],
};

export default config;
