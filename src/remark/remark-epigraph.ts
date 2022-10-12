import type {BlockContent} from 'mdast';
import type {Transformer} from 'unified';
import type {Node} from 'unist';
import {visit} from 'unist-util-visit';
import {isParentNode} from './types';

/**
 * Find sections, from remark-sectionize, and then mark blockquotes that
 * are the first children after any headings.
 */
export default function remarkEpigraph(): Transformer {
  return tree => {
    visit(tree, {type: 'section'}, (node: Node) => {
      if (!isParentNode(node)) {
        return;
      }

      let nonBlockquoteFound = false;

      const epigraphNodes = node.children.filter(child => {
        if (nonBlockquoteFound) {
          return false;
        }

        if (child.type === 'heading') {
          return false;
        }

        if (child.type === 'blockquote') {
          return true;
        }

        nonBlockquoteFound = true;

        return false;
      }) as BlockContent[];

      if (epigraphNodes[0]) {
        const startIndex = node.children.indexOf(epigraphNodes[0]);

        const epigraph: BlockContent = {
          type: 'containerDirective',
          name: 'epigraph',
          children: epigraphNodes,
          data: {
            hName: 'div',
            hProperties: {
              className: ['epigraph'],
            },
          },
        };

        node.children.splice(startIndex, epigraph.children.length, epigraph);
      }
    });
  };
}
