# Javascript

- [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/javascript)

- [Comprehensive Tutorial](https://javascript.info/)

- [A good breakdown of function terminology](https://dev.to/aaron_powell/named-function-vs-variable-function-11m0)

- [Microsoft Developer Javascript Resources](https://developer.microsoft.com/en-us/javascript/)

## Notes

### Variables

- Declaration:
  - var: Function Scope (hoised), Variable, Redeclarable
  - let: block scope, Variable, Not Redeclarable
  - const: block scope, Constant, Not Redeclarable

### Comments

- Single line Comments: `//`

- Multi-line Comments: `/* ... */`

### Functions

- Standard Function

```js
// Syntax:
// function <fn_name>(<args_list>) { <body> }

// Example function that adds two values
function add(a, b) {
  return a + b;
}
```

- Arrow Functions

```javascript

[const | let | var] <fn_name> = (<args_list>) => { <body> };

// Parentheses around body are optional. When ommited, returns the evaluated value by default
// The same "add" function above can be written as:

const add = (a, b) => a + b;

// Arrow functions (or lambda expressions) do not have their own scope (this),
// they borrow it from their parent scope. Useful as anon functions.
```

- Anonymous Functions

```javascript
// Functions with no "name"
// All arrow functions are anonymous

// Example:
function (a, b) { return (a + b); }

// Since function has no name, it must be assigned to a variable to be called.
const add = function (a, b) { return (a + b); }
```

- IIFE (Immediately Invoked Function Expression)

### Promises

### Classes & Objects

## Tips

- Make a dynamic chain of promises

  Use

  ```js
  arr.reduce((c, d) => c.then(() => fn(d)), Promise.resolve()).catch(error);
  ```

  to convert

  ```js
  const arr = [d1, d2, d3, ..., dn];

  function fn(d) {
    return new Promise((res, rej) => { ...; res() });
  }
  ```

  into

  ```js
  Promise.resolve().then(() => fn(d1)).then(() => fn(d2)).then(() => fn(d3))...then(() => fn(dn)).catch(error)
  ```

  - In newer versions:

    ```js
    for (const d of arr) {
      await fn(d);
    }
    ```

- Get integer part of a fraction

  ```js
  let fraction = 1.234;
  let intPart = ~~fraction; // 1
  ```

- Arrays, Iterables and Array-Likes

  - Iterables have a [Symbol.iterator] function; can use used in `for-of` loop
    - Generator functions can be iterable
  - Array-likes have numberical indexes and a length key
    - HTML nodes are array-like
  - Iterables can be (or not be) array-like and vice versa
  - Arrays are instance of Array and have Array functions like `pop`, `push` etc
  - Arrays can be constructed from either of above using `Array.from`
