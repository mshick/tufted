import type {Node, Parent} from 'unist';
import {findAfter} from 'unist-util-find-after';
import {visitParents} from 'unist-util-visit-parents';
import {isHeading} from './types.js';

const maxHeadingDepth = 6;

function sectionize(node: Node, ancestors: Parent[]) {
  if (!isHeading(node)) {
    return;
  }

  const start = node;
  const {depth} = start;
  const parent = ancestors[ancestors.length - 1];

  if (!parent) {
    return;
  }

  const isEnd = (node: Node) =>
    (isHeading(node) && node.depth <= depth) || node.type === 'export';

  const end = findAfter(parent, start, isEnd);

  const startIndex = parent.children.indexOf(start);
  const endIndex = parent.children.indexOf(end ?? start);

  const between = parent.children.slice(
    startIndex,
    endIndex > 0 ? endIndex : undefined,
  );

  const section = {
    type: 'section',
    depth,
    children: between,
    data: {
      hName: 'section',
    },
  };

  parent.children.splice(startIndex, section.children.length, section);
}

type RemarkSectionizeOptions = {
  maxHeadingDepth?: number;
};

export default function remarkSectionize(options: RemarkSectionizeOptions) {
  const maxDepth = options.maxHeadingDepth ?? maxHeadingDepth;
  return (tree: Node) => {
    for (let depth = maxDepth; depth > 0; depth--) {
      visitParents(
        tree,
        (node: Node) => isHeading(node) && node.depth === depth,
        sectionize,
      );
    }
  };
}
