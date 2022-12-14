import 'mdast'
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
    figcaption: Figcaption
    epigraph: Epigraph
    image: Image
    iframe: Iframe
    video: Video
  }

  interface DefinitionContentMap {
    sidenoteDefinition: SidenoteDefinition
  }
}
