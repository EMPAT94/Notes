# css

## Selectors

```css
<selector > {
  <property>: <value>;
}
```

- Element Selectors `h1, body`
- ID Selectors `#id-name`
- Class Selectors `.class-name`
- Wildcard Selectors `[<attr>*="<str>"]`, `^` = starts with, `$` = ends with
- Universal Selector (type of Wildcard) `*`

## Pseudo-Classes

`<selector>:<pseudo-class> {...}`

- hover
- visited
- checked
- first-child
- last-child
- nth-child - `<selector>:nth-child(<n> | even | odd)`

## Pesudo-Elements

`<selector>::<pseudo-element> {...}`

- first-letter
- first-line
- before, after
  - `{ content: "some content to add without changing html" }`

## Combinators

`<selector> <combinator> <selector2> {...}`

- direct child `>`
- all descendants `<literal space>`
- adjacent siblings `+`
- general siblings (all) `~`

## More on Wildcard Selectors

- To select all classes containing `str` in name:

  ```css
  [class*="str"] ...
  ```

- To select all classes that start with `strt` or end with `end` use:

  ```css
  [class^="strt"] ...
  [class$="end"] ...
  ```

## Tips

- To center image: `margin: 0 auto`

- To center text: `text-align: center`

- Group duplicates: `h1, h2, .header-class, #header-id { ... }`

## Sizing Units

- Absolute units: px, pt, cm, mm, in

- Relative units: em, rem, vw, vh, %

- Standard html size is around 16px

- Use relative units for responsive UI

## Colors

- Build-in names `white`, `blue`, `black`, `red`
- RGB(A) (Red, Blue, Green, Alpha) `rgb(x, y, z)`
- Hexadecimal `#000000` -> `#FFFFFF` #RRBBGG
- HSL (Hue, Saturation%, Lightness%)

- [Adobe Color Wheel](https://www.color.adobe.com/create/color-wheel)

## Typography

- font-family
- font-weight
- text-align
- text-shadow
- text-transform
- text-indent
- line-height
- letter-spacing
- word-spacing
- white-space
- background-color (not specific to typography)