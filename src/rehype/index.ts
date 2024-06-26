import rehypeShiki, { RehypeShikiOptions } from '@shikijs/rehype'
import rehypeAutolinkHeadings, {
  Options as RehypeAutolinkHeadingsOptions,
} from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
// @ts-expect-error No types
import rehypeFigure from '@microflash/rehype-figure'
import type { Preset } from 'unified'
import rehypeImgSize from './rehype-img-size.js'

export type PresetSettings = {
  assets: string
  base: string
  plugins?: {
    rehypeShiki?: RehypeShikiOptions
    rehypeAutolinkHeadings?: RehypeAutolinkHeadingsOptions
  }
}

function main({ assets, base, plugins }: PresetSettings): Preset {
  return {
    plugins: [
      rehypeFigure,
      rehypeSlug,
      // rehypeCodeTitles,
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
      // [rehypePrism, { ignoreMissing: true }],
      [rehypeImgSize, { assets, base }],
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
