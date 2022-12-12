import { open } from 'node:fs/promises';

const fh = await open(new URL('./input.txt', import.meta.url));

let current = 0;
const totals = [];

for await (const line of fh.readLines()) {
  if (line === '') {
    totals.push(current);
    current = 0;
  } else {
    current += parseInt(line);
  }
}

const result = totals
  .sort((a, b) => b - a)
  .splice(0, 3)
  .reduce((a, b) => a + b, 0);

console.log(result);
