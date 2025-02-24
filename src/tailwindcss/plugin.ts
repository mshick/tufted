import createPlugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/plugin';
import { PLUGIN_NAME } from './constants.js';

type PluginWithOptions<T> = ReturnType<typeof createPlugin.withOptions<T>>;
type Components = Parameters<PluginAPI['addComponents']>[0];

const styles: Components = {
  DEFAULT: {
    css: [
      {
        hr: {
          height: '1px',
          overflow: 'hidden',
          border: 'none',
          lineHeight: '0',
        },
        'hr::after': {
          content:
            '--------------------------------------------------------------------------------------------------',
        },
      },
    ],
  },
};

export const plugin: PluginWithOptions<{ className?: string }> =
  createPlugin.withOptions<{ className?: string }>(
    ({ className = PLUGIN_NAME } = {}) => {
      return ({ addComponents, theme }) => {
        const modifiers = theme(PLUGIN_NAME) as Components;
        addComponents(
          Object.entries(modifiers).map(([modifier, mod]) => ({
            [modifier === 'DEFAULT'
              ? `.${className}`
              : `.${className}-${modifier}`]: mod,
          })),
        );
      };
    },
    () => {
      return {
        theme: {
          [PLUGIN_NAME]: styles,
        },
      };
    },
  );
