import type {Properties} from 'hast';
import type {BlockContent, DefinitionContent, Heading, Paragraph, PhrasingContent} from 'mdast';
import type {Directive} from 'mdast-util-directive';
import type {Literal, Node, Parent} from 'unist';

export type HastData = {
  hName?: string;
  hProperties?: Properties;
} & Parent['data'];

export type SidenoteToggle = {
  type: 'sidenoteToggle';
  data?: HastData;
};

export type SidenoteReference = {
  type: 'sidenoteReference';
  children: PhrasingContent[];
  data?: HastData;
} & Parent;

export type SidenoteDefinition = {
  type: 'sidenoteDefinition';
  children: PhrasingContent[];
  data?: HastData;
} & Parent;

export type SidenoteType = 'sidenote';

export type Sidenote = {
  type: SidenoteType;
  children: Array<BlockContent | DefinitionContent>;
  data?: HastData;
} & Parent;

export type MarginnoteToggle = {
  type: 'marginnoteToggle';
  data?: HastData;
};

export type MarginnoteReference = {
  type: 'marginnoteReference';
  children: PhrasingContent[];
  data?: HastData;
} & Parent;

export type MarginnoteDefinition = {
  type: 'marginnoteDefinition';
  children: PhrasingContent[];
  data?: HastData;
} & Parent;

export type MarginnoteType = 'marginnote';

export type Marginnote = {
  type: MarginnoteType;
  children: Array<BlockContent | DefinitionContent>;
  data?: HastData;
} & Parent;

export type NoteType = `${SidenoteType | MarginnoteType}`;
export type NoteDefinition = SidenoteDefinition | MarginnoteDefinition;
export type NoteReference = SidenoteReference | MarginnoteReference;
export type NoteToggle = SidenoteToggle | MarginnoteToggle;

export type IframeFigure = {
  type: 'iframeFigure';
  children: Array<BlockContent | DefinitionContent | PhrasingContent>;
  data?: HastData;
} & Parent;

export type Figure = {
  type: 'figure';
  children: Array<BlockContent | DefinitionContent | PhrasingContent | TreeNode>;
  data?: HastData;
} & Parent;

export type TreeNode = Parent | Literal | Node;

export function isLiteralNode(node: TreeNode): node is Literal {
  return Boolean((node as Literal).value);
}

export function isParentNode(node: TreeNode): node is Parent {
  return Boolean((node as Parent).children);
}

export function isNode(node: TreeNode): node is Node {
  return Boolean((node as Node).type);
}

export function isDirective(node: Node): node is Directive {
  return Boolean(
    (node.type === 'textDirective'
      || node.type === 'leafDirective'
      || node.type === 'containerDirective')
      && (node as Directive).name
      && (node as Directive).children,
  );
}

export function isHeading(node?: Node): node is Heading {
  return Boolean(node && isParentNode(node) && node.type === 'heading');
}

export function isParagraph(node?: Node): node is Paragraph {
  return Boolean(node && isParentNode(node) && node.type === 'paragraph');
}
