import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
// @ts-expect-error No types
import rehypeFigure from '@microflash/rehype-figure'
import type { Preset } from 'unified'
import rehypeImgSize from './rehype-img-size.js'

export type PresetSettings = {
  imgSizeDir: string
}

function main({ imgSizeDir }: PresetSettings): Preset {
  return {
    plugins: [
      rehypeFigure,
      rehypeSlug,
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
      [rehypeImgSize, { dir: imgSizeDir }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  }
}

export default main
