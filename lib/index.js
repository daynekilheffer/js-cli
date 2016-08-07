const fs = require('fs');
const path = require('path');
const readline = require('readline');

const opts = require('./opts-reader');

const debugFn = require('./debugger')(opts);

debugFn('options:', opts);

let fn;

if (opts.file && opts.command) {
  let err = Error('`file` and `command` cannot both be used');
  throw err;
}

if (opts.file) {
  if (!fs.existsSync(opts.file)) {
    let err = Error(`Unable to locate runnable file: ${opts.file}`);
    throw err;
  }
  const absFile = path.resolve(opts.file);
  debugFn('file:', absFile);
  fn = require(absFile);
} else {
  fn = Function('line', opts.command);
}

const lineReader = readline.createInterface({
  input: process.stdin
});

process.stdout.on('error', (err) => {
  if (err.code === 'EPIPE') {
    process.exit(0);
  }
});

lineReader.on('line', (line) => {
  const result = fn(line);
  debugFn('result:', result);
  if (typeof result !== 'undefined') {
    console.log(result);
  }
});
