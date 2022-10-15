import { h } from 'hastscript'
import type { Parent } from 'mdast'
import type { ContainerDirective, LeafDirective } from 'mdast-util-directive'
import type { Transformer } from 'unified'
import { EXIT, SKIP, visit } from 'unist-util-visit'
import { isContainerDirectiveNode, isLeafDirectiveNode } from './type-utils'
import type { HastData } from './types'

export default function remarkFooter(): Transformer<Parent> {
  return (tree) => {
    visit(tree, { name: 'footer' }, (node: ContainerDirective | LeafDirective, index) => {
      if (!isContainerDirectiveNode(node) && !isLeafDirectiveNode(node)) {
        return [SKIP, index]
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

      return EXIT
    })
  }
}
