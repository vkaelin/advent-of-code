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

async function getGroups() {
  const groups = [];
  let group = [];
  for await (const line of fh.readLines()) {
    group.push(line);

    if (group.length === 3) {
      groups.push(group);
      group = [];
    }
  }
  return groups;
}

const groups = await getGroups();

groups.map((group) => {
  const firstSet = new Set(group[0]);
  const secondSet = new Set(group[1]);
  const thirsSet = new Set(group[2]);

  for (const char of firstSet) {
    if (secondSet.has(char) && thirsSet.has(char)) {
      sum += getPrio(char);
    }
  }
});

console.log(sum);
