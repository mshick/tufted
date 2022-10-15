import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { expect, test } from 'vitest'
import preset from '../index.js'

const md = `
## Hello World

How's it going?

\`\`\`js:foo.js
function foo(bar) {
  var a = 42;
  var b = 'Prism';
  return a + bar(b);
}
\`\`\`
`

test('the preset works', async () => {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(preset({ imgSizeDir: './' }))
    .process(md)

  expect(String(processed)).toMatchSnapshot()
})
