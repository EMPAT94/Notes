# Nodejs

- Nodejs code to stream in a file one line at a times: [Source code](./stream-file.js)

## Websocket

- low-level interface is net.Socket as an point for tcp connection

## Quick Server

```js
require("http")
  .createServer((req, res) => {
    console.log(req.method + ": " + req.url);
    res.end("OK");
  })
  .listen(8080);
```
