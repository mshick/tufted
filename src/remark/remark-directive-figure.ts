import { h } from 'hastscript'
import type { BlockContent, Parent } from 'mdast'
import type { ContainerDirective } from 'mdast-util-directive'
import type { Transformer } from 'unified'
import { u } from 'unist-builder'
import { CONTINUE, visit } from 'unist-util-visit'
import { isCodeNode, isImageNode, isLeafDirectiveNode } from './type-utils.js'
import type { HastData } from './types'

type GroupedChildren = Record<number, BlockContent[]>

export default function remarkDirectiveFigure(): Transformer<Parent> {
  return (tree) => {
    visit(tree, { type: 'containerDirective', name: 'figure' }, (node: ContainerDirective) => {
      let currentGroupStart = 0

      const groupedCaptions = node.children.reduce<GroupedChildren>((g, n, i) => {
        if (!isCodeNode(n) && !isImageNode(n) && !isLeafDirectiveNode(n)) {
          return {
            ...g,
            [currentGroupStart]: [...(g[currentGroupStart] ?? []), n],
          }
        }

        currentGroupStart = i + 1
        return g
      }, {})

      if (Object.entries(groupedCaptions).length > 0) {
        for (const [startIndex, captionNodes] of Object.entries(groupedCaptions)) {
          const figcaption = u(
            'figcaption',
            {
              data: {
                hName: 'figcaption',
              },
            },
            captionNodes,
          )

          node.children.splice(Number(startIndex), figcaption.children.length, figcaption)
        }
      }

      const hast = h(node.name, node.attributes)

      const data: HastData = {
        hName: hast.tagName,
        hProperties: hast.properties,
      }

      node.data = {
        ...node.data,
        ...data,
      }

      return CONTINUE
    })
  }
}
