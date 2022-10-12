import type {Heading} from 'mdast';
import type {Transformer} from 'unified';
import type {Node, Parent} from 'unist';
import {visitParents} from 'unist-util-visit-parents';

function addInitialHeading(node: Node, ancestors: Parent[]) {
  const start = node;
  const parent = ancestors[ancestors.length - 1];

  if (!parent) {
    return;
  }

  const startIndex = parent.children.indexOf(start);

  const heading: Heading = {
    type: 'heading',
    depth: 2,
    children: [
      {
        type: 'text',
        value: 'Introduction',
      },
    ],
    data: {
      hProperties: {
        className: 'hidden',
      },
    },
  };

  parent.children.splice(startIndex, 0, heading);
}

export default function remarkInitialHeading(): Transformer {
  return (tree: Node) => {
    let foundHeading = false;
    visitParents(
      tree,
      (node, _, parent) => {
        if (
          !foundHeading
        && parent?.type === 'root'
        && node.type !== 'mdxjsEsm'
        && node.type !== 'yaml'
        && node.type !== 'heading'
        ) {
        // First real element
          foundHeading = true;
          return true;
        }

        if (node.type === 'heading') {
          foundHeading = true;
        }

        return false;
      },
      addInitialHeading,
    );
  };
}
