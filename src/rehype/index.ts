import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import type { ElementContent } from 'hast';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import rehypeAutolinkHeadings, {
  type Options as RehypeAutolinkHeadingsOptions,
} from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import type { Preset, Settings } from 'unified';

export type PresetSettings = {
  settings?: Settings;
  plugins?: {
    rehypeShiki?: RehypeShikiOptions;
    rehypeAutolinkHeadings?: RehypeAutolinkHeadingsOptions;
  };
};

function main({ settings, plugins }: PresetSettings = {}): Preset {
  return {
    settings,
    plugins: [
      rehypeSlug,
      [
        rehypeShiki,
        {
          themes: {
            light: 'one-light',
            dark: 'one-dark-pro',
          },
          ...plugins?.rehypeShiki,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: fromHtmlIsomorphic('#', {
            fragment: true,
          }).children as ElementContent[],
          headingProperties: {
            className: ['group'],
          },
          properties: {
            className: [
              'heading-link',
              'hidden',
              'group-hover:inline-block',
              'ml-2',
            ],
          },
          ...plugins?.rehypeAutolinkHeadings,
        },
      ],
    ],
  };
}

export default main;
