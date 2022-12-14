import type {
  Blockquote,
  Code,
  Footnote,
  FootnoteDefinition,
  FootnoteReference,
  Heading,
  Image,
  Paragraph,
  Parent,
  YAML,
} from 'mdast'
import type { ContainerDirective, Directive, LeafDirective } from 'mdast-util-directive'
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm'
import type { Node } from 'unist'
import type { Iframe, Root, Section, Video } from './types'

export function isNode(node: unknown): node is Node {
  return Boolean(node && typeof (node as Node)?.type === 'string')
}

export function isParentNode(node: unknown): node is Parent {
  return Boolean(isNode(node) && (node as Parent).children)
}

export function isDirectiveNode(node: unknown): node is Directive {
  return Boolean(
    isNode(node) &&
      (node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'),
  )
}

export function isParagraphNode(node: unknown): node is Paragraph {
  return Boolean(isNode(node) && node.type === 'paragraph')
}

export function isContainerDirectiveNode(node?: unknown): node is ContainerDirective {
  return Boolean(isNode(node) && node.type === 'containerDirective')
}

export function isLeafDirectiveNode(node: unknown): node is LeafDirective {
  return Boolean(isNode(node) && node.type === 'leafDirective')
}

export function isCodeNode(node: unknown): node is Code {
  return Boolean(isNode(node) && node.type === 'code')
}

export function isImageNode(node: unknown): node is Image {
  return Boolean(isNode(node) && node.type === 'image')
}

export function isIframeNode(node: unknown): node is Iframe {
  return Boolean(isNode(node) && node.type === 'iframe')
}

export function isVideoNode(node: unknown): node is Video {
  return Boolean(isNode(node) && node.type === 'video')
}

export function isHeadingNode(node: unknown): node is Heading {
  return Boolean(isNode(node) && node.type === 'heading')
}

export function isBlockquoteNode(node: unknown): node is Blockquote {
  return Boolean(isNode(node) && node.type === 'blockquote')
}

export function isRootNode(node: unknown): node is Root {
  return Boolean(isNode(node) && node.type === 'root')
}

export function isYamlNode(node: unknown): node is YAML {
  return Boolean(isNode(node) && node.type === 'yaml')
}

export function isMdxjsEsmNode(node: unknown): node is MdxjsEsm {
  return Boolean(isNode(node) && node.type === 'mdxjsEsm')
}

export function isSectionNode(node: unknown): node is Section {
  return Boolean(isNode(node) && node.type === 'section')
}

export function isFootnoteNode(node: unknown): node is Footnote {
  return Boolean(isNode(node) && node.type === 'footnote')
}

export function isFootnoteReferenceNode(node: unknown): node is FootnoteReference {
  return Boolean(isNode(node) && node.type === 'footnoteReference')
}

export function isFootnoteDefinitionNode(node: unknown): node is FootnoteDefinition {
  return Boolean(isNode(node) && node.type === 'footnoteDefinition')
}
