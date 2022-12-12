import { open } from 'node:fs/promises';

const fh = await open(new URL('./input.txt', import.meta.url));

const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const ACode = 'A'.charCodeAt(0);
const ZCode = 'Z'.charCodeAt(0);

function getPrio(char) {
  const code = char.charCodeAt(0);
  if (code > ZCode) {
    return code - aCode + 1;
  }
  return code - ACode + 27;
}

let sum = 0;

for await (const line of fh.readLines()) {
  const first = line.slice(0, line.length / 2);
  const second = line.slice(line.length / 2);

  const firstSet = new Set(first);
  for (const char of second) {
    if (firstSet.has(char)) {
      sum += getPrio(char);
      break;
    }
  }
}

console.log(sum);
