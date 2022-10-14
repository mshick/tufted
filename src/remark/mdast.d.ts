import 'mdast';
import type {
  Figure,
  IframeFigure,
  Marginnote,
  MarginnoteDefinition,
  MarginnoteReference,
  MarginnoteToggle,
  Sidenote,
  SidenoteDefinition,
  SidenoteReference,
  SidenoteToggle,
} from './types';

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
