import type {TextDirective} from 'mdast-util-directive';
import type {Transformer} from 'unified';
import {visit} from 'unist-util-visit';
import type {HastData} from './types.js';

export default function remarkNewthought(): Transformer {
  return tree => {
    visit(
      tree,
      {type: 'textDirective', name: 'newthought'},
      (node: TextDirective) => {
        const data: HastData = {
          hName: 'span',
          hProperties: {
            ...(node.data?.['hProperties'] as Record<string, unknown>),
            className: ['newthought'],
          },
        };
        node.data = {
          ...node.data,
          data,
        };
      },
    );
  };
}
