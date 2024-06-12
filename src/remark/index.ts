import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs'
import remarkUnwrapImages from 'remark-unwrap-images'
import type { Preset } from 'unified'
import remarkDirectiveFigure from './remark-directive-figure.js'
import remarkDirectiveFooter from './remark-directive-footer.js'
import remarkDirectiveNewthought from './remark-directive-newthought.js'
import remarkDirectiveVideo from './remark-directive-video.js'
import remarkEpigraph from './remark-epigraph.js'
import remarkInitialHeading from './remark-initial-heading.js'
import remarkSectionize from './remark-sectionize.js'
import remarkSidenotes from './remark-sidenotes.js'

function main(): Preset {
  return {
    plugins: [
      remarkGfm,
      remarkUnwrapImages,
      remarkDirective,
      remarkDirectiveVideo,
      remarkDirectiveFigure,
      remarkDirectiveRehype,
      remarkDirectiveFooter,
      remarkDirectiveNewthought,
      remarkSidenotes,
      remarkSqueezeParagraphs,
      remarkInitialHeading,
      [remarkSectionize, { maxHeadingDepth: 2 }],
      remarkEpigraph,
    ],
  }
}

export default main
