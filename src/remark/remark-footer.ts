import {h} from 'hastscript';
import type {ContainerDirective, LeafDirective} from 'mdast-util-directive';
import type {Transformer} from 'unified';
import {visit} from 'unist-util-visit';
import type {HastData} from './types';

export default function remarkBlockquote(): Transformer {
  return tree => {
    visit(
      tree,
      {name: 'footer'},
      (node: ContainerDirective | LeafDirective) => {
        if (node.type !== 'containerDirective' && node.type !== 'leafDirective') {
          return;
        }

        const hast = h(node.name, node.attributes);
        const data: HastData = {
          hName: hast.tagName,
          hProperties: hast.properties,
        };
        node.data = {
          ...node.data,
          data,
        };
      },
    );
  };
}
