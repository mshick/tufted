import colors from 'tailwindcss/colors';
import type { PluginAPI } from 'tailwindcss/plugin';

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;

const sidenoteCounter = 'sidenote-counter';

export const styles = ({ theme }: Pick<PluginAPI, 'theme'>) => ({
  DEFAULT: {
    css: [
      {
        '--tw-prose-body': colors.black,
        '--tw-prose-headings': colors.black,
        '--tw-prose-lead': colors.black,
        '--tw-prose-links': colors.black,
        '--tw-prose-links-selection-bg': colors.black,
        '--tw-prose-links-hover-bg': colors.black,
        '--tw-prose-links-hover-text': colors.black,
        '--tw-prose-bold': colors.black,
        '--tw-prose-counters': colors.black,
        '--tw-prose-bullets': colors.black,
        '--tw-prose-hr': colors.black,
        '--tw-prose-quotes': colors.black,
        '--tw-prose-quote-borders': colors.black,
        '--tw-prose-captions': colors.black,
        '--tw-prose-borders': colors.gray['300'],
        '--tw-prose-code': colors.black,
        '--tw-prose-th-borders': colors.gray['300'],
        '--tw-prose-td-borders': colors.gray['300'],
        '--tw-prose-tr-even': colors.gray['100'],
        '--tw-prose-invert-body': colors.white,
        '--tw-prose-invert-headings': colors.white,
        '--tw-prose-invert-lead': colors.white,
        '--tw-prose-invert-links': colors.white,
        '--tw-prose-invert-bold': colors.white,
        '--tw-prose-invert-counters': colors.white,
        '--tw-prose-invert-bullets': colors.white,
        '--tw-prose-invert-hr': colors.white,
        '--tw-prose-invert-quotes': colors.white,
        '--tw-prose-invert-quote-borders': colors.white,
        '--tw-prose-invert-captions': colors.white,
        '--tw-prose-invert-borders': colors.gray['700'],
        '--tw-prose-invert-code': colors.white,
        '--tw-prose-invert-th-borders': colors.gray['700'],
        '--tw-prose-invert-td-borders': colors.gray['700'],
        '--tw-prose-invert-tr-even': colors.gray['900'],
        fontSize: rem(16),
        lineHeight: round(24 / 14),
        p: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        '[class~="lead"]': {
          fontStyle: 'italic',
          lineHeight: round(28 / 18),
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        blockquote: {
          paddingInlineStart: em(20, 18),
          position: 'relative',
          fontStyle: 'regular',
          border: '0',
          marginTop: '0',
          marginLeft: em(8, 16),
          marginBottom: em(12, 16),
          marginRight: '0',
          paddingLeft: em(12, 16),
          p: {
            width: '100%',
          },
        },
        'blockquote p:first-of-type::before': {
          content: '">"',
          display: 'block',
          position: 'absolute',
          left: em(-8, 16),
          color: 'inherit',
        },
        '&': {
          counterReset: sidenoteCounter,
        },
        section: {
          paddingTop: em(16, 16),
          paddingBottom: em(16, 16),
        },
        a: {
          textUnderlineOffset: em(8, 16),
        },
        'a:hover': {
          textDecorationColor: 'var(--tw-prose-links-hover-bg)',
          backgroundColor: 'var(--tw-prose-links-hover-bg)',
          color: 'var(--tw-prose-links-hover-text)',
          textShadow: 'none',
        },
        'a::selection': {
          backgroundColor: 'var(--tw-prose-links-selection-bg)',
          color: 'var(--tw-prose-pre-bg)',
          textShadow: 'none',
        },
        'a.anchor': {
          textDecoration: 'none',
        },
        h1: {
          fontWeight: 'normal',
          fontSize: em(30, 14),
          marginTop: em(20, 18),
          marginBottom: em(14, 16),
          lineHeight: round(36 / 30),
        },
        'h1:first-child': {
          marginTop: em(20, 18),
        },
        h2: {
          fontSize: em(20, 14),
          lineHeight: round(28 / 20),
          fontWeight: 'normal',
          fontStyle: 'italic',
          marginTop: em(24, 18),
          marginBottom: em(16, 16),
        },
        h3: {
          fontSize: em(18, 14),
          lineHeight: round(28 / 18),
          fontWeight: 'normal',
          fontStyle: 'italic',
          marginTop: em(24, 18),
          marginBottom: em(16, 16),
        },
        h4: {
          fontWeight: 'normal',
          marginTop: em(20, 14),
          marginBottom: em(8, 14),
          lineHeight: round(20 / 14),
        },

        img: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        picture: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        'picture > img': {
          marginTop: '0',
          marginBottom: '0',
        },
        video: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        kbd: {
          fontSize: em(12, 14),
          borderRadius: rem(5),
          paddingTop: em(2, 14),
          paddingInlineEnd: em(5, 14),
          paddingBottom: em(2, 14),
          paddingInlineStart: em(5, 14),
        },
        code: {
          fontSize: em(12, 14),
        },
        'h2 code': {
          fontSize: em(18, 20),
        },
        'h3 code': {
          fontSize: em(16, 18),
        },
        'h2 > a, h3 > a': {
          fontWeight: 'normal',
        },
        pre: {
          fontSize: em(12, 14),
          lineHeight: round(20 / 12),
          marginTop: em(20, 12),
          marginBottom: em(20, 12),
          borderRadius: rem(4),
          paddingTop: em(8, 12),
          paddingInlineEnd: em(12, 12),
          paddingBottom: em(8, 12),
          paddingInlineStart: em(12, 12),

          borderColor: 'var(--tw-prose-borders)',
          borderWidth: '1px',
          borderStyle: 'dashed',
          overflow: 'auto',
          backgroundColor: 'var(--tw-prose-pre-bg)',
        },
        ol: {
          paddingInlineStart: em(22, 14),
          position: 'relative',
          listStyle: 'none',
          marginTop: '0',
          marginBottom: em(12, 16),
          padding: '0',
          marginLeft: theme('spacing.7'),
        },
        ul: {
          paddingInlineStart: em(22, 14),
          position: 'relative',
          listStyle: 'none',
          marginTop: '0',
          marginBottom: em(12, 16),
          padding: '0',
          marginLeft: theme('spacing.7'),
        },
        li: {
          marginTop: em(4, 14),
          marginBottom: theme('spacing.1'),
        },
        'ol > li': {
          paddingInlineStart: em(6, 14),
          counterIncrement: 'li',
        },
        'ul > li': {
          paddingInlineStart: em(6, 14),
          counterIncrement: 'li',
        },
        '> ul > li p': {
          marginTop: em(8, 14),
          marginBottom: em(8, 14),
        },
        '> ul > li > p:first-child': {
          marginTop: em(16, 14),
        },
        '> ul > li > p:last-child': {
          marginBottom: em(16, 14),
        },
        '> ol > li > p:first-child': {
          marginTop: em(16, 14),
        },
        '> ol > li > p:last-child': {
          marginBottom: em(16, 14),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(8, 14),
          marginBottom: em(8, 14),
        },
        dl: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        dt: {
          marginTop: em(16, 14),
        },
        dd: {
          marginTop: em(4, 14),
          paddingInlineStart: em(22, 14),
        },
        hr: {
          marginTop: em(40, 14),
          marginBottom: em(40, 14),
        },
        'hr + *': {
          marginTop: '0',
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
        table: {
          fontSize: em(12, 14),
          lineHeight: round(18 / 12),
        },
        'thead th': {
          paddingInlineEnd: em(12, 12),
          paddingBottom: em(8, 12),
          paddingInlineStart: em(12, 12),
        },
        'tbody td, tfoot td': {
          paddingTop: em(8, 12),
          paddingInlineEnd: em(12, 12),
          paddingBottom: em(8, 12),
          paddingInlineStart: em(12, 12),
        },
        'tbody td:first-child, tfoot td:first-child': {
          paddingInlineStart: '0',
        },
        'tbody td:last-child, tfoot td:last-child': {
          paddingInlineEnd: '0',
        },
        'thead th:first-child': {
          paddingInlineStart: em(12, 12),
        },
        'thead th:last-child': {
          paddingInlineEnd: em(12, 12),
        },
        figure: {
          maxWidth: '100%',
          marginTop: theme('spacing.5'),
          marginBottom: theme('spacing.5'),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        figcaption: {
          fontSize: em(12, 14),
          lineHeight: round(16 / 12),
          marginTop: em(8, 12),
        },
        'blockquote footer': {
          fontSize: '0.75rem',
          textAlign: 'right',
        },
        '.newthought': {
          fontSize: '1.2rem',
          fontVariant: 'small-caps',
        },
        'ol > li::before': {
          content: 'counter(li)',
          color: 'inherit',
          position: 'absolute',
          left: '-20px',
        },
        'ul > li::before': {
          content: '"*"',
          color: 'inherit',
          position: 'absolute',
          left: '-20px',
        },
        thead: {
          borderBottomStyle: 'dashed',
        },
        tr: {
          borderBottomStyle: 'dashed',
        },
        'tr:nth-of-type(even)': {
          backgroundColor: 'var(--tw-prose-tr-even)',
        },
        'figure > figcaption': {
          marginTop: em(8, 16),
          color: 'var(--tw-prose-body)',
        },
        'figure.fullwidth': {
          display: 'block',
          gridTemplateColumns: 'initial',
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        '.video-wrapper': {
          aspectRatio: '16 / 9',
        },
        '.video-wrapper > iframe': {
          height: '100%',
          width: '100%',
        },
        // Inline marginnotes / sidenotes
        '.sidenote-number': {
          counterIncrement: sidenoteCounter,
          display: 'inline-block',
          maxHeight: '2rem',
        },
        '.sidenote-number::after': {
          content: `counter(${sidenoteCounter})`,
          fontSize: '0.6rem',
          top: '-0.4rem',
          left: '0.15rem',
          position: 'relative',
          verticalAlign: 'baseline',
        },
        '.sidenote-definition, .marginnote-definition': {
          fontSize: '0.8rem',
          position: 'relative',
          verticalAlign: 'baseline',
          clear: 'both',
          display: 'none',
          float: 'left',
          left: '1rem',
          margin: '1rem 2.5%',
          width: '95%',
        },
        '.sidenote-definition::before': {
          content: `counter(${sidenoteCounter})`,
          fontSize: '0.6rem',
          top: '-0.4rem',
          left: '-0.2rem',
          position: 'relative',
          verticalAlign: 'baseline',
        },
        '.sidenote input.margin-toggle': {
          display: 'none',
        },
        '.sidenote .margin-toggle:checked + .sidenote-definition': {
          display: 'block',
        },
        '.marginnote .margin-toggle:checked + .marginnote-definition': {
          display: 'block',
        },
        '.sidenote label.margin-toggle': {
          cursor: 'pointer',
          pointerEvents: 'initial',
        },
        '.marginnote input.margin-toggle': {
          display: 'none',
        },
        '.marginnote label.margin-toggle': {
          display: 'inline',
          cursor: 'pointer',
          pointerEvents: 'initial',
        },
        '[data-initial-heading=true]': {
          display: 'none',
        },
      },
    ],
  },
  sidenotes: {
    css: [
      {
        // Sidenotes to the side
        '.sidenote-definition, .marginnote-definition': {
          position: 'relative',
          verticalAlign: 'baseline',
          clear: 'right',
          display: 'block',
          float: 'right',
          left: 0,
          margin: '0.3rem -34% 0 0',
          width: '26%',
        },
        '.sidenote > label.margin-toggle': {
          cursor: 'default',
          pointerEvents: 'none',
        },
        '.marginnote > label.margin-toggle': {
          display: 'none',
          cursor: 'default',
          pointerEvents: 'none',
        },
      },
    ],
  },
  invert: {
    css: [
      {
        '--tw-prose-tr-even': 'var(--tw-prose-invert-tr-even)',
      },
    ],
  },
});
