import type { Content, Parent } from 'mdast'
import type { Transformer } from 'unified'
import { u } from 'unist-builder'
import { visitParents } from 'unist-util-visit-parents'
import { isHeadingNode, isMdxjsEsmNode, isRootNode, isYamlNode } from './type-utils.js'

export default function remarkInitialHeading(): Transformer<Parent> {
  return (tree) => {
    let foundHeading = false
    visitParents(
      tree,
      (node, _, parent) => {
        if (
          !foundHeading &&
          isRootNode(parent) &&
          !isMdxjsEsmNode(node) &&
          !isYamlNode(node) &&
          !isHeadingNode(node)
        ) {
          // First real element
          foundHeading = true
          return true
        }

        if (isHeadingNode(node)) {
          foundHeading = true
        }

        return false
      },
      (node, ancestors) => {
        const start = node as Content
        const parent = ancestors[ancestors.length - 1]

        if (!parent) {
          return
        }

        const startIndex = parent.children.indexOf(start)

        const heading = u(
          'heading',
          {
            depth: 2 as const,
            data: {
              hProperties: {
                className: 'hidden',
              },
            },
          },
          [u('text', 'Introduction')],
        )

        parent.children.splice(startIndex, 0, heading)
      },
    )
  }
}
