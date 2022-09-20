# Java

- [Official Site](https://www.java.com/en/)

- [Official Docs](https://docs.oracle.com/en/java/javase/18/)

- [Official Tutorial](https://docs.oracle.com/javase/tutorial/)

- [Dev.java tutorial/docs beginner](https://dev.java/learn/)

- [Central Connecticut State University: Introduction to Computer Science using Java](https://chortle.ccsu.edu/Java5/index.html)

## Notes

### Data types

> 8 primitive types in total

- Integer numbers (1, 2, -5)

  - byte 1B
  - short 2B
  - int 4B
  - long 8B

- Real numbers (1.2, 0.53)

  - float 4B
  - double 8B

- char ('a', 'x') 4B

- boolean (true, false) 1B (only 1 bit is actually used)

> Below types are not primitive

- String, Arrays, Classes, Objects, Interfaces ...

### Variables

- Syntax: `<modifier> <type> <name> = <expression>;`

- Example: `int x = 1;`

- Rules:

  - Starts with a letter or underscore
  - Does not contain punctuations
  - Is not a keyword
  - Is not more than 42 chars

- Conventions:

  - Use camelCase for variables and functions
  - Use TitleCase for classes and interfaces
  - Use ALL_CAPS for constants

- use modifier `final` for constants

### Operators

- Arithmetic `+` `-` `/` `*` `%`

- Logical `&&` `||` `!`

- Bitwise `<<` `>>` `&` `|`

- Comparison `==` `<` `>` `<=` `>=` `!=`

- Other Operators `+` `++` `-` `--` `=`

> some operators (like `+`) are overloaded depending on the operads and position

### Printing

- Normal string output to screen: `System.out.print[ln]("...")`

- Formatted string: `System.out.printf("%-,a.bx\n", args, args);`

  - % = format specifier
  - \- = left align
  - , = Thousands separator for numbers
  - a = spaces before
  - .b = spaces after
  - x = s(String)/d(Int)/f(Float)/c(Char)

## User Input (Scanner Class)

```java
import java.util.Scanner;

//...

Scanner ip = new Scanner(System.in);
System.out.print("Enter something: ");
<type> someVar = ip.next[Int | Float | Double | ...]();

// For Strings it is simply "next" not "nextString"

//...

input.close();
```

### Type casting

- integers => 7 / 3 = 2

- real => 7.0 / 3 = 2.333...

- real variable for int expression => double x = 7 / 3 => x = 2.0
