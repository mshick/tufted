import 'mdast';
import type {
  Epigraph,
  Figcaption,
  Figure,
  Iframe,
  Newthought,
  Section,
  Sidenote,
  SidenoteDefinition,
  SidenoteReference,
  SidenoteToggle,
  Video,
} from './types.js';

declare module 'mdast' {
  interface PhrasingContentMap {
    // newthought: Newthought
    sidenote: Sidenote;
    sidenoteReference: SidenoteReference;
    sidenoteToggle: SidenoteToggle;
  }

  interface BlockContentMap {
    figure: Figure;
    figcaption: Figcaption;
    section: Section;
    epigraph: Epigraph;
    image: Image;
    iframe: Iframe;
    video: Video;
    newthought: Newthought;
    sidenote: Sidenote;
    sidenoteReference: SidenoteReference;
    sidenoteDefinition: SidenoteDefinition;
    sidenoteToggle: SidenoteToggle;
  }

  interface RootContentMap {
    figure: Figure;
    figcaption: Figcaption;
    section: Section;
    epigraph: Epigraph;
    image: Image;
    iframe: Iframe;
    video: Video;
    newthought: Newthought;
    sidenote: Sidenote;
    sidenoteReference: SidenoteReference;
    sidenoteDefinition: SidenoteDefinition;
    sidenoteToggle: SidenoteToggle;
  }

  // interface DefinitionContentMap {
  //   sidenoteDefinition: SidenoteDefinition
  // }
}
