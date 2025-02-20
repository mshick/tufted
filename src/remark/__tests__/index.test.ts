import * as path from 'node:path';
// @ts-expect-error No types
import rehypeFigure from '@microflash/rehype-figure';
import { html } from 'js-beautify';
import rehypeStringify from 'rehype-stringify';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { readSync } from 'to-vfile';
import { unified } from 'unified';
import { expect, test } from 'vitest';
import preset from '../index.js';

test('the preset works', async () => {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(preset())
    .use(remarkRehype)
    .use(rehypeFigure)
    .use(rehypeStringify)
    .process(readSync(path.resolve(__dirname, '../../__tests__/example.md')));

  expect(html(String(processed))).toMatchSnapshot();
});
