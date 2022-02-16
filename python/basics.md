# Basics

> `expr in python` = `expr in javascript`

- Basics

  - Strong and dynamic typing
  - Interpreted but can also by compiled
  - Object oriented but can use functional style
  - Scope by indentation (no brackets and semicolons)

  - Comments start with `#`
  - Numbers are `int` and `float` for a start; also `Decimal`, `Fractions` et al.
  - Normal math operators work infix like javascript, `//` gives quotient integer
  - Strong typing does not interfere with `int` and `float` operations
  - `True | False | None` = `true | false | null`

  - Strings:

    - Immutable
    - Basic string quote stuff same as javascript
    - Add `r` before string to disable interpretation of special chars
    - Triple quotes for multiline strings
    - Repeat strings with multiplication `3 * 'Hi'`
    - Slice: `str[x:y]` = `str.slice(x,y)`
    - Length: `len(str)` = `str.length`

  - Lists (aka Arrays):

    - Mutable
    - May contain many type items
    - Slice, length, concat work same as Strings (Or rather both are _Sequences_)
    - Append: `ls.append(2)` = `ls.push(2)`
    - Splice: `ls[0:2] = [9, 10]` = `ls.splice(0, 2, 9, 10)`
    - Clear: `ls[:] = []` = `ls.length = 0`

  - Multiple assignments:

    - # variables LHS mapped to values from RHS `a, b = 1, 3`

  - While loop:

    ```python
    while <expr>:
      stmt
    ```

  - For loop:

    ```python
    for x in xs:
      stmt
    ```

    - xs can be a `range(n)`; n is excluded; range returns iterable

    - xs can be a _Sequence_ (like String or List) or _Collection_ (like Dict)

  - Truthy values same as js, comparators same too

  - `break` and `continue` same as js

  - Loops have `else`; runs when iteration exhausted (not on break)

  - If condition:

    ```python
    if <expr>:
      stmt
    elif <expr>:
      stmt
    else:
      stmt
    ```

  - Match (switch) conditional:

    ```python
    match <var>:
      case <pattern> | <another pattern>:
        stmt
      case _:
        default stmt
    ```

    - Can destructure `var` in `pattern`
    - Can do assignment in `pattern`
    - `[x, y, *rest]` results in x = first, y = seconds and rest = remaining
    - Can assign subpatterns using `as`: `case (Class1(x) as c)`

  - Functions:

    ```python
    def <name>(<args?>):
      stmt
      <return?>
    ```

    - if no return, gives back `None` (similar to `undefined` in js)
    - default args `arg = default` same as js parameters
    - IMPORTANT: scope and defaults work differently than javascript!
    - can pass arguments by assigning to parameter by name (keyword args)
    - has keywords `/` and `*` to pass arguments by keyword or position
      - `def f(pos-only, /, pos or key, *, key-only)`
    - `*tuple` and `**dict` can be used (in that order) to collect args at the end
    - _Inside_ the function body, `*` and `**` can be used in reverse
    - Lambda: `lambda x: x + 2` = `x => x + 2`
    - Docstrings: `""" Describes function in a line. """` add just after `def` line
    - Annotations: Like ts for js; `def f(arg1: <type> = default) -> <type>:`

