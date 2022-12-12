import { open } from 'node:fs/promises';

const fh = await open(new URL('./input.txt', import.meta.url));

function mod(n, m) {
  return ((n % m) + m) % m;
}

// Draw, win, lose
const POINTS = [3, 6, 0];

const ROCK = 1,
  PAPER = 2,
  SCISSORS = 3;

const getValue = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

let score = 0;

for await (const line of fh.readLines()) {
  const [opponent, play] = line.split(' ');
  const result = mod(getValue[play] - getValue[opponent], 3);
  score += POINTS[result] + getValue[play];
}

console.log(score);
