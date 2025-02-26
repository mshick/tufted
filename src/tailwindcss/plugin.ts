import createPlugin from 'tailwindcss/plugin';
import { PLUGIN_NAME } from './constants.js';
import type { Components, PluginWithOptions } from './types.js';

const styles: Components = {};

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
