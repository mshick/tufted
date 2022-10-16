import type { Content, Parent } from 'mdast'
import type { Transformer } from 'unified'
import type { Node } from 'unist'
import { u } from 'unist-builder'
import { findAfter } from 'unist-util-find-after'
import { visitParents } from 'unist-util-visit-parents'
import { isHeadingNode } from './type-utils'

const maxHeadingDepth = 6

/**
 * Finds content between two headings and wraps the content and the leading
 * heading in a `section` Node.
 */
function sectionize(node: Node, ancestors: Parent[]) {
  if (!isHeadingNode(node)) {
    return
  }

  const start = node
  const { depth } = start
  const parent = ancestors[ancestors.length - 1]

  if (!parent) {
    return
  }

  const isEnd = (node: Node) =>
    (isHeadingNode(node) && node.depth <= depth) || node.type === 'export'

  const end = findAfter(parent, start, isEnd)

  const startIndex = parent.children.indexOf(start)
  const endIndex = end ? parent.children.indexOf(end as Content) : 0

  const between = parent.children.slice(startIndex, endIndex > 0 ? endIndex : undefined)

  const section = u(
    'section',
    {
      data: {
        hName: 'section' as const,
      },
    },
    between,
  )

  parent.children.splice(startIndex, section.children.length, section)
}

type RemarkSectionizeOptions = {
  maxHeadingDepth: number
}

export default function remarkSectionize(
  options: RemarkSectionizeOptions = { maxHeadingDepth },
): Transformer<Parent> {
  const { maxHeadingDepth: maxDepth } = options
  return (tree) => {
    for (let depth = maxDepth; depth > 0; depth--) {
      visitParents(tree, (node) => isHeadingNode(node) && node.depth === depth, sectionize)
    }
  }
}
