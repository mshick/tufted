import colors from 'tailwindcss/colors';
import createPlugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/plugin';
import { PLUGIN_NAME } from './constants.js';

type PluginWithOptions<T> = ReturnType<typeof createPlugin.withOptions<T>>;
type Components = Parameters<PluginAPI['addComponents']>[0];

const styles: Components = {
  neutral: {
    css: {
      '--tw-prose-selection': colors.neutral[700],
      '--tw-prose-selection-bg': colors.neutral[200],
      '--tw-prose-invert-selection': colors.neutral[200],
      '--tw-prose-invert-selection-bg': colors.neutral[700],
      '--tw-prose-tr-even': colors.neutral[50],
      '--tw-prose-invert-tr-even': colors.neutral[900],
      '--tw-prose-borders': colors.neutral[300],
      '--tw-prose-invert-borders': colors.neutral[700],
      '--tw-prose-links-hover-bg': colors.blue[700],
      '--tw-prose-links-hover': colors.white,
      '--tw-prose-invert-links-hover-bg': colors.blue[700],
      '--tw-prose-invert-links-hover': colors.white,
    },
  },
  zinc: {
    css: {
      '--tw-prose-selection': colors.zinc[700],
      '--tw-prose-selection-bg': colors.zinc[200],
      '--tw-prose-invert-selection': colors.zinc[200],
      '--tw-prose-invert-selection-bg': colors.zinc[700],
      '--tw-prose-tr-even': colors.zinc[50],
      '--tw-prose-invert-tr-even': colors.zinc[900],
      '--tw-prose-borders': colors.zinc[300],
      '--tw-prose-invert-borders': colors.zinc[700],
      '--tw-prose-links-hover-bg': colors.blue[700],
      '--tw-prose-links-hover': colors.white,
      '--tw-prose-invert-links-hover-bg': colors.blue[700],
      '--tw-prose-invert-links-hover': colors.white,
    },
  },
  slate: {
    css: {
      '--tw-prose-selection': colors.slate[700],
      '--tw-prose-selection-bg': colors.slate[200],
      '--tw-prose-invert-selection': colors.slate[200],
      '--tw-prose-invert-selection-bg': colors.slate[700],
      '--tw-prose-tr-even': colors.slate[50],
      '--tw-prose-invert-tr-even': colors.slate[900],
      '--tw-prose-borders': colors.slate[300],
      '--tw-prose-invert-borders': colors.slate[700],
      '--tw-prose-links-hover-bg': colors.blue[700],
      '--tw-prose-links-hover': colors.white,
      '--tw-prose-invert-links-hover-bg': colors.blue[700],
      '--tw-prose-invert-links-hover': colors.white,
    },
  },
  gray: {
    css: {
      '--tw-prose-selection': colors.gray[700],
      '--tw-prose-selection-bg': colors.gray[200],
      '--tw-prose-invert-selection': colors.gray[200],
      '--tw-prose-invert-selection-bg': colors.gray[700],
      '--tw-prose-tr-even': colors.gray[50],
      '--tw-prose-invert-tr-even': colors.gray[900],
      '--tw-prose-borders': colors.gray[300],
      '--tw-prose-invert-borders': colors.gray[700],
      '--tw-prose-links-hover-bg': colors.blue[700],
      '--tw-prose-links-hover': colors.white,
      '--tw-prose-invert-links-hover-bg': colors.blue[700],
      '--tw-prose-invert-links-hover': colors.white,
    },
  },
  stone: {
    css: {
      '--tw-prose-selection': colors.stone[700],
      '--tw-prose-selection-bg': colors.stone[200],
      '--tw-prose-invert-selection': colors.stone[200],
      '--tw-prose-invert-selection-bg': colors.stone[700],
      '--tw-prose-tr-even': colors.stone[50],
      '--tw-prose-invert-tr-even': colors.stone[900],
      '--tw-prose-borders': colors.stone[300],
      '--tw-prose-invert-borders': colors.stone[700],
      '--tw-prose-links-hover-bg': colors.blue[700],
      '--tw-prose-links-hover': colors.white,
      '--tw-prose-invert-links-hover-bg': colors.blue[700],
      '--tw-prose-invert-links-hover': colors.white,
    },
  },
  invert: {
    css: {
      '--tw-prose-borders': 'var(--tw-prose-invert-borders)',
      '--tw-prose-tr-even': 'var(--tw-prose-invert-tr-even)',
      '--tw-prose-selection': 'var(--tw-prose-invert-selection)',
      '--tw-prose-selection-bg': 'var(--tw-prose-invert-selection-bg)',
      '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
      '--tw-prose-links-hover-bg': 'var(--tw-prose-invert-links-hover-bg)',
    },
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
