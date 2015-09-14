[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

`rxMetadata` contains directives to provide consistent styling for the display of metadata information.

## Organizing into Columns

It is highly recommended that you make use of `<section>` elements to separate metadata information into columns.

The `<section>` elements will be set to a fixed width and will wrap/stack if the container cannot fit all columns in a single row. *You can resize this page to see how the columns wrap.*

## Long Data Values

For data values that don't naturally break to fit the width of the column, a `.force-word-break` CSS class is available on the `<rx-meta>` element to prevent the value from overflowing to adjacent content.
See "Super Long Value" metadata below.
