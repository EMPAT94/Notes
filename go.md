# Go

- [Official Site](https://golang.org)

- [Official Learning Resource](https://go.dev/learn/)

- [Go101: Beginners' Book](https://go101.org/)

- [Golang Tutorial: YouTube video tutorial](https://www.youtube.com/watch?v=YzLrWHZa-Kc)

## Notes

### From "A tour of Go"

| module > package > functions

- Starting a go project:
  - Make a project dir: `mkdir project_dir`
  - Make a src dir: `mkdir package_name` (This will be the name of final executable)
  - Initialize go modules: `go mod init project_dir/package_name`

### From LinkedIn Learning "Learning Go" tutorial

- Go has 3 things (from OOP perspective):

  1. Type - Definition of a thing
  2. Struct - Data of a thing
  3. Interface - Behavior of a thing

  Everything in Go has a type, every type has an interface.

- Go _doesn't_ have these:

  1. No (type) inheritance (Also, no classes/objects, duh)
  2. No overloading
  3. No "structured" exception handling (try/catch/finally)
  4. No implicit casting

- Case-sensitive syntax; If first letter of symbol is Uppercase, then it is publicly available (exported)

- Builtin functions: [golang.org/pkg/builtin](https://golang.org/pkg/builtin)

- Types:

  - Everything has a type
  - Some built-in data types: `bool` `string` `[u]int(8 | 16 | 32 | 64)` `float(32 | 64)` `complex(64 | 128)`
  - Some built-in data type aliases: `[u]int` = `[u]int(32 | 64)` `byte` `uintptr`
  - Some built-in collection types: Arrays, Slices, Maps, Structs
  - Some built-in language types: Functions, Interfaces, Channels, Pointers
  - Use printf's `%T` to find type of something
  - Note that strings are in double quotes `""` and _characters_ (int32 | byte) in single `''` like Java

- Variables:

  - Declaration: `var <name> <type>`; Example: `var someString string`
  - Initialization: `<name> = <value>`; Example: `someString = "this is a string"`
  - Shortcut: `<name> := <value>`; Example: `anotherStr = "this is another string"`
    - Shortcut only works inside functions.

- Constants:

  - Definition: `const <name> <type> = <value>`
  - Cannot be reassigned

- IO:

  - User input from console:

    ```go
    ip := bufio.NewReader(os.Stdin)
    fmt.Print("Enter something: ")
    name, _ := ip.ReadString('\n')
    fmt.Println("You entered: ", name)
    ```

- Math:

  -
