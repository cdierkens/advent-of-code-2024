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

function inBounds(x: number, y: number, columns: number, rows: number) {
  return x > -1 && x < rows && y > -1 && y < columns;
}

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {
  const width = data[0].length;
  const height = data.length;

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
            const pointA: [number, number] = [j, i];
            const pointB: [number, number] = [l, k];

            seen.add(`${pointA[0]}:${pointA[1]}`);
            seen.add(`${pointB[0]}:${pointB[1]}`);

            const {
              previous: [prevX, prevY],
              next: [nextX, nextY],
            } = calculatePoints(pointA, pointB);

            if (inBounds(prevX, prevY, width, height)) {
              seen.add(`${prevX}:${prevY}`);

              let a: [number, number] = [prevX, prevY];
              let b = pointA;
              let points = calculatePoints(a, b);

              while (
                inBounds(points.previous[0], points.previous[1], width, height)
              ) {
                seen.add(`${points.previous[0]}:${points.previous[1]}`);

                b = a;
                a = [points.previous[0], points.previous[1]];

                points = calculatePoints(a, b);
              }
            }

            if (inBounds(nextX, nextY, width, height)) {
              seen.add(`${nextX}:${nextY}`);

              let a = pointB;
              let b: [number, number] = [nextX, nextY];
              let points = calculatePoints(a, b);

              while (inBounds(points.next[0], points.next[1], width, height)) {
                seen.add(`${points.next[0]}:${points.next[1]}`);

                a = b;
                b = [points.next[0], points.next[1]];

                points = calculatePoints(a, b);
              }
            }
          }
        }
      }
    }
  }

  return seen.size;
}

await runSolution(day8b);
