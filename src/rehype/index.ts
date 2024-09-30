// @ts-expect-error No types
import rehypeFigure from '@microflash/rehype-figure'
import rehypeShiki, { RehypeShikiOptions } from '@shikijs/rehype'
import rehypeAutolinkHeadings, {
  Options as RehypeAutolinkHeadingsOptions,
} from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import type { Preset, Settings } from 'unified'

export type PresetSettings = {
  settings?: Settings
  plugins?: {
    rehypeShiki?: RehypeShikiOptions
    rehypeAutolinkHeadings?: RehypeAutolinkHeadingsOptions
  }
}

function main({ settings, plugins }: PresetSettings = {}): Preset {
  return {
    settings,
    plugins: [
      rehypeFigure,
      rehypeSlug,
      [
        rehypeShiki,
        {
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
          ...plugins?.rehypeShiki,
        },
      ],
      // [rehypeImgSize, { assets, base }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-link', 'hidden'],
          },
          ...plugins?.rehypeAutolinkHeadings,
        },
      ],
    ],
  }
}

export default main
