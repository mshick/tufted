import type { BlockContent, Parent } from 'mdast';
import type { Transformer } from 'unified';
import { u } from 'unist-builder';
import { CONTINUE, visit } from 'unist-util-visit';
import {
  isFigureNode,
  isImageNode,
  isParagraphNode,
  isParentNode,
  isVideoNode,
} from './type-utils.js';
import { contentTypePresenceReducer } from './utils.js';

export default function remmarkWrapImages(): Transformer<Parent> {
  return (tree) => {
    visit(
      tree,
      (node) => {
        if (isImageNode(node)) {
          return true;
        }

        if (isVideoNode(node)) {
          return true;
        }

        return false;
      },
      (node, index, parent) => {
        // Don't get images in an explicit figure container or that are inline
        if (
          isParentNode(parent) &&
          !isFigureNode(parent) &&
          !isParagraphNode(parent)
        ) {
          const contentTypesPresent = contentTypePresenceReducer(
            {},
            node as BlockContent,
          );

          const figure = u(
            'figure',
            {
              data: {
                hName: 'figure' as const,
                hProperties: {
                  className: Object.keys(contentTypesPresent),
                },
              },
            },
            [node as BlockContent],
          );

          parent.children.splice(index ?? 0, 1, figure);
        }

        return CONTINUE;
      },
    );
  };
}
