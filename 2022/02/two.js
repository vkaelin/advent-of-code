import { open } from 'node:fs/promises';

const fh = await open(new URL('./input.txt', import.meta.url));

function mod(n, m) {
  return ((n % m) + m) % m;
}

const POINTS = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};
const modToPoints = [POINTS.DRAW, POINTS.WIN, POINTS.LOSE];

const ROCK = 1,
  PAPER = 2,
  SCISSORS = 3;
const possibilities = [ROCK, PAPER, SCISSORS];

const getValue = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: POINTS.LOSE,
  Y: POINTS.DRAW,
  Z: POINTS.WIN,
};

let score = 0;

for await (const line of fh.readLines()) {
  const [opponent, result] = line.split(' ');
  const intOpponent = getValue[opponent];
  const intResult = getValue[result];

  for (const play of possibilities) {
    const potential = mod(play - intOpponent, 3);
    if (modToPoints[potential] === intResult) {
      score += intResult + play;
      break;
    }
  }
}

console.log(score);
