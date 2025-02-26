import type { PluginAPI } from 'tailwindcss/plugin';
import type createPlugin from 'tailwindcss/plugin';

export type PluginWithOptions<T> = ReturnType<
  typeof createPlugin.withOptions<T>
>;
export type Components = Parameters<PluginAPI['addComponents']>[0];
