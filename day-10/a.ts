import { runSolution } from '../utils.ts';

const path = '0123456789';

function walk(
  x: number,
  y: number,
  index: number,
  data: string[],
  width: number,
  height: number,
  seen = new Set<string>()
) {
  if (index > path.length - 1) {
    return 0;
  } else if (x < 0 || y < 0 || x >= width || y >= height) {
    return 0;
  } else if (data[y][x] !== path[index]) {
    return 0;
  } else if (seen.has(`${x}:${y}`)) {
    return 0;
  } else if (index === path.length - 1) {
    seen.add(`${x}:${y}`);
    return 1;
  }

  seen.add(`${x}:${y}`);

  return (
    walk(x + 1, y, index + 1, data, width, height, seen) +
    walk(x - 1, y, index + 1, data, width, height, seen) +
    walk(x, y - 1, index + 1, data, width, height, seen) +
    walk(x, y + 1, index + 1, data, width, height, seen)
  );
}

/** provide your solution as the return of this function */
export async function day10a(data: string[]) {
  const height = data.length;
  const width = data[0].length;

  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = data[y][x];
      if (char === path[0]) {
        const score = walk(x, y, 0, data, width, height);
        count += score;
      }
    }
  }
  return count;
}

await runSolution(day10a);
