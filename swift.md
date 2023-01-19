# Swift

- [Official Site](https://www.swift.org)

- [Official Docs](https://www.swift.org/documentation/)

## Notes

- Print to console: `print("Hello, World!")`

- Datatypes

  - `Int`: 1, 2, ...
  - `Float`: 1.1, 1.2 ...
  - `Double`: 1.1, 1.2 ...
  - `Boolean`: true, false
  - `String`: "a", "ABC", ...
  - Find type: `type(of: <value>)`
  - Type-cast: `<type>(<value>)`

- Variables and Constants

  - Variable definition
    - `var <name> [: <type>] = <value>`
    - `var someNum = 10`
  - Constant definition
    - `let <name> [: <type>] = <value>`
    - `let someNum = 10`
  - `_` is "don't care"

- Operators

  - Equals: `==`
  - Not equals: `!=`

- Strings

  - Values, not references!
  - Literal: `let literalStr = "This is a literal string!"`
  - Initializer: `let initializerStr = String("This is an initialized string!")`
  - Multiline: `""" ... [\] ... """`
  - Interpolation: `"Variable interpolated: \(<expression>)"`
  - Unicode: `"Unicode: \u{xxxx}"`
  - Utilities: `<strName>.uppercased()` `<strName>.lowercased()` `<strName>.count()`

- Collections

  - `let` | `var` rules follow!
  - Array
    - Index starts at 0
    - Definition: `let arr = Array<<type>>()` `let arr: [<type>] = []`
    - Utilities: `<arrName>.count` `<arrName>.append(<val>)` `<arrName>.remove(at: [Int])`
  - Set
    - Definition: `let set = Set<<type>>()` `let set: Set[<type>] = []`
    - Utilities: `<setName>.count` `<setName>.insert(<val>)`
  - Dictionary
    - Definition: `let dict = Dictionary<<keyType>, <valType>>()` `let dict: [<keyType>: <valType>] = [:]` Note the colon here for empty
    - Utilities: `<dictName>[<key>] [  = <value> ]` `let original = <dictName>.updateValue(...)`

- Loops

  - Iterating an array values: `for <name> in <Array> { ... }`
  - Iterating an array values and index: `for (<name>, <idx>) in <Array>.enumerated() { ... }`
  - Iterating a dict keys and values: `for (<key>, <value>) in <dictName> { ... }`
  - Iterate over a range from x to inclusive y: `for <name> in x...y { ... }`
  - Iterate over a range from x to exclusive y: `for <name> in x..<y { ... }`
  - `while <condition> { ... }`
  - `repeat { ... } while <condition>`

- Optionals

  - Values that can be nil
  - Definition: `var nullableSomething: <type>?` Note the `?`
  - Unwrapping:
    - Force: `<optionalName>!` Note the `!`, use with caution
    - If: `if <optionalName> != nil { ... }`
    - Optional Binding: `if let <optionalName> = <optionalName> { ... }`
    - Null Coalesce: `<optionalName> ?? <defaultValue>`

- Functions

  - Definition:

    ```swift
    // Syntax:
    // fun <name>([<labelName>] <paramName>: <type>) [-> <type>] { ... }

    // Example 1
    func printHello() {
      print("Hello")
    }

    // Example 2
    func addTwoNumbers(numOne: Int, numTwo: Int) -> Int {
      numOne + numTwo
    }
    // addTwoNumbers(numOne: 1, numTwo: 2)

    // Example 3
    func addTwoNumbersWithDifferentNames(a numOne: Int, b numTwo: Int) -> Int {
      numOne + numTwo
    }
    // addTwoNumbersWithDifferentNames(a: 1, b: 2)
    // NOTE: Labels cannot be used inside function body

    // Example 4
    func addTwoNumbersWithDefaultParam(_ numOne: Int, b numTwo: Int) -> Int {
      numOne + numTwo
    }
    // addTwoNumbersWithDefaultParam(1, b: 2)

    // NOTE: "return" keyword is not required for single line body
    ```

- Tips

  - Get a random Int in range of x and y: `Int.random(in: x...y)`
