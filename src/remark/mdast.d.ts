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
} from './types'

declare module 'mdast' {
  interface StaticPhrasingContentMap {
    figure: Figure
    newthought: Newthought
    sidenote: Sidenote
    sidenoteReference: SidenoteReference
    sidenoteToggle: SidenoteToggle
  }

  interface BlockContentMap {
    section: Section
    iframe: Iframe
    figcaption: Figcaption
    epigraph: Epigraph
  }

  interface DefinitionContentMap {
    sidenoteDefinition: SidenoteDefinition
  }
}
