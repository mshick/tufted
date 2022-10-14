import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkUnwrapImages from 'remark-unwrap-images';
import type {Preset} from 'unified';
import remarkYoutube from './remark-youtube.js';

function main(): Preset {
  return {
    plugins: [
      remarkDirective,
      remarkDirectiveRehype,
      remarkYoutube,
      remarkUnwrapImages,
      // remarkWrapImages,
      // remarkFigure,
      // remarkFooter,
      // remarkNewthought,
      // remarkSidenotes,
      // remarkSqueezeParagraphs,
      // remarkInitialHeading,
      // [remarkSectionize, {maxHeadingDepth: 2}],
      // remarkEpigraph,
      // remarkMdxImages,
    ],
  };
}

export default main;
