import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const getAddonPath = (value: string): string => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  stories: [
    "../../../src/@(components|elements)/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    getAddonPath("@storybook/addon-links"),
    getAddonPath("@storybook/addon-essentials"),
    getAddonPath("@storybook/addon-interactions"),
    // getAddonPath("@storybook/addon-designs"),
    // getAddonPath("storybook-addon-react-router-v6"),
  ],
  framework: {
    name: getAddonPath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    // Overrides the default Typescript configuration to allow multi-package components to be documented via Autodocs.
    reactDocgen: "react-docgen",
    check: false,
  },
};
export default config;
