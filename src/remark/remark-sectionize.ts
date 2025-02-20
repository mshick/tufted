import type { Parent } from 'mdast';
import type { Transformer } from 'unified';
import { u } from 'unist-builder';
import { findAfter } from 'unist-util-find-after';
import { SKIP, visitParents } from 'unist-util-visit-parents';
import {
  isExportNode,
  isHeadingNode,
  isMdxjsFlowElement,
} from './type-utils.js';

const minHeadingDepth = 2;
const maxHeadingDepth = 6;

type RemarkSectionizeOptions = {
  minHeadingDepth?: 1 | 2 | 3 | 4 | 5 | 6;
  maxHeadingDepth?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function remarkSectionize(
  options: RemarkSectionizeOptions = { minHeadingDepth, maxHeadingDepth },
): Transformer<Parent> {
  const {
    maxHeadingDepth: maxDepth = maxHeadingDepth,
    minHeadingDepth: minDepth = minHeadingDepth,
  } = options;

  return (tree) => {
    for (let depth = maxDepth; depth >= minDepth; depth--) {
      visitParents(
        tree,
        (child) => {
          return isHeadingNode(child) && child.depth === depth;
        },
        /**
         * Finds content between two headings and wraps the content and the leading
         * heading in a `section` Node.
         */
        (node, ancestors) => {
          if (!isHeadingNode(node)) {
            return SKIP;
          }

          const start = node;
          const { depth } = start;
          const parent: Parent | undefined = ancestors[ancestors.length - 1];

          if (!parent) {
            return SKIP;
          }

          const end = findAfter(parent, start, (child) => {
            return (
              (isHeadingNode(child) && child.depth <= depth) ||
              isMdxjsFlowElement(child) ||
              isExportNode(child)
            );
          });

          const startIndex = parent.children.indexOf(start);
          const endIndex = end ? parent.children.indexOf(end) : 0;

          const between = parent.children.slice(
            startIndex,
            endIndex > 0 ? endIndex : undefined,
          );

          const section = u(
            'section',
            {
              data: {
                hName: 'section' as const,
              },
            },
            between,
          );

          parent.children.splice(startIndex, section.children.length, section);

          return SKIP;
        },
      );
    }
  };
}
