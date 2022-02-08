# Nodejs

- Node make a dynamic chain of promises

Use

```
arr.reduce((c, d) => c.then(() => fn(d)), Promise.resolve()).catch(error);
```

to convert

```
const arr = [d1, d2, d3, ..., dn];

function fn(d) {
  return new Promise((res, rej) => { ...; res() });
}
```

into

```
Promise.resolve().then(() => fn(d1)).then(() => fn(d2)).then(() => fn(d3))...then(() => fn(dn)).catch(error)
```

- Get integer part of a fraction

```
let fraction = 1.234;
let intPart = ~~fraction; // 1
```

- Nodejs code to stream in a file one line at a times

[Source code](./stream-file.js)
