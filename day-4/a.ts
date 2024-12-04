import { runSolution } from '../utils.ts';

// S, A, M ,S, M, A, S
// S, A, M ,A, M, A, S
// S, A, M ,M, M, A, S
// S, A, M ,X, M, A, S
// S, A, M ,M, M, A, S
// S, A, M ,A, M, A, S
// S, A, M ,S, M, A, S

/** provide your solution as the return of this function */
export async function day4a(rows: string[]) {
  const needle = 'XMAS';
  let count = 0;

  for (let i = 0; i < rows.length; i++) {
    const column = rows[i];

    row: for (let j = 0; j < column.length; j++) {
      if (column[j] !== needle[0]) {
        continue;
      }

      const matching = Array.from({ length: 8 }, () => true);

      for (let k = 1; k < needle.length; k++) {
        const next = needle[k];

        // N
        if (matching[0] && rows[i - k] && rows[i - k][j]) {
          const value = rows[i - k][j];

          if (!value || value !== next) {
            matching[0] = false;
          }
        } else {
          matching[0] = false;
        }

        // NE
        if (matching[1] && rows[i - k] && rows[i - k][j + k]) {
          const value = rows[i - k][j + k];

          if (!value || value !== next) {
            matching[1] = false;
          }
        } else {
          matching[1] = false;
        }

        // E
        if (matching[2] && rows[i] && rows[i][j + k]) {
          const value = rows[i][j + k];
          if (!value || value !== next) {
            matching[2] = false;
          }
        } else {
          matching[2] = false;
        }

        // SE
        if (matching[3] && rows[i + k] && rows[i + k][j + k]) {
          const value = rows[i + k][j + k];

          if (!value || value !== next) {
            matching[3] = false;
          }
        } else {
          matching[3] = false;
        }

        // S
        if (matching[4] && rows[i + k] && rows[i + k][j]) {
          const value = rows[i + k][j];

          if (!value || value !== next) {
            matching[4] = false;
          }
        } else {
          matching[4] = false;
        }

        // SW
        if (matching[5] && rows[i + k] && rows[i + k][j - k]) {
          const value = rows[i + k][j - k];

          if (!value || value !== next) {
            matching[5] = false;
          }
        } else {
          matching[5] = false;
        }

        // W
        if (matching[6] && rows[i] && rows[i][j - k]) {
          const value = rows[i][j - k];

          if (!value || value !== next) {
            matching[6] = false;
          }
        } else {
          matching[6] = false;
        }

        // NW
        if (matching[7] && rows[i - k] && rows[i - k][j - k]) {
          const value = rows[i - k][j - k];

          if (!value || value !== next) {
            matching[7] = false;
          }
        } else {
          matching[7] = false;
        }

        if (!matching.includes(true)) {
          continue row;
        }
      }

      const matchcount = matching.reduce(
        (count, value) => count + (value ? 1 : 0),
        0
      );

      count += matchcount;
    }
  }
  return count;
}

await runSolution(day4a);
