import { Element, Root } from 'hast'
import { imageSize } from 'image-size'
import assert from 'node:assert'
import { join } from 'node:path'
import { visit } from 'unist-util-visit'

/**
 * @example
 * {
 *   type: 'element',
 *   tagName: 'img',
 *   properties: { src: '/static/cute-cat-200703.jpg', alt: 'some image' },
 *   children: [],
 *   position: {
 *     start: { line: 55, column: 1, offset: 2544 },
 *     end: { line: 55, column: 30, offset: 2573 }
 *   }
 * }
 */
function createImageSizeTransformer(assetsDir: string, urlBase: string) {
  return function (tree: Root) {
    visit(tree, ['element'], (n) => {
      const node = n as Element

      const {
        tagName,
        properties: { src },
      } = node

      if (
        tagName !== 'img' ||
        typeof src !== 'string' ||
        !src.startsWith('/static/')
      ) {
        return
      }

      const imgFilePath = join(assetsDir, src.replace(urlBase, ''))

      /**
       * @example { height: 2657, width: 1771, type: 'jpg' }
       */
      const size = imageSize(imgFilePath)

      if (!size) {
        return
      }

      if (size.height) {
        node.properties = {
          ...node.properties,
          height: String(size.height),
        }
      }

      if (size.width) {
        node.properties = {
          ...node.properties,
          width: String(size.width),
        }
      }

      if (size.type) {
        node.properties = {
          ...node.properties,
          'data-type': size.type,
        }
      }
    })
  }
}

export type RehypeImgSizeOptions = {
  assets: string
  base: string
}

export default function rehypeImgSize(options: RehypeImgSizeOptions) {
  assert(options.assets, 'Must provide assets path')
  assert(options.base, 'Must provide base url')
  return createImageSizeTransformer(options.assets, options.base)
}
