# Clojure

## Resources

- [Official Site](https://clojure.org/index)

- [Clojure for the Brave and True:](https://www.braveclojure.com/)

- [Clojure Resources #1](https://clojuredocs.org/)
- [Clojure Resources #2](https://clojure-doc.org/)

- [Clojure by example](https://kimh.github.io/clojure-by-example/#about-this-page)

- [Clojurescript Koans](http://clojurescriptkoans.com/)

- [Exercism Track: Guided Tutorials](https://exercism.org/tracks/clojure)

## Notes (from braveclojure)

### Syntax

> (operator operand1 operand2 ... operandn)

NOTE: The above expression is called a "form" (it is common to all Lisps)

OPINION: Should just call 'em expressions and be done with it

### Data Types

- `nil`
- Booleans: `true`, `false`
- Numbers: integers `1`, floats `1.2`, ratios `1/2`
- Strings: `"only double quotes work"`
- Regex: `#"regular-expression-here"`
- Keywords: `:colon-prefixed-symbols`
  - Very fast lookup, so used as keys and params

### Data Structures

- Maps: `{:keyword-keys "value can be anything"}`

  - Get: `(get {:key "value"} :key)` => Lookup by key
  - Get-in: `(get-in {:a {:b "value"}} [:a :b])` => Nested
  - `(:key {:key "value"})` == `({:key "value"} :key)` == `"value"`

- Vectors (Arrays): `[1 2 3 "anything" :goes]`

  - Get: `(get [1 2 3] 0)` => Lookup by index
  - Add: `(conj [1 2 3] 4)` => Adds to **end** of vector

- Lists (Linked Lists): `'(1 2 3 "anything" :goes)`

  - Get: `(nth '(1 2 3) 0)` => Lookup by iterating
  - Add: `(conj '(1 2 3) 4)` => Adds to **start** of list

- Sets: `#{"some" :values 1 1/4}`

  - Add: `(conj #{:a :b} :c)`
  - Contains: `(contains? #{1 2 3} 2)` => Check inclusion, returns true/false
  - Can use Map-like `get` and `:key` lookup too

### Operators

> `(are_forms? x y z)` => `true`

- Equality: `(= x y)`
- Logical:
  - `(or x y)` => First truthy or first false/nil
  - `(and x y)` => First false/nil or last truthy
- Scope: `(do x y z)`

### Bindings

> `def` is all where all bindings start

- `(def const "value")` => symbol `const` is now bound to `"value"`

- `(defn fun-name "document string" [param & rest] (print "This is some form") {:last-form "returned"}) `

  - Functions can be "arity overloaded"
  - Function parameters can be "destructured"

- `(fn [arg] (print arg))` == `#(print %)` ==> anon fn

### Conditionals

- `(if <cond> <then> <else>)` => all things inside `<>` are individual forms

  - If no `else` then returns `nil` on `false`

- `(when <cond> <form1> <form2> <form3>)`

  - A combination of `if` and `do`

### Loops

- `(loop TODO)`
