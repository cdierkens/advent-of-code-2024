import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4b(rows: string[]) {
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    const column = rows[i];

    for (let j = 0; j < column.length; j++) {
      const char = rows[i][j];
      if (char !== 'A') {
        continue;
      }

      let count = 0;

      if (
        rows[i - 1] &&
        rows[i + 1] &&
        rows[i - 1][j - 1] &&
        rows[i - 1][j + 1] &&
        rows[i + 1][j + 1] &&
        rows[i + 1][j - 1]
      ) {
        // check NW for M and SE for S
        // check NW for S and SE for M
        if (
          (rows[i - 1][j - 1] === 'M' && rows[i + 1][j + 1] === 'S') ||
          (rows[i - 1][j - 1] === 'S' && rows[i + 1][j + 1] === 'M')
        ) {
          count++;
        }

        // check NE for M and SW for S
        // check NE for S and SW for M
        if (
          (rows[i - 1][j + 1] === 'M' && rows[i + 1][j - 1] === 'S') ||
          (rows[i - 1][j + 1] === 'S' && rows[i + 1][j - 1] === 'M')
        ) {
          count++;
        }
      }

      // if 2 found, add to global counter
      if (count == 2) {
        total++;
      }
    }
  }
  return total;
}

await runSolution(day4b);
