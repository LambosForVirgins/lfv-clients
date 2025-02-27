import type { Preview } from "@storybook/react";
import "../../web/globals.css";

// import {
//   QueryDecorator,
//   StateDecorator,
//   ThemeDecorator,
//   TranslationDecorator,
// } from "../decorators";

// TODO: storybook story modes
const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Toggle theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "sun",
        items: [
          {
            value: "light",
            icon: "sun",
            title: "Light",
            right: "default",
          },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    locale: {
      name: "Toggle locale",
      description: "i18n locale",
      defaultValue: "cimode",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "cimode", title: "i18n Keys", right: "default" },
          { value: "en-AU", title: "English - AU" },
          { value: "en-NZ", title: "English - NZ" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    // StateDecorator,
    // ThemeDecorator,
    // TranslationDecorator,
    // QueryDecorator,
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      exclude: /testID/g,
    },
  },
};

export default preview;
