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
  data: {
    hName: 'input'
    hProperties: Properties
  }
}

export type SidenoteReference = {
  type: 'sidenoteReference'
  children: Content[]
  data: {
    hName: 'label'
    hProperties: Properties
  }
} & Parent

export type SidenoteDefinition = {
  type: 'sidenoteDefinition'
  children: Content[]
  data: {
    hName: 'span'
    hProperties: Properties
  }
} & Parent

export type Sidenote = {
  type: 'sidenote'
  children: Array<BlockContent | DefinitionContent | Content>
  data: {
    hName: 'span'
    hProperties: Properties
  }
} & Parent

export type Iframe = {
  type: 'iframe'
  data: {
    hName: 'iframe'
    hProperties: Properties
  }
}

export type Figure = {
  type: 'figure'
  children: Array<Content | Directive | ContainerDirective>
  data: {
    hName: 'figure'
    hProperties?: Properties
  }
}

export type Figcaption = {
  type: 'figcaption'
  children: Content[]
  data: {
    hName: 'figcaption'
  }
}

export type Section = {
  type: 'section'
  data: {
    hName: 'section'
  }
} & Parent

export type Epigraph = {
  type: 'epigraph'
  data: {
    hName: 'div'
    hProperties: Properties
  }
} & Parent
