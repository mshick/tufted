import type {
  BlockContent,
  Content,
  DefinitionContent,
  FootnoteDefinition,
  Parent,
  PhrasingContent,
} from 'mdast'
import { createHash } from 'node:crypto'
import type { Transformer } from 'unified'
import { u } from 'unist-builder'
import { select } from 'unist-util-select'
import { visit } from 'unist-util-visit'
import {
  isFootnoteDefinitionNode,
  isFootnoteNode,
  isFootnoteReferenceNode,
  isParagraphNode,
  isParentNode,
} from './type-utils'
import type { HastData, Sidenote } from './types'

// Need to use the unicode escape sequence for ⊕ / Circled Plus due to later sanitization
const marginnoteLabel = '\u2295'

function isNumericString(key: string): boolean {
  return !isNaN(Number(key))
}

function generateInputId(isMarginNote: boolean, identifier: string, referenceCount: number) {
  return `${isMarginNote ? 'mn' : 'sn'}-${identifier}-${referenceCount}`
}

function createIdentifierHash(data: string) {
  return createHash('sha1').update(data).digest('base64').replace('=', '')
}

type GetReplacementParams = {
  isMarginNote: boolean
  notesAst: Array<BlockContent | DefinitionContent | PhrasingContent>
  identifier: string
  referenceCount: number
  marginnoteLabel: string
}

function getReplacement({
  isMarginNote,
  notesAst,
  identifier,
  referenceCount,
  marginnoteLabel,
}: GetReplacementParams) {
  const inputId = generateInputId(isMarginNote, identifier, referenceCount)
  const labelCls = `margin-toggle ${isMarginNote ? '' : 'sidenote-number'}`
  const labelSymbol = isMarginNote ? marginnoteLabel : ''
  const noteTypeCls = isMarginNote ? 'marginnote' : 'sidenote'

  return u<Sidenote['type'], { data: HastData }, Array<Content | BlockContent>>(
    'sidenote',
    { data: { hName: 'span', hProperties: { className: [noteTypeCls] } } },
    [
      u(
        `sidenoteReference`,
        {
          identifier,
          data: {
            hName: 'label',
            hProperties: { for: inputId, className: [labelCls] },
          },
        },
        [u('text', labelSymbol)],
      ),
      u(`sidenoteToggle`, {
        identifier,
        data: {
          hName: 'input',
          hProperties: {
            type: 'checkbox',
            id: inputId,
            className: ['margin-toggle'],
          },
        },
      }),
      u(
        `sidenoteDefinition`,
        {
          identifier,
          data: {
            hName: 'span',
            hProperties: { className: [`${noteTypeCls}-definition`] },
          },
        },
        notesAst,
      ),
    ],
  )
}

export default function remarkSidenotes(options = { marginnoteLabel }): Transformer<Parent> {
  const settings = {
    marginnoteLabel: options.marginnoteLabel || marginnoteLabel,
  }

  return (tree) => {
    let referenceCount = 0

    // "Regular" Sidenotes/Marginnotes consisting of a reference and a definition
    // Syntax for Sidenotes [^<number>] and somewhere else [^<number>]: <markdown>
    // Syntax for Marginnotes [^<string>] and somewhere else [^<string>]: <markdown>
    visit(tree, { type: 'footnoteReference' }, (node, index, parent) => {
      if (!isFootnoteReferenceNode(node) || !isParentNode(parent)) {
        return
      }

      referenceCount += 1

      const { identifier } = node

      const target = select(`footnoteDefinition[identifier=${identifier}]`, tree) as
        | FootnoteDefinition
        | undefined

      if (!target) {
        throw new Error('No coresponding note found')
      }

      const isMarginNote = !isNumericString(identifier)

      const notesAst = isParagraphNode(target.children[0])
        ? target.children[0].children
        : target.children

      const replacement = getReplacement({
        isMarginNote,
        notesAst,
        identifier,
        referenceCount,
        ...settings,
      })

      parent.children.splice(index ?? 0, 1, replacement)
    })

    // "Inline" Sidenotes which do not have two parts
    // Syntax: ^[<markdown>]
    visit(tree, { type: 'footnote' }, (node, index, parent) => {
      if (!isFootnoteNode(node) || !isParentNode(parent)) {
        return
      }

      const notesAst = node.children
      // @ts-expect-error Is always a text node
      const notesValue = notesAst?.[0]?.value
      const identifier = createIdentifierHash(notesValue)
      const replacement = getReplacement({
        isMarginNote: true,
        notesAst,
        identifier,
        referenceCount,
        ...settings,
      })

      parent.children.splice(index ?? 0, 1, replacement)
    })

    // These are suppressed, since the reference needs to pull this info in context
    visit(tree, { type: 'footnoteDefinition' }, (node, index, parent) => {
      if (!isFootnoteDefinitionNode(node) || !isParentNode(parent)) {
        return
      }

      parent.children.splice(index ?? 0, 1)
    })
  }
}
