# Title Skip for Initial Heading

Introductory text without heading will add a hidden h2 added. This allows for a
consistent TOC. Consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut `inline code` et dolore magna aliqua. Vestibulum rhoncus est pellentesque
elit. Cras sed felis eget velit. Accumsan in nisl nisi scelerisque eu.

This YouTube directive will be upgraded to a figure-wrapped iframe.

::youtube[TOTINO BOY!!]{#2lPX5b9m7ro}

Vivamus at augue eget arcu dictum varius. In cursus turpis massa tincidunt dui
ut. Tincidunt ornare massa eget egestas purus viverra. Ultricies tristique
nulla aliquet enim tortor at auctor urna nunc. Nec ullamcorper sit amet risus
nullam. Morbi tempus iaculis urna id. Sed turpis tincidunt id aliquet risus
feugiat in ante metus.[^1] Integer vitae justo eget magna fermentum iaculis.
Libero enim sed faucibus turpis. Ut placerat orci nulla pellentesque dignissim
enim sit amet. In eu mi bibendum neque. Blandit massa enim nec dui nunc.
Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Imperdiet
proin fermentum leo vel orci porta non. Suspendisse in est ante in nibh. Eget
sit amet tellus cras adipiscing enim.

[^1]: [Referenced Footnote To Sidenote](https://www.google.com)

## Heading Starts Section

### Subheading No Section

You can create explicit figures. This allows for optional classes, like
`.fullwidth`. It also makes it easy to include a `figcaption`.

:::figure{.fullwidth}

![Directive wrapped figure](https://picsum.photos/200/300)

Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Egestas
purus viverra accumsan in nisl nisi scelerisque. Eu mi bibendum neque egestas
congue.

:::

Figure content and caption text can also be flipped. And, a figure can describe
a YouTube video.

:::figure{.fullwidth}

Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Egestas
purus viverra accumsan in nisl nisi scelerisque. Eu mi bibendum neque egestas
congue.

::youtube[Pizza Pizza]{#2lPX5b9m7ro}

:::

## Sidenotes

Diam phasellus vestibulum lorem sed risus ultricies tristique. Arcu odio ut sem
nulla pharetra diam sit amet. At augue eget arcu dictum. Viverra ipsum nunc
aliquet bibendum enim.[^margin] Magna eget est lorem ipsum dolor. Malesuada nunc vel
risus commodo viverra maecenas accumsan lacus. Tellus orci ac auctor augue
mauris. Lorem ipsum dolor sit amet consectetur. Viverra aliquet eget sit amet
tellus cras adipiscing enim. Amet justo donec enim diam vulputate ut pharetra
sit. Accumsan sit amet nulla facilisi morbi tempus iaculis urna. Eu nisl nunc
mi ipsum faucibus vitae aliquet nec. Quam nulla porttitor massa id neque
aliquam vestibulum morbi. Leo vel orci porta non pulvinar neque. In mollis
nunc sed id semper risus. Massa tempor nec feugiat nisl pretium fusce id velit
ut. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Turpis
tincidunt id aliquet risus. Faucibus scelerisque eleifend donec pretium
vulputate sapien nec. Turpis in eu mi bibendum neque egestas congue.

[^margin]:
    ![Image in a marginnote](./local-image.png) At urna condimentum mattis
    pellentesque id nibh. Nulla facilisi nullam vehicula ipsum a. Diam quam
    nulla porttitor massa id neque aliquam vestibulum.

![Standalone image gets wrapped in figure](./local-image.png)

Amet mauris commodo quis imperdiet massa tincidunt. Adipiscing elit ut aliquam
purus sit amet luctus venenatis. Odio tempor orci dapibus ultrices in iaculis
nunc sed. Viverra maecenas accumsan lacus vel facilisis volutpat. Nunc id
cursus metus aliquam eleifend mi in nulla posuere. Vitae tempus quam
pellentesque nec. Enim neque volutpat ac tincidunt vitae semper quis.
Sit amet luctus venenatis lectus magna fringilla.

> This blockquote has a footer that contains a footnote citation. Tellus rutrum
> tellus pellentesque eu tincidunt tortor. Tincidunt id aliquet risus feugiat
> in. Elementum integer enim neque volutpat ac tincidunt vitae.
>
> ::footer[[Marcus Tullius Cicero, reddit, 'How To Fill Text' subreddit][quote-cite]]

[quote-cite]: https://www.reddit.com/r/AskHistorians/comments/1l2jge/how_significant_was_cicero_in_the_events_that_led/

:newthought[Rhoncus urna neque] viverra justo. Sed id semper risus in hendrerit
gravida. Diam vel quam elementum pulvinar etiam. Lacus sed turpis tincidunt id
aliquet risus feugiat in ante. Dui vivamus arcu felis bibendum ut tristique et
egestas. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula
ullamcorper. Feugiat vivamus at augue eget. Amet purus gravida quis blandit
turpis cursus in. Fermentum leo vel orci porta non pulvinar neque laoreet.

## Code

Code blocks support titles. Titles are typically filenames, and they cannot
contain spaces.

```js
function randomCode(bar) {
  var a = 42;
  var b = 'Prism';
  return a + bar(b);
}
```

## Epigraphs

> We get wrapped in an epigraph tag. Vel pharetra vel turpis nunc eget lorem
> dolor sed. Ac odio tempor orci dapibus. Ac odio tempor orci dapibus ultrices
> in iaculis.
>
> ::footer[Marc Cicero, "De finibus bonorum et malorum"^[^footer]]

> Amet consectetur adipiscing elit duis tristique sollicitudin nibh. Luctus
> accumsan tortor posuere ac ut consequat semper. Est ante in nibh mauris
> cursus mattis molestie a.
>
> ::footer[Marc Cicero, :cite["Using Default Remark Directive Citation"]]

Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Amet est
placerat in egestas erat imperdiet. Volutpat consequat mauris nunc congue nisi
vitae suscipit tellus. Viverra maecenas accumsan lacus vel facilisis volutpat
est. Augue ut lectus arcu bibendum at varius. Ut pharetra sit amet aliquam id
diam maecenas ultricies.

[^footer]: An inline note in the blockquote footer
    
## Tables

Table processing in `remark-gfm`. Enim tortor at auctor urna nunc id cursus.
Sit amet commodo nulla facilisi. Laoreet non curabitur gravida arcu ac tortor
dignissim. Elementum tempus egestas sed sed risus pretium quam vulputate
dignissim. Tortor aliquam nulla facilisi cras fermentum.

Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|)
are optional, and you don't need to make the raw Markdown line up prettily. You
can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

## Lists

Quam id leo in vitae turpis massa sed. Sagittis id consectetur purus ut
faucibus pulvinar elementum. Magna etiam tempor orci eu lobortis elementum.

An unordered list:

- Quam
- lacus
- suspendisse
- faucibus

An ordered list:

1. Eget
2. magna
3. fermentum
4. iaculis
