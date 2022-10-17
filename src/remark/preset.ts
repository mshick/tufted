import remarkDirective from 'remark-directive'
// import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs'
import remarkUnwrapImages from 'remark-unwrap-images'
import type { Preset } from 'unified'
import remarkDirectiveFigure from './remark-directive-figure.js'
import remarkDirectiveFooter from './remark-directive-footer.js'
import remarkDirectiveNewthought from './remark-directive-newthought.js'
import remarkDirectiveYoutube from './remark-directive-youtube.js'
import remarkEpigraph from './remark-epigraph.js'
import remarkInitialHeading from './remark-initial-heading.js'
import remarkSectionize from './remark-sectionize.js'
import remarkSidenotes from './remark-sidenotes.js'
import remarkWrapImages from './remark-wrap-images.js'

function main(): Preset {
  return {
    plugins: [
      remarkGfm,
      remarkDirective,
      // remarkDirectiveRehype,
      remarkDirectiveYoutube,
      remarkUnwrapImages,
      remarkWrapImages,
      remarkDirectiveFigure,
      remarkDirectiveFooter,
      remarkDirectiveNewthought,
      // For inline notes, whichzzzzzz gfm doesn't support
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
