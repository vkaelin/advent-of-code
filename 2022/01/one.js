import { open } from 'node:fs/promises';

const fh = await open(new URL('./input.txt', import.meta.url));

let current = 0;
let max = 0;

for await (const line of fh.readLines()) {
  if (line === '') {
    max = Math.max(current, max);
    current = 0;
  } else {
    current += parseInt(line);
  }
}

console.log(Math.max(current, max));
