import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkGfm from 'remark-gfm';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkUnwrapImages from 'remark-unwrap-images';
import type { Preset, Settings } from 'unified';
import remarkDirectiveFigure from './remark-directive-figure.js';
import remarkDirectiveFooter from './remark-directive-footer.js';
import remarkDirectiveNewthought from './remark-directive-newthought.js';
import remarkDirectiveVideo from './remark-directive-video.js';
import remarkEpigraph from './remark-epigraph.js';
import remarkInitialHeading from './remark-initial-heading.js';
import remarkSectionize from './remark-sectionize.js';
import remarkSidenotes from './remark-sidenotes.js';
import remmarkWrapImages from './remark-wrap-images.js';

export type PresetSettings = {
  settings?: Settings;
};

function main({ settings }: PresetSettings = {}): Preset {
  return {
    settings,
    plugins: [
      remarkGfm,
      remarkUnwrapImages,
      remarkDirective,
      remarkDirectiveVideo,
      remarkDirectiveFigure,
      remarkDirectiveRehype,
      remarkDirectiveFooter,
      remarkDirectiveNewthought,
      remmarkWrapImages,
      remarkSidenotes,
      remarkSqueezeParagraphs,
      remarkInitialHeading,
      [remarkSectionize, { minHeadingDepth: 2, maxHeadingDepth: 2 }],
      remarkEpigraph,
    ],
  };
}

export default main;
