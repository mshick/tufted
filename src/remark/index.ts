import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs'
import remarkUnwrapImages from 'remark-unwrap-images'
import type { Preset } from 'unified'
import remarkDirectiveFigure from './remark-directive-figure.js'
import remarkEpigraph from './remark-epigraph.js'
import remarkFooter from './remark-footer.js'
import remarkInitialHeading from './remark-initial-heading.js'
import remarkNewthought from './remark-newthought.js'
import remarkSectionize from './remark-sectionize.js'
import remarkSidenotes from './remark-sidenotes.js'
import remarkWrapImages from './remark-wrap-images.js'
import remarkYoutube from './remark-youtube.js'

function main(): Preset {
  return {
    plugins: [
      remarkGfm,
      remarkDirective,
      remarkDirectiveRehype,
      remarkYoutube,
      remarkUnwrapImages,
      remarkWrapImages,
      remarkDirectiveFigure,
      remarkFooter,
      remarkNewthought,
      // For inline notes, which gfm doesn't support
      [remarkFootnotes, { inlineNotes: true }],
      remarkSidenotes,
      remarkSqueezeParagraphs,
      remarkInitialHeading,
      [remarkSectionize, { maxHeadingDepth: 2 }],
      remarkEpigraph,
    ],
  }
}

export default main
