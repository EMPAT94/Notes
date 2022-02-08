/* This module describes how to stream a file line by line */

// A read stream that streams in chunks of a file
const { createReadStream } = require("fs");
const large_file_stream = createReadStream("./large-data-file", {
  encoding: "utf-8", // set null (or remove key) for raw buffer
  highWaterMark: 1024, // bytes to read in chunk
});

// A generator that takes in chunks and yields lines
async function* getLine(readStream) {
  let prev = "";

  for await (const chunk of readStream) {
    prev += chunk;
    let eol = -1;

    while ((eol = prev.indexOf("\n")) >= 0) {
      yield prev.slice(0, eol);
      prev = prev.slice(eol + 1);
    }
  }

  if (prev) yield prev;
}

// A function that processes a line
async function processNextLine(line) {}

// A function that creates a line iterator and passes for processing
(async function main() {
  const lineItr = getLine(large_file_stream);

  while (true) {
    const { value, done } = await lineItr.next();
    if (done) break;
    processNextLine(value);
  }
})();
