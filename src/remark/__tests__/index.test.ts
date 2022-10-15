import { html } from 'js-beautify'
import rehypeStringify from 'rehype-stringify'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { expect, test } from 'vitest'
import preset from '../index.js'

const md = `
Technical jargon, programming language terms, and code samples are denoted with
the \`code\` class, as I've been using in this document to denote HTML. Code needs
to be monospace for formatting purposes and to aid in code analysis, but it must
maintain its readability. To those ends, Tufte CSS follows GitHub's font
selection, which shifts gracefully along the monospace spectrum from the elegant
but rare Consolas all the way ^[heyheyu] to good old reliable Courier.

::youtube[iPhone resolution]{#YslQ2625TR4}

Something about something.

## Yeah

:::figure{.fullwidth}

![Figurative map of the successive losses of the French Army in the Russian
campaign, 1812-1813](https://edwardtufte.github.io/tufte-css/img/napoleons-march.png)

Figurative map of the successive losses of the French Army in the Russian
campaign, 1812-1813

:::

After the figure is the afterfigure.

![Should get wrapped](./exports-imports.png)

Tufte CSS uses \`h1\` for the document title, \`p\` with class \`subtitle\` for the
document subtitle, \`h2\` for section headings, and \`h3\` for low-level headings.
More specific headings are not supported. If you feel the urge to reach for a
heading of level 4 or greater, consider redesigning your document:

> [It is] notable that the Feynman lectures (3 volumes) write about all of
> physics in 1800 pages, using only 2 levels of hierarchical headings: chapters
> and A-level heads in the text. It also uses the methodology of _sentences_
>
> ::footer[[Edward Tufte, forum post, 'Book design: advice and examples' thread][quote-cite]]

[quote-cite]: http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000hB



:newthought[In his later books][^1], Tufte starts each section with a bit of
vertical space, a non-indented paragraph, and the first few words of the
sentence set in small caps. For this we use a span with the class \`newthought\`,
as demonstrated at the beginning of this paragraph. Vertical spacing is
accomplished separately through \`<section>\` tags. Be consistent: though we do so
in this paragraph for the purpose of demonstration, do not alternate use of
header elements and the \`newthought\` technique. Pick one approach and stick to
it.

[^1]: [Beautiful Evidence](http://www.edwardtufte.com/tufte/books_be)
`

test('the preset works', async () => {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(preset())
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md)

  expect(html(String(processed))).toMatchSnapshot()
})
