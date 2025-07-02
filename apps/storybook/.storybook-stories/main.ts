import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const getAddonPath = (value: string): string => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  stories: ["../../../src/@(components|elements)/**/*.stories.tsx"],
  addons: [
    // getAddonPath("@storybook/addon-links"),
    // getAddonPath("@storybook/addon-essentials"),
    // getAddonPath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAddonPath("@storybook/react-vite"),
    options: {},
  },
  typescript: {
    reactDocgen: false,
    check: false,
  },
  staticDirs: ["../../../public"],
};

export default config;
