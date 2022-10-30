const { DEFAULT } = require('@tailwindcss/typography/src/styles')

const colors = (theme) => ({
  '--tw-prose-body': theme('colors.black'),
  '--tw-prose-headings': theme('colors.black'),
  '--tw-prose-lead': theme('colors.black'),
  '--tw-prose-links': theme('colors.black'),
  '--tw-prose-bold': theme('colors.black'),
  '--tw-prose-counters': theme('colors.black'),
  '--tw-prose-bullets': theme('colors.black'),
  '--tw-prose-hr': theme('colors.black'),
  '--tw-prose-quotes': theme('colors.black'),
  '--tw-prose-quote-borders': theme('colors.black'),
  '--tw-prose-captions': theme('colors.black'),
  '--tw-prose-borders': theme('colors.gray.300'),
  '--tw-prose-code': theme('colors.black'),
  '--tw-prose-pre-code': '#977d49',
  '--tw-prose-pre-code-keyword': '#728fcb',
  '--tw-prose-pre-code-comment': '#b6ad9a',
  '--tw-prose-pre-code-tag': '#063289',
  '--tw-prose-pre-code-function': '#b29762',
  '--tw-prose-pre-code-selector': '#2d2006',
  '--tw-prose-pre-code-attr-name': '#896724',
  '--tw-prose-pre-code-variable': '#93abdc',
  '--tw-prose-pre-code-inserted': '#2d2006',
  '--tw-prose-pre-code-important': '#896724',
  '--tw-prose-pre-code-highlight': '#896724',
  '--tw-prose-pre-code-selection': '#f2ece4',
  '--tw-prose-pre-bg': theme('colors.white'),
  '--tw-prose-th-borders': theme('colors.gray.300'),
  '--tw-prose-td-borders': theme('colors.gray.300'),
  '--tw-prose-tr-even': theme('colors.gray.100'),
  '--tw-prose-invert-body': theme('colors.white'),
  '--tw-prose-invert-headings': theme('colors.white'),
  '--tw-prose-invert-lead': theme('colors.white'),
  '--tw-prose-invert-links': theme('colors.white'),
  '--tw-prose-invert-bold': theme('colors.white'),
  '--tw-prose-invert-counters': theme('colors.white'),
  '--tw-prose-invert-bullets': theme('colors.white'),
  '--tw-prose-invert-hr': theme('colors.white'),
  '--tw-prose-invert-quotes': theme('colors.white'),
  '--tw-prose-invert-quote-borders': theme('colors.white'),
  '--tw-prose-invert-captions': theme('colors.white'),
  '--tw-prose-invert-borders': theme('colors.gray.700'),
  '--tw-prose-invert-code': theme('colors.white'),
  '--tw-prose-invert-pre-code': '#b3ace8',
  '--tw-prose-invert-pre-code-keyword': '#ffcc99',
  '--tw-prose-invert-pre-code-comment': '#6c6783',
  '--tw-prose-invert-pre-code-tag': '#e09142',
  '--tw-prose-invert-pre-code-function': '#9a86fd',
  '--tw-prose-invert-pre-code-selector': '#eeebff',
  '--tw-prose-invert-pre-code-attr-name': '#c4b9fe',
  '--tw-prose-invert-pre-code-variable': '#ffcc99',
  '--tw-prose-invert-pre-code-inserted': '#eeebff',
  '--tw-prose-invert-pre-code-important': '#c4b9fe',
  '--tw-prose-invert-pre-code-highlight': '#8a75f5',
  '--tw-prose-invert-pre-code-selection': '#6a51e6',
  '--tw-prose-invert-pre-bg': theme('colors.black'),
  '--tw-prose-invert-th-borders': theme('colors.gray.700'),
  '--tw-prose-invert-td-borders': theme('colors.gray.700'),
  '--tw-prose-invert-tr-even': theme('colors.gray.900'),
})

const inverted = () => ({
  '--tw-prose-borders': 'var(--tw-prose-invert-borders)',
  '--tw-prose-tr-even': 'var(--tw-prose-invert-tr-even)',
  '--tw-prose-pre-code-keyword': 'var(--tw-prose-invert-pre-code-keyword)',
  '--tw-prose-pre-code-comment': 'var(--tw-prose-invert-pre-code-comment)',
  '--tw-prose-pre-code-tag': 'var(--tw-prose-invert-pre-code-tag)',
  '--tw-prose-pre-code-function': 'var(--tw-prose-invert-pre-code-function)',
  '--tw-prose-pre-code-selector': 'var(--tw-prose-invert-pre-code-selector)',
  '--tw-prose-pre-code-attr-name': 'var(--tw-prose-invert-pre-code-attr-name)',
  '--tw-prose-pre-code-variable': 'var(--tw-prose-invert-pre-code-variable)',
  '--tw-prose-pre-code-inserted': 'var(--tw-prose-invert-pre-code-important)',
  '--tw-prose-pre-code-selection': 'var(--tw-prose-invert-pre-code-selection)',
})

