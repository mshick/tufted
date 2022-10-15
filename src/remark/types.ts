import type { Properties } from 'hast'
import type { BlockContent, Content, DefinitionContent, Parent } from 'mdast'
import type { ContainerDirective, Directive, TextDirective } from 'mdast-util-directive'
import type { Node } from 'unist'

export type Root = {
  type: 'root'
} & Node

export type HastData = {
  hName?: string
  hProperties?: Properties
}

export interface Newthought extends TextDirective {
  name: 'newthought'
}

export type SidenoteToggle = {
  type: 'sidenoteToggle'
  data?: HastData
}

export type SidenoteReference = {
  type: 'sidenoteReference'
  children: Content[]
  data?: HastData
} & Parent

export type SidenoteDefinition = {
  type: 'sidenoteDefinition'
  children: Content[]
  data?: HastData
} & Parent

export type SidenoteType = 'sidenote'

export type Sidenote = {
  type: SidenoteType
  children: Array<BlockContent | DefinitionContent | Content>
  data?: HastData
} & Parent

export type MarginnoteToggle = {
  type: 'marginnoteToggle'
  data?: HastData
}

export type MarginnoteReference = {
  type: 'marginnoteReference'
  children: Content[]
  data?: HastData
} & Parent

export type MarginnoteDefinition = {
  type: 'marginnoteDefinition'
  children: Content[]
  data?: HastData
} & Parent

export type MarginnoteType = 'marginnote'

export type Marginnote = {
  type: MarginnoteType
  children: Array<BlockContent | DefinitionContent | Content>
  data?: HastData
} & Parent

export type Iframe = {
  type: 'iframe'
  data?: HastData
}

export type Figure = {
  type: 'figure'
  children: Array<Content | Directive | ContainerDirective>
  data?: HastData
}

export type Figcaption = {
  type: 'figcaption'
  children: Content[]
  data?: HastData
}

export type Section = {
  type: 'section'
  data?: HastData
} & Parent

export type Epigraph = {
  type: 'epigraph'
  data?: HastData
} & Parent
