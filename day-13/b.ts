import { runSolution } from '../utils.ts';

const OFFSET = 10_000_000_000_000;
const TOLERANCE = 0.001;

/** provide your solution as the return of this function */
export async function day13b(data: string[]) {
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    const [a, b, prize] = data.slice(i, i + 3);

    const aX = parseInt(/X\+(\d+)/g.exec(a)[1], 10);
    const aY = parseInt(/Y\+(\d+)/g.exec(a)[1], 10);

    const bX = parseInt(/X\+(\d+)/g.exec(b)[1], 10);
    const bY = parseInt(/Y\+(\d+)/g.exec(b)[1], 10);

    const prizeX = parseInt(/X=(\d+)/g.exec(prize)[1], 10) + OFFSET;
    const prizeY = parseInt(/Y=(\d+)/g.exec(prize)[1], 10) + OFFSET;

    const denominator = bX * aY - bY * aX;
    if (denominator === 0) {
      continue;
    }

    const A = (bX * prizeY - bY * prizeX) / denominator;
    const B = (prizeX - aX * A) / bX;

    if (
      Math.abs(A - Math.round(A)) < TOLERANCE &&
      Math.abs(B - Math.round(B)) < TOLERANCE
    ) {
      total += 3 * Math.round(A) + Math.round(B);
    }
  }

  return total;
}

await runSolution(day13b);
