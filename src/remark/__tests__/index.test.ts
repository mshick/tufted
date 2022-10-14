
import test from 'ava';
import rehypeStringify from 'rehype-stringify';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import {unified} from 'unified';
import preset from '../index.js';

const md = `
## Hello World

How's it going?
`;

test('the preset works', async t => {
  const processed = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(preset())
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(md);

  t.snapshot(String(processed));
});
