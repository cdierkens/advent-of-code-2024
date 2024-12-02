import { runSolution } from '../utils.ts';

function checkSafe(values: number[]) {
  const unsafeDirection =
    values[0] - values[1] < 0 ? (a, b) => a - b > 0 : (a, b) => a - b < 0;

  for (let i = 1; i < values.length; i++) {
    const [a, b] = values.slice(i - 1, i + 1);
    if (a === b) {
      return false;
    }

    if (unsafeDirection(a, b)) {
      return false;
    }

    if (Math.abs(a - b) > 3) {
      return false;
    }
  }

  return true;
}

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  let safe = 0;
  outer: for (const datum of data) {
    const values = datum.split(/\s+/g).map((value) => parseInt(value, 10));

    let isSafe = false;

    for (let i = -1; i < data.length; i++) {
      if (i === -1) {
        isSafe = checkSafe(values);
      } else {
        isSafe = checkSafe(values.toSpliced(i, 1));
      }

      if (isSafe) {
        safe++;
        continue outer;
      }
    }
  }
  return safe;
}

await runSolution(day2b);
