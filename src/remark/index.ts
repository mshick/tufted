import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkMdxImages from 'remark-mdx-images';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkUnwrapImages from 'remark-unwrap-images';
import type {Preset} from 'unified';
import remarkEpigraph from './remark-epigraph';
import remarkFigure from './remark-figure';
import remarkFooter from './remark-footer';
import remarkInitialHeading from './remark-initial-heading';
import remarkNewthought from './remark-newthought';
import remarkSectionize from './remark-sectionize';
import remarkSidenotes from './remark-sidenotes';
import remarkWrapImages from './remark-wrap-images';
import remarkYoutube from './remark-youtube';

function main(): Preset {
  return {
    plugins: [
      remarkDirective,
      remarkDirectiveRehype,
      remarkYoutube,
      remarkUnwrapImages,
      remarkWrapImages,
      remarkFigure,
      remarkFooter,
      remarkNewthought,
      remarkSidenotes,
      remarkSqueezeParagraphs,
      remarkInitialHeading,
      [remarkSectionize, {maxHeadingDepth: 2}],
      remarkEpigraph,
      remarkMdxImages,
    ],
  };
}

export default main;
