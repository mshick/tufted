import type {Transformer} from 'unified';
import {remove} from 'unist-util-remove';

export default function remarkTruncate(): Transformer {
  return tree => {
    let paragraphCount = 0;

    remove(tree, {cascade: false}, (node, _index, parent) => {
      if (node.type === 'root') {
        return false;
      }

      if (node.type === 'heading') {
        return true;
      }

      if (
        parent?.type === 'root'
      && node.type === 'paragraph'
      && paragraphCount < 2
      ) {
        paragraphCount += 1;
      }

      if (
        parent?.type === 'root'
      && (node.type !== 'paragraph' || paragraphCount >= 2)
      ) {
        return true;
      }

      return false;
    });
  };
}
