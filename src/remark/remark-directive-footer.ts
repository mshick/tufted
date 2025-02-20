import { type Properties, h } from 'hastscript';
import type { Parent } from 'mdast';
import type { Transformer } from 'unified';
import { EXIT, SKIP, visit } from 'unist-util-visit';
import { isContainerDirectiveNode, isLeafDirectiveNode } from './type-utils.js';
import type { HastData } from './types.js';

export default function remarkFooter(): Transformer<Parent> {
  return (tree) => {
    visit(tree, { name: 'footer' }, (node, index) => {
      if (!isContainerDirectiveNode(node) && !isLeafDirectiveNode(node)) {
        return [SKIP, index];
      }

      const hast = h(node.name, node.attributes as Properties);

      const data: HastData = {
        hName: hast.tagName,
        hProperties: hast.properties,
      };

      node.data = {
        ...node.data,
        ...data,
      };

      return EXIT;
    });
  };
}
