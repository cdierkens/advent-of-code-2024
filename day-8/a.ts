import { runSolution } from '../utils.ts';

function calculatePoints(
  point1: [number, number],
  point2: [number, number]
): { previous: [number, number]; next: [number, number] } {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  // Calculate the vector (x2 - x1, y2 - y1)
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Calculate the next point
  const next: [number, number] = [x2 + dx, y2 + dy];

  // Calculate the previous point
  const previous: [number, number] = [x1 - dx, y1 - dy];

  return { previous, next };
}

/** provide your solution as the return of this function */
export async function day8a(data: string[]) {
  let antinodes = 0;

  const seen = new Set<string>();
  // create a map of pairs and their coordinates.
  for (let i = 0; i < data.length; i++) {
    const rowA = data[i];
    for (let j = 0; j < rowA.length; j++) {
      const a = rowA[j];

      if (a === '.') {
        continue;
      }

      for (let k = i; k < data.length; k++) {
        const rowB = data[k];
        for (let l = 0; l < rowA.length; l++) {
          if (i === k && j === l) {
            continue;
          }

          if (i === k && l <= j) {
            continue;
          }

          const b = rowB[l];

          if (b === '.') {
            continue;
          }

          if (a === b) {
            const { previous, next } = calculatePoints([j, i], [l, k]);

            if (
              !seen.has(`${previous[0]}:${previous[1]}`) &&
              previous[0] > -1 &&
              previous[0] < rowA.length &&
              previous[1] > -1 &&
              previous[1] < data.length
            ) {
              antinodes++;

              seen.add(`${previous[0]}:${previous[1]}`);
            }

            if (
              !seen.has(`${next[0]}:${next[1]}`) &&
              next[0] > -1 &&
              next[0] < rowA.length &&
              next[1] > -1 &&
              next[1] < data.length
            ) {
              antinodes++;

              seen.add(`${next[0]}:${next[1]}`);
            }
          }
        }
      }
    }
  }

  return antinodes;
}

await runSolution(day8a);
