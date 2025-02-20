import type { Parent } from 'mdast';
import type { Transformer } from 'unified';
import { u } from 'unist-builder';
import { visit } from 'unist-util-visit';
import {
  isBlockquoteNode,
  isHeadingNode,
  isSectionNode,
} from './type-utils.js';

/**
 * Find sections, from remark-sectionize, and then mark blockquotes that
 * are the first children after any headings.
 */
export default function remarkEpigraph(): Transformer<Parent> {
  return (tree) => {
    visit(tree, { type: 'section' }, (node) => {
      if (!isSectionNode(node)) {
        return;
      }

      let nonBlockquoteFound = false;

      const epigraphNodes = node.children.filter((child) => {
        if (nonBlockquoteFound) {
          return false;
        }

        if (isHeadingNode(child)) {
          return false;
        }

        if (isBlockquoteNode(child)) {
          return true;
        }

        nonBlockquoteFound = true;

        return false;
      });

      if (epigraphNodes[0]) {
        const startIndex = node.children.indexOf(epigraphNodes[0]);

        const epigraph = u(
          'epigraph',
          {
            data: {
              hName: 'div' as const,
              hProperties: {
                className: ['epigraph'],
              },
            },
          },
          epigraphNodes,
        );

        node.children.splice(startIndex, epigraph.children.length, epigraph);
      }
    });
  };
}
