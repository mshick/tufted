import type { Parent } from 'mdast'
import type { Transformer } from 'unified'
import { visit } from 'unist-util-visit'
import type { HastData, Newthought } from './types'

export default function remarkNewthought(): Transformer<Parent> {
  return (tree) => {
    visit(tree, { type: 'textDirective', name: 'newthought' }, (node: Newthought) => {
      const data: HastData = {
        hName: 'span',
        hProperties: {
          className: ['newthought'],
        },
      }
      node.data = {
        ...node.data,
        ...data,
      }
    })
  }
}
