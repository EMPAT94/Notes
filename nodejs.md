# Nodejs

- Node make a dynamic chain of promises

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

- Nodejs code to stream in a file one line at a times: [Source code](./stream-file.js)

## Websocket

- low-level interface is net.Socket as an point for tcp connection
