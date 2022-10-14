import type {Parent} from 'mdast';
import type {Transformer} from 'unified';
import {u} from 'unist-builder';
import {SKIP, visit} from 'unist-util-visit';
import type {HastData, IframeFigure, TreeNode} from './types';
import {isDirective} from './types.js';

/**
 * Plugin to upgrade remark-directives with videos.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkYoutube(): Transformer {
  return (tree, file) => {
    visit(tree, (node: TreeNode, index, parent: Parent) => {
      if (isDirective(node)) {
        if (node.name !== 'youtube') {
          return;
        }

        const attributes = node.attributes ?? {};
        const {id} = attributes;

        if (node.type === 'textDirective') {
          file.fail('Text directives for `youtube` not supported', node);
          return;
        }

        if (!id) {
          file.fail('Missing video id', node);
          return;
        }

        const data: HastData = {
          hName: 'iframe',
          hProperties: {
            src: `https://www.youtube.com/embed/${id}`,
            frameBorder: 0,
            allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowFullScreen: true,
          },
        };
        node.data = {
          ...node.data,
          data,
        };

        const wrapper: IframeFigure = u(
          'iframeFigure',
          {
            data: {
              hName: 'figure' as const,
              hProperties: {className: ['iframe', 'youtube']},
            },
          },
          [node],
        );

        parent.children.splice(index ?? 0, 1, wrapper);

        return [SKIP, index];
      }
    });

    return tree;
  };
}
