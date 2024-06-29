import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
// @ts-expect-error No types
import rehypeFigure from '@microflash/rehype-figure'
import type { Preset } from 'unified'
import rehypeImgSize from './rehype-img-size.js'

export type PresetSettings = {
  assets: string
  base: string
}

function main({ assets, base }: PresetSettings): Preset {
  return {
    plugins: [
      rehypeFigure,
      rehypeSlug,
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
      [rehypeImgSize, { assets, base }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-link', 'hidden'],
          },
        },
      ],
    ],
  }
}

export default main
