import {h} from 'hastscript';
import type {BlockContent} from 'mdast';
import type {ContainerDirective} from 'mdast-util-directive';
import type {Transformer} from 'unified';
import {visit} from 'unist-util-visit';
import type {HastData} from './types';

export default function remarkFigure(): Transformer {
  return tree => {
    visit(
      tree,
      {type: 'containerDirective', name: 'figure'},
      (node: ContainerDirective) => {
        let currentGroupStart = 0;

        const groupedCaptions = node.children.reduce<
        Record<number, BlockContent[]>
        >((g, n, i) => {
          if (
            n.type !== 'code'
          // @ts-expect-error Node types
          && n.type !== 'image'
          && n.type !== 'leafDirective'
          ) {
            return {
              ...g,
              [currentGroupStart]: [...(g[currentGroupStart] ?? []), n],
            };
          }

          currentGroupStart = i + 1;
          return g;
        }, {});

        if (Object.entries(groupedCaptions).length > 0) {
          for (const [startIndex, captionNodes] of Object.entries(
            groupedCaptions,
          )) {
            const figcaption: BlockContent = {
              name: 'figcaption',
              type: 'containerDirective',
              children: captionNodes,
              data: {
                hName: 'figcaption',
              },
            };

            node.children.splice(
              Number(startIndex),
              figcaption.children.length,
              figcaption,
            );
          }
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
