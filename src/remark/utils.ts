import type { BlockContent } from 'mdast'
import { isCodeNode, isIframeNode, isImageNode, isLeafDirectiveNode } from './type-utils.js'

export function contentTypePresenceReducer(p: Record<string, boolean>, n: BlockContent) {
  if (isCodeNode(n)) {
    return { ...p, code: true }
  }

  if (isImageNode(n)) {
    return { ...p, image: true }
  }

  if (isLeafDirectiveNode(n)) {
    return { ...p, leaf: true }
  }

  if (isIframeNode(n)) {
    return { ...p, iframe: true, [n.name]: true }
  }

  return p
}
