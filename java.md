# Java

- [Official Site](https://www.java.com/en/)

- [Official Docs Java 19](https://docs.oracle.com/en/java/javase/19/)

- [Official Docs Java 18](https://docs.oracle.com/en/java/javase/18/)

- [Official Tutorial](https://docs.oracle.com/javase/tutorial/)

- [Dev.java tutorial/docs beginner](https://dev.java/learn/)

- [Central Connecticut State University: Introduction to Computer Science using Java](https://chortle.ccsu.edu/Java5/index.html)

- [Java Programming for Beginners – Full Course: youtube video from freecodecamp.org](https://www.youtube.com/watch?v=A74TOX803D0)

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

- Bitwise `<<` `>>` `&` `~` = complement `|` = inclusive OR `^` = exclusive OR

- Comparison `==` `<` `>` `<=` `>=` `!=`

- Other Operators `+` `++` `-` `--` `=` and so on.

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

Scanner ip = new Scanner(System.in);

System.out.print("Enter something: ");
String something = ip.nextLine();
System.out.println("Something is " + something);

// <type> someVar = ip.next[Int | Float | Double | ...]();
// For next word use "next" (space terminates)
// For next line use "nextLine" (newline/enter terminates)
// Careful when using nextLine _after_ other next* as they leave newline in buffer

input.close();
```

### Type casting gotchas

- integers => 7 / 3 = 2

- real => 7.0 / 3 = 2.333...

- Addition of precision results in implicit casting (like assigning an int value to a double var)

- Loss of precision results in compiler error (like assigning a double value to an int var)

  - Explicit casting is required to ignore errors: `int x = (int) 1.0;`

- real variable for int expression => double x = 7 / 3 => x = 2.0

- System.out.println(3 + 2 + 1 + "") => 6

- System.out.println("" + 3 + 2 + 1) => 321

### Conditionals (Branching | Selection)

- if else

  Syntax:

  ```
  if (<expression>) {}
  else if (<xepression>) {}
  else {}
  ```

  Example:

  ```java
  int num = 9;

  if (num % 2 == 0) System.out.println("Number is even.");
  else System.out.print("Number is odd.");
  ```

- switch case

### Loops

- for

- while

### Classes & Objects

```java
/*

Syntax:

<modifier> class <class_name> extends <another_class> implements <interfaces> {

    // fields
    <modifier> <type> <var_name>;

    // constructor
    <modifier> <class_name>(<type> <var>) {
      <var_name> = <var>;
    }

    // methods
    <modifier> <type> <fn_name>(<params>) {
        ...
    }
}

modifier = public, private, protected, static etc

constructor is optional and can be overloaded like methods

*/

// Example Public Bike Class

public class Bike {

  static int numWheels = 2;
  int fuelTank = 12; // Ltr

  public Bike(int fuelTankInLtr) {
    fuelTank = fuelTankInLtr;
  }
}

// Creating a new Bike Object

Bike b = new Bike(18);

```
