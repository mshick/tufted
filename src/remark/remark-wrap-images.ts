import type { Parent } from 'mdast'
import type { Transformer } from 'unified'
import { u } from 'unist-builder'
import { visit } from 'unist-util-visit'
import { isContainerDirectiveNode, isParagraphNode, isParentNode } from './type-utils'

export default function remmarkWrapImages(): Transformer<Parent> {
  return (tree) => {
    visit(tree, 'image', (node, index, parent) => {
      // Don't get images in an explicit figure container or that are inline
      if (isParentNode(parent) && !isContainerDirectiveNode(parent) && !isParagraphNode(parent)) {
        const figure = u(
          'figure',
          {
            data: {
              hName: 'figure' as const,
            },
          },
          [node],
        )

        parent.children.splice(index ?? 0, 1, figure)

        return
      }

      return
    })
  }
}
