import { imageSize } from 'image-size'
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx'
import path from 'path'
import type { Transformer } from 'unified'
import type { Node as UnistNode } from 'unist'
import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'

/**
 * Handles:
 * "//"
 * "http://"
 * "https://"
 * "ftp://"
 */
const absolutePathRegex = /^(?:[a-z]+:)?\/\//

function getImageSize(src: string, dir: string) {
  if (absolutePathRegex.exec(src)) {
    return
  }

  // Treat `/` as a relative path, according to the server
  const shouldJoin = !path.isAbsolute(src) || src.startsWith('/')

  if (dir && shouldJoin) {
    src = path.join(dir, src)
  }

  return imageSize(src)
}

type ImportIdentifierMap = Record<string, string>

type MdxNode = {
  type: string
  source: {
    value: string
  }
  specifiers: Array<{
    type: string
    local: {
      type: string
      name: string
    }
  }>
}

function collectImportIdentifiers(node: UnistNode, importIdentifierMap: ImportIdentifierMap) {
  const estree = node.data?.['estree'] as Record<string, MdxNode[]>

  const importNodes = estree['body']?.filter((n) => n.type === 'ImportDeclaration') ?? []

  for (const importNode of importNodes) {
    for (const specifier of importNode.specifiers) {
      if (specifier.type === 'ImportDefaultSpecifier' && specifier.local.type === 'Identifier') {
        importIdentifierMap[specifier.local.name] = importNode.source.value
      }
    }
  }
}

type ImgNode = {
  attributes?: Array<{
    type: string
    name: string
    value?: { value?: string } | string
  }>
} & MdxJsxTextElement

function addSizeAttributes(
  node: ImgNode,
  importIdentifierMap: ImportIdentifierMap,
  dir: string,
): void {
  const srcNode = node.attributes?.find((attr) => attr.name === 'src')
  if (typeof srcNode?.value === 'object') {
    const srcIdentifier = srcNode?.value?.value
    if (srcIdentifier) {
      const src = importIdentifierMap[srcIdentifier]
      if (src) {
        const dimensions = getImageSize(src, dir)

        if (!dimensions) {
          return
        }

        if (dimensions.height) {
          node.attributes?.push({
            type: 'mdxJsxAttribute',
            name: 'height',
            value: String(dimensions.height),
          })
        }

        if (dimensions.width) {
          node.attributes?.push({
            type: 'mdxJsxAttribute',
            name: 'width',
            value: String(dimensions.width),
          })
        }

        if (dimensions.type) {
          node.attributes?.push({
            type: 'mdxJsxAttribute',
            name: 'type',
            value: dimensions.type,
          })
        }
      }
    }
  }
}

type ContentLayerVfile = VFile & {
  data?: { rawDocumentData?: { sourceFileDir: string } }
}

function createImageSizeTransformer(contentDir: string) {
  const importIdentifierMap: ImportIdentifierMap = {}

  return function (tree: UnistNode<any>, file: ContentLayerVfile) {
    if (!file?.data?.rawDocumentData?.sourceFileDir) {
      return tree
    }

    const dir = path.join(contentDir, file.data?.rawDocumentData?.sourceFileDir ?? '')

    visit(tree, ['mdxjsEsm', 'mdxJsxTextElement'], (node) => {
      const mdastNode = node as MdxJsxFlowElement | MdxJsxTextElement

      if (mdastNode.type === 'mdxJsxFlowElement') {
        collectImportIdentifiers(mdastNode, importIdentifierMap)
      }

      if (mdastNode.type === 'mdxJsxTextElement' && mdastNode.name === 'img') {
        addSizeAttributes(mdastNode as ImgNode, importIdentifierMap, dir)
      }
    })

    return tree
  }
}

export type RehypeImgSizeOptions = {
  dir?: string
}

export default function rehypeImgSize(options: RehypeImgSizeOptions): Transformer {
  return createImageSizeTransformer(options?.dir ?? '')
}
