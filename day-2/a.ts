import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  let safe = 0;
  outer: for (const datum of data) {
    const values = datum.split(/\s+/g).map((value) => parseInt(value, 10));
    const unsafeDirection =
      values[0] - values[1] < 0 ? (a, b) => a - b > 0 : (a, b) => a - b < 0;
    for (let i = 1; i < values.length; i++) {
      const [a, b] = values.slice(i - 1, i + 1);
      if (a === b) {
        continue outer;
      }

      if (unsafeDirection(a, b)) {
        continue outer;
      }

      if (Math.abs(a - b) > 3) {
        continue outer;
      }
    }

    safe++;
  }

  return safe;
}

await runSolution(day2a);
