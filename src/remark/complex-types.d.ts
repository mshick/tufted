import type {BlockContent, DefinitionContent, Parent, PhrasingContent} from 'mdast';
import type {HastData, TreeNode} from './types';

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

declare module 'mdast' {
  interface StaticPhrasingContentMap {
    sidenote: Sidenote;
    marginnote: Marginnote;
  }

  interface DefinitionContentMap {
    sidenoteDefinition: SidenoteDefinition;
    marginnoteDefinition: MarginnoteDefinition;
  }

  interface BlockContentMap {
    sidenoteToggle: SidenoteToggle;
    marginnoteToggle: MarginnoteToggle;
    sidenoteReference: SidenoteReference;
    marginnoteReference: MarginnoteReference;
    iframe: IframeFigure;
    figure: Figure;
  }
}
