import type {Parent} from 'mdast';
import type {Transformer} from 'unified';
import {u} from 'unist-builder';
import {visit} from 'unist-util-visit';
import type {Figure} from './complex-types';
import type {TreeNode} from './types';

export default function remmarkWrapImages(): Transformer {
  return tree => {
    visit(tree, {type: 'image'}, (node: TreeNode, index, parent: Parent) => {
      // Don't get images in an explicit figure container or that are inline
      if (parent.type !== 'containerDirective' && parent.type !== 'paragraph') {
        const wrapper = u(
          'figure',
          {
            data: {
              hName: 'figure',
            },
          },
          [node],
        ) as Figure;

        parent.children.splice(index ?? 0, 1, wrapper);
      }
    });
  };
}
