import type { BlockContent, DefinitionContent } from 'mdast';
import {
  isCodeNode,
  isImageNode,
  isLeafDirectiveNode,
  isVideoNode,
} from './type-utils.js';

export function contentTypePresenceReducer(
  p: Record<string, boolean>,
  n: BlockContent | DefinitionContent,
) {
  if (isCodeNode(n)) {
    return { ...p, code: true };
  }

  if (isImageNode(n)) {
    return { ...p, image: true };
  }

  if (isLeafDirectiveNode(n)) {
    return { ...p, leaf: true };
  }

  if (isVideoNode(n)) {
    return { ...p, video: true };
  }

  return p;
}
