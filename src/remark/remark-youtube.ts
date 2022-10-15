import type { Parent } from 'mdast'
import type { Transformer } from 'unified'
import { u } from 'unist-builder'
import { CONTINUE, EXIT, SKIP, visit } from 'unist-util-visit'
import { isDirectiveNode, isParentNode } from './type-utils.js'

export default function remarkYoutube(): Transformer<Parent> {
  return (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (isDirectiveNode(node) && isParentNode(parent)) {
        if (node.name !== 'youtube') {
          return [SKIP, index]
        }

        const attributes = node.attributes ?? {}
        const { id } = attributes

        if (node.type === 'textDirective') {
          file.fail('Text directives for `youtube` not supported', node)
          return [SKIP, index]
        }

        if (!id) {
          file.fail('Missing video id', node)
          return [SKIP, index]
        }

        const iframe = u('iframe', {
          data: {
            hName: 'iframe',
            hProperties: {
              src: `https://www.youtube.com/embed/${id}`,
              frameBorder: 0,
              allow:
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
              allowFullScreen: true,
            },
          },
        })

        const figure = u(
          'figure',
          {
            data: {
              hName: 'figure',
              hProperties: { className: ['iframe', 'youtube'] },
            },
          },
          [iframe],
        )

        parent.children.splice(index ?? 0, 1, figure)

        return EXIT
      }

      return CONTINUE
    })
  }
}
