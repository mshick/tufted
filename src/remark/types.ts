import type { Properties } from 'hast';
import type {
  BlockContent,
  DefinitionContent,
  Parent,
  PhrasingContent,
} from 'mdast';
import type { TextDirective } from 'mdast-util-directive';
import type { Node } from 'unist';

/**
 * Type related to mdx exports, can't find typings...
 */
export type Export = {
  type: 'export';
} & Node;

export type HastData = {
  hName?: string;
  hProperties?: Properties;
};

export type Footnote = {
  type: 'footnote';
  children: PhrasingContent[];
} & Parent;

export type Newthought = TextDirective & {
  name: 'newthought';
};

export type SidenoteToggle = {
  type: 'sidenoteToggle';
  data: {
    hName: 'input';
    hProperties: Properties;
  };
};

export type SidenoteReference = {
  type: 'sidenoteReference';
  children: Array<PhrasingContent>;
  data: {
    hName: 'label';
    hProperties: Properties;
  };
} & Parent;

export type SidenoteDefinition = {
  type: 'sidenoteDefinition';
  children: Array<BlockContent | DefinitionContent | PhrasingContent>;
  data: {
    hName: 'span';
    hProperties: Properties;
  };
} & Parent;

export type Sidenote = {
  type: 'sidenote';
  children: Array<SidenoteReference | SidenoteDefinition | SidenoteToggle>;
  data: {
    hName: 'span';
    hProperties: Properties;
  };
} & Parent;

export type Iframe = {
  type: 'iframe';
  data: {
    hName: 'iframe';
    hProperties: Properties;
  };
  children: Array<BlockContent | PhrasingContent>;
};

export type Video = {
  type: 'video';
  data: {
    hName: 'div';
    hProperties: Properties;
  };
  children: Array<BlockContent>;
};

export type Figure = {
  type: 'figure';
  children: Array<BlockContent | DefinitionContent>;
  data: {
    hName: 'figure';
    hProperties?: Properties;
  };
};

export type Figcaption = {
  type: 'figcaption';
  children: Array<PhrasingContent | BlockContent | DefinitionContent>;
  data: {
    hName: 'figcaption';
  };
};

export type Section = {
  type: 'section';
  data: {
    hName: 'section';
  };
} & Parent;

export type Epigraph = {
  type: 'epigraph';
  data: {
    hName: 'div';
    hProperties: Properties;
  };
} & Parent;
