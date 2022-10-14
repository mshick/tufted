import type {
  BlockContent,
  DefinitionContent,
  FootnoteDefinition,
  FootnoteReference,
  Parent,
  PhrasingContent,
} from 'mdast';
import type {Transformer} from 'unified';
import {u} from 'unist-builder';
import {select} from 'unist-util-select';
import {visit} from 'unist-util-visit';
import type {HastData, NoteDefinition, NoteReference, NoteToggle, NoteType} from './types';
import {isParagraph} from './types.js';

// Need to use the unicode escape sequence for ⊕ / Circled Plus due to later sanitization
const marginnoteLabel = '\u2295';

function isNumericString(key: string): boolean {
  return !isNaN(Number(key));
}

function generateInputId(isMarginNote: boolean, identifier: string, referenceCount: number) {
  return `${isMarginNote ? 'mn' : 'sn'}-${identifier}-${referenceCount}`;
}

type GetReplacementParams = {
  isMarginNote: boolean;
  notesAst: Array<BlockContent | DefinitionContent | PhrasingContent>;
  identifier: string;
  referenceCount: number;
  marginnoteLabel: string;
};

function getReplacement({
  isMarginNote,
  notesAst,
  identifier,
  referenceCount,
  marginnoteLabel,
}: GetReplacementParams) {
  const inputId = generateInputId(isMarginNote, identifier, referenceCount);
  const labelCls = `margin-toggle ${isMarginNote ? '' : 'sidenote-number'}`;
  const labelSymbol = isMarginNote ? marginnoteLabel : '';
  const noteTypeCls = isMarginNote ? 'marginnote' : 'sidenote';

  return u<NoteType, HastData, Array<DefinitionContent | BlockContent>>(
    noteTypeCls,
    {data: {hName: 'span', hProperties: {className: [noteTypeCls]}}},
    [
      u(
        `${noteTypeCls}Reference`,
        {
          identifier,
          data: {
            hName: 'label',
            hProperties: {for: inputId, className: [labelCls]},
          },
        },
        [u('text', labelSymbol)],
      ) as NoteReference,
      u(`${noteTypeCls}Toggle`, {
        identifier,
        data: {
          hName: 'input',
          hProperties: {
            type: 'checkbox',
            id: inputId,
            className: ['margin-toggle'],
          },
        },
      }) as NoteToggle,
      u(
        `${noteTypeCls}Definition`,
        {
          identifier,
          data: {
            hName: 'span',
            hProperties: {className: [`${noteTypeCls}-definition`]},
          },
        },
        notesAst,
      ) as NoteDefinition,
    ],
  );
}

export default function remarkSidenotes(
  options = {marginnoteLabel},
): Transformer {
  const settings = {
    marginnoteLabel: options.marginnoteLabel || marginnoteLabel,
  };

  return tree => {
    let referenceCount = 0;

    // "Regular" Sidenotes/Marginnotes consisting of a reference and a definition
    // Syntax for Sidenotes [^<number>] and somewhere else [^<number>]: <markdown>
    // Syntax for Marginnotes [^<string>] and somewhere else [^<string>]: <markdown>
    visit(
      tree,
      'footnoteReference',
      (node: FootnoteReference, index, parent: Parent) => {
        referenceCount += 1;

        const {identifier} = node;

        const target = select(
          `footnoteDefinition[identifier=${identifier}]`,
          tree,
        ) as FootnoteDefinition | undefined;

        if (!target) {
          throw new Error('No coresponding note found');
        }

        const isMarginNote = !isNumericString(identifier);

        const notesAst
          = isParagraph(target.children[0])
            ? target.children[0].children
            : target.children;

        const replacement = getReplacement({
          isMarginNote,
          notesAst,
          identifier,
          referenceCount,
          ...settings,
        });

        parent.children.splice(
          index,
          1,
          replacement,
        );
      },
    );

    visit(tree, 'footnoteDefinition', (_node, index, parent: Parent) => {
      parent.children.splice(index, 1);
    });

    // "Inline" Sidenotes which do not have two parts
    // Syntax: [^ <markdown>]
    visit(
      tree,
      'footnote',
      (node: FootnoteDefinition, index, parent: Parent) => {
        const {identifier} = node;
        const isMarginNote = !isNumericString(identifier);
        const notesAst = node.children;
        const replacement = getReplacement({
          isMarginNote,
          notesAst,
          identifier,
          referenceCount,
          ...settings,
        });

        parent.children.splice(
          index,
          1,
          replacement,
        );
      },
    );

    // Only for testing
    return tree;
  };
}
