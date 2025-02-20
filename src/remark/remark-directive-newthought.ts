import type { Parent } from 'mdast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import type { HastData, Newthought } from './types.js';

export default function remarkNewthought(): Transformer<Parent> {
  return (tree) => {
    visit(tree, { type: 'textDirective', name: 'newthought' }, (node) => {
      const newthought = node as Newthought;

      const data: HastData = {
        hName: 'span',
        hProperties: {
          className: ['newthought'],
        },
      };
      newthought.data = {
        ...newthought.data,
        ...data,
      };
    });
  };
}
