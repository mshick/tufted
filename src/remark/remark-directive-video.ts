import type { Parent } from 'mdast'
import type { Transformer } from 'unified'
import { u } from 'unist-builder'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'
import { isLeafDirectiveNode, isParentNode } from './type-utils.js'

export default function remarkDirectiveVideo(): Transformer<Parent> {
  return (tree, file) => {
    visit(
      tree,
      // Only handles YouTube right now.
      (node) => isLeafDirectiveNode(node) && node.name === 'youtube',
      (node, index, parent) => {
        if (isLeafDirectiveNode(node) && isParentNode(parent)) {
          const attributes = node.attributes ?? {}
          const { id } = attributes

          if (!id) {
            file.fail('Missing video id', node)
            return [SKIP, index]
          }

          const iframe = u(
            'iframe',
            {
              data: {
                hName: 'iframe' as const,
                hProperties: {
                  src: `https://www.youtube.com/embed/${id}`,
                  frameBorder: 0,
                  allow:
                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                  allowFullScreen: true,
                  className: ['youtube'],
                },
              },
            },
            node.children,
          )

          const video = u(
            'video',
            {
              data: {
                hName: 'div' as const,
                hProperties: {
                  className: ['video-wrapper'],
                },
              },
            },
            [iframe],
          )

          parent.children.splice(index ?? 0, 1, video)

          return [SKIP, index]
        }

        return CONTINUE
      },
      true,
    )
  }
}
