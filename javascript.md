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
