import type { Preview } from '@storybook/react'
import '../app/globals.css'; // replace with the name of your tailwind css file

import { withThemeByDataAttribute } from "@storybook/addon-themes";

import { withThemeByClassName } from "@storybook/addon-themes";
import WebFont from 'webfontloader'; // Importa WebFontLoader

WebFont.load({
  google: {
    families: ['Geist:400,500,700']
    // Puedes agregar más fuentes según necesites
  },
  // También puedes configurar eventos de carga (opcional)
  loading: () => {
    console.log('Cargando fuentes...');
  },
  active: () => {
    console.log('Fuentes activadas');
  },
  inactive: () => {
    console.log('Fuentes no pudieron ser cargadas');
  }
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },

  decorators: [withThemeByDataAttribute({
      themes: {
          light: '',
          dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme', 
  }), withThemeByClassName({
      themes: {
          // nameOfTheme: 'classNameForTheme',
          light: '',
          dark: 'dark',
      },
      defaultTheme: 'light',
  })]
};

export default preview;