
import test from 'ava';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import {unified} from 'unified';
import preset from '../index.js';

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
`;

test('the preset works', async t => {
  const processed = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(preset({imgSizeDir: './'}))
    .processSync(md);

  t.snapshot(String(processed));
});