module.exports.typography = (theme) => ({
  DEFAULT: {
    css: [
      ...DEFAULT.css,
      {
        maxWidth: 'none',
        counterReset: 'sidenote-counter',
        '[class~="lead"]': {
          fontStyle: 'italic',
          marginTop: theme('spacing.2'),
          marginBottom: theme('spacing.3'),
          fontSize: theme('fontSize.base')[0],
          ...theme('fontSize.base')[1],
        },
        section: {
          paddingTop: theme('spacing.4'),
          paddingBottom: theme('spacing.4'),
        },
        a: {
          '&::selection': {
            backgroundColor: theme('colors.gray.500'),
            color: theme('colors.white'),
            textShadow: 'none',
          },
        },
        h2: {
          fontWeight: 'normal',
          fontStyle: 'italic',
          fontSize: theme('fontSize.3xl')[0],
          ...theme('fontSize.3xl')[1],
          marginTop: theme('spacing.8'),
          marginBottom: theme('spacing.6'),
        },
        h3: {
          fontWeight: 'normal',
          fontStyle: 'italic',
          fontSize: theme('fontSize.2xl')[0],
          ...theme('fontSize.2xl')[1],
          marginTop: theme('spacing.8'),
          marginBottom: theme('spacing.6'),
        },
        // Auto-linked headings
        'h2 > a, h3 > a': {
          fontWeight: 'normal',
        },
        pre: {
          borderColor: 'var(--tw-prose-borders)',
          fontSize: theme('fontSize.xs')[0],
          ...theme('fontSize.sm')[1],
          borderWidth: '1px',
          borderStyle: 'dashed',
          overflow: 'auto',
          padding: theme('spacing.4'),
          marginTop: theme('spacing.4'),
          marginBottom: theme('spacing.4'),
          color: 'var(--tw-prose-pre-code)',
          '.highlight': {
            background: 'hsla(0, 0%, 70%, .5)',
          },

          '> code.highlight': {
            outline: '.4em solid var(--tw-prose-pre-code-highlight)',
            outlineOffset: '.4em',
          },
        },
        '.token.comment,.token.prolog,.token.doctype,.token.cdata,.token.punctuation': {
          color: 'var(--tw-prose-pre-code-comment)',
        },
        '.token.namespace': {
          opacity: 0.7,
        },
        '.token.tag,.token.operator,.token.number': {
          color: 'var(--tw-prose-pre-code-tag)',
        },
        '.token.property,.token.function': {
          color: 'var(--tw-prose-pre-code-function)',
        },
        '.token.tag-id,.token.selector,.token.atrule-id': {
          color: 'var(--tw-prose-pre-code-selector)',
        },
        '.token.attr-name': {
          color: 'var(--tw-prose-pre-code-attr-name)',
        },
        '.token.boolean,.token.string,.token.entity,.token.url,.token.attr-value,.token.keyword,.token.control,.token.directive,.token.unit,.token.statement,.token.regex,.token.at-rule':
          {
            color: 'var(--tw-prose-pre-code-keyword)',
          },
        '.token.placeholder,.token.variable': {
          color: 'var(--tw-prose-pre-code-variable)',
        },
        '.token.deleted': {
          textDecorationLine: 'line-through',
        },
        '.token.inserted': {
          borderBottom: '1px dotted var(--tw-prose-pre-code-inserted)',
          textDecoration: 'none',
        },
        '.token.italic': {
          fontStyle: 'italic',
        },
        '.token.important,.bold': {
          fontWeight: 'bold',
        },
        '.token.important': {
          color: 'var(--tw-prose-pre-code-important)',
        },
        '.token.entity': {
          cursor: 'help',
        },
        'code[class*="language-"],pre[class*="language-"]': {
          '::selection': {
            textShadow: 'none',
            background: 'var(--tw-prose-pre-code-selection)',
          },
        },
        '.rehype-code-title': {
          backgroundColor: 'var(--tw-prose-pre-bg)',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          margin: 0,
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderColor: 'var(--tw-prose-borders)',
          borderWidth: '1px',
          borderStyle: 'dashed',
          fontWeight: 'bold',
        },
        '.rehype-code-title + pre': {
          marginTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopWidth: 0,
        },
        blockquote: {
          position: 'relative',
          fontSize: theme('fontSize.sm')[0],
          ...theme('fontSize.sm')[1],
          fontStyle: 'regular',
          border: 0,
          marginTop: 0,
          marginLeft: theme('spacing.2'),
          marginBottom: theme('spacing.3'),
          marginRight: 0,
          paddingLeft: theme('spacing.3'),
          p: {
            width: '100%',
          },
          'p:first-of-type::before': {
            content: '">"',
            display: 'block',
            position: 'absolute',
            left: '-8px',
            color: 'inherit',
          },
        },
        'blockquote footer': {
          fontSize: '0.75rem',
          textAlign: 'right',
        },
        '.newthought': {
          fontVariant: 'small-caps',
          fontSize: theme('fontSize.xl')[0],
          ...theme('fontSize.xl')[1],
        },
        hr: {
          border: 0,
          borderBottom: '1px dashed',
          borderColor: 'muted',
        },
        ol: {
          position: 'relative',
          listStyle: 'none',
          marginTop: 0,
          marginBottom: theme('spacing.3'),
          padding: 0,
          marginLeft: theme('spacing.7'),
        },
        'ol > li': {
          counterIncrement: 'li',
        },
        'ol > li::before': {
          content: 'counter(li)',
          color: 'inherit',
          position: 'absolute',
          left: '-20px',
        },
        ul: {
          position: 'relative',
          listStyle: 'none',
          marginTop: 0,
          marginBottom: theme('spacing.3'),
          padding: 0,
          marginLeft: theme('spacing.7'),
        },
        'ul > li': {
          counterIncrement: 'li',
        },
        'ul > li::before': {
          content: '"*"',
          color: 'inherit',
          position: 'absolute',
          left: '-20px',
        },
        li: {
          marginBottom: theme('spacing.1'),
        },
        table: {
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: theme('spacing.3'),
          border: 'none',
        },
        'table thead': {
          border: 0,
        },
        'table thead tr th': {
          border: '1px dashed var(--tw-prose-borders)',
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          textAlign: 'center',
        },
        'table tbody tr:nth-of-type(even)': {
          backgroundColor: 'var(--tw-prose-tr-even)',
        },
        'table tbody tr': {
          border: 0,
        },
        'table tbody tr td': {
          border: '1px dashed var(--tw-prose-borders)',
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
        },
        figure: {
          maxWidth: '100%',
          marginBottom: theme('spacing.3'),
        },
        'figure > figcaption': {
          marginTop: theme('spacing.2'),
          fontSize: theme('fontSize.xs')[0],
          ...theme('fontSize.xs')[1],
          color: theme('colors.black'),
        },
        'figure.fullwidth, figure.video': {
          display: 'block',
        },
      },
    ],
  },
  'tufted-sidenotes': {
    css: {
      'p,h2,h3,h4,h5,h6,pre,blockquote': {
        width: '100%',
      },
      '.rehype-code-title': {
        width: '100%',
      },
      '.sidenote-number': {
        counterIncrement: 'sidenote-counter',
        display: 'inline-block',
        maxHeight: '2rem',
      },
      '.sidenote-number::after': {
        content: 'counter(sidenote-counter)',
        fontSize: '0.6rem',
        top: '-0.4rem',
        left: '0.15rem',
        position: 'relative',
        verticalAlign: 'baseline',
      },
      '.sidenote-definition, .marginnote-definition': {
        fontSize: theme('fontSize.xs')[0],
        ...theme('fontSize.xs')[1],
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
        content: 'counter(sidenote-counter)',
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
      figure: {
        display: 'block',
        gridTemplateColumns: '67.5% 23.5%',
        columnGap: '6.5%',
      },
      'figure > figcaption': {
        marginTop: theme('spacing.2'),
        p: {
          width: '100%',
        },
      },
      'figure.iframe': {
        display: 'block',
        gridTemplateColumns: 'initial',
        width: '100%',
        maxWidth: '100%',
      },
      'figure.fullwidth': {
        display: 'block',
        gridTemplateColumns: 'initial',
        width: '100%',
        maxWidth: '100%',
        paddingRight: 0,
      },
      'figure.fullwidth > figcaption': {
        p: {
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
          width: '100%',
        },
      },
      '.title': {
        fontSize: '2.5rem',
        marginBottom: theme('spacing.2'),
      },
    },
  },
  'tufted-sidenotes-lg': {
    css: {
      'p,h2,h3,h4,h5,h6,blockquote': {
        width: '67.5%',
      },
      'pre,.rehype-code-title': {
        width: '87.5%',
      },
      '.sidenote-definition, .marginnote-definition': {
        clear: 'right',
        display: 'block',
        float: 'right',
        left: 0,
        margin: '0.3rem -50% 0 0',
        width: '40%',
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
      table: {
        width: 'initial',
      },
      figure: {
        display: 'grid',
      },
      'figure > figcaption': {
        marginTop: 0,
      },
      'figure.video': {
        display: 'block',
        gridTemplateColumns: 'initial',
        aspectRatio: '16 / 9',
      },
      'figure.fullwidth': {
        display: 'block',
        gridTemplateColumns: 'initial',
      },
      'figure.fullwidth > figcaption, figure.video > figcaption': {
        marginTop: 0,
        p: {
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
        },
      },
    },
  },
  'tufted-bbs': {
    css: colors(theme),
  },
  'tufted-bbs-invert': {
    css: inverted(theme),
  },
})
