import { html } from 'js-beautify'
import path from 'node:path'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { readSync } from 'to-vfile'
import { unified } from 'unified'
import { expect, test } from 'vitest'
import preset from '../preset.js'

test('the preset works', async () => {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(preset({ imgSizeDir: './' }))
    .process(readSync(path.resolve(__dirname, '../../__tests__/example.md')))

  expect(html(String(processed))).toMatchSnapshot()
})
