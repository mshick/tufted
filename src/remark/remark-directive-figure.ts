import { h } from 'hastscript'
import type { BlockContent, Parent } from 'mdast'
import type { Transformer } from 'unified'
import { u } from 'unist-builder'
import { SKIP, visit } from 'unist-util-visit'
import {
  isCodeNode,
  isContainerDirectiveNode,
  isIframeNode,
  isImageNode,
  isLeafDirectiveNode,
  isParentNode,
} from './type-utils.js'
import type { HastData } from './types'
import { contentTypePresenceReducer } from './utils.js'

type GroupedChildren = Record<number, Array<BlockContent>>

export default function remarkDirectiveFigure(): Transformer<Parent> {
  return (tree) => {
    visit(
      tree,
      (node) => isContainerDirectiveNode(node) && node.name === 'figure',
      (node, index, parent) => {
        if (!isContainerDirectiveNode(node) || !isParentNode(parent)) {
          return [SKIP, index]
        }

        let currentGroupStart = 0

        const contentTypesPresent = node.children.reduce(contentTypePresenceReducer, {})

        const groupedCaptions = node.children.reduce<GroupedChildren>((g, n, i) => {
          if (!isCodeNode(n) && !isImageNode(n) && !isLeafDirectiveNode(n) && !isIframeNode(n)) {
            return {
              ...g,
              [currentGroupStart]: [...(g[currentGroupStart] ?? []), n],
            }
          }

          currentGroupStart = i + 1
          return g
        }, {})

        const figureChildren = [...node.children]

        if (Object.entries(groupedCaptions).length > 0) {
          for (const [startIndex, captionNodes] of Object.entries(groupedCaptions)) {
            const figcaption = u(
              'figcaption',
              {
                data: {
                  hName: 'figcaption' as const,
                },
              },
              captionNodes,
            )

            figureChildren.splice(Number(startIndex), figcaption.children.length, figcaption)
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

        const figure = u(
          'figure',
          {
            data: {
              hName: 'figure' as const,
              hProperties: {
                ...hast.properties,
                className: Object.keys(contentTypesPresent),
              },
            },
          },
          figureChildren,
        )

        parent.children.splice(index ?? 0, 1, figure)

        return [SKIP, index]
      },
    )
  }
}
