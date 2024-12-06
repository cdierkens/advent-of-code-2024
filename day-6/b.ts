import { runSolution } from '../utils.ts';

function getX(position: number, width: number) {
  return position % width;
}

function getY(position: number, width: number) {
  return Math.floor(position / width);
}

function getN(position: number, width: number) {
  const next = position - width;
  return next > -1 ? next : undefined;
}

function getE(position: number, width: number) {
  const next = position + 1;
  return getY(position, width) === getY(next, width) ? next : undefined;
}

function getS(position: number, width: number, height: number) {
  const next = position + width;
  return getY(next, width) < height ? next : undefined;
}

function getW(position: number, width) {
  const next = position - 1;
  return getY(position, width) === getY(next, width) ? next : undefined;
}

type Direction = 'N' | 'E' | 'S' | 'W';

const nextPosition = {
  N: getN,
  E: getE,
  W: getW,
  S: getS,
} as const;

const rotate = { N: 'E', E: 'S', S: 'W', W: 'N' } as const;

function walk(
  position: number,
  direction: Direction,
  width: number,
  height: number,
  map: Map<number, string>
) {
  const unique = new Set<number>();
  while (true) {
    if (position === undefined) {
      break;
    }

    unique.add(position);

    const candidate = nextPosition[direction](position, width, height);

    if (candidate === undefined) {
      break;
    }

    const char = map.get(candidate);

    if (char === '#') {
      direction = rotate[direction];
    }

    position = nextPosition[direction](position, width, height);
  }

  return unique;
}

function checkCycle(
  position: number,
  direction: Direction,
  width: number,
  height: number,
  map: Map<number, string>
) {
  const seen = new Set<string>();

  while (true) {
    if (position === undefined) {
      break;
    }

    const key = `${position}-${direction}`;

    if (seen.has(key)) {
      return true;
    }

    seen.add(key);

    let char = map.get(nextPosition[direction](position, width, height));

    while (char === '#' || char === 'O') {
      direction = rotate[direction];
      char = map.get(nextPosition[direction](position, width, height));
    }

    position = nextPosition[direction](position, width, height);
  }

  return false;
}

/** provide your solution as the return of this function */
export async function day6a(rows: string[]) {
  const map = new Map<number, string>();
  const height = rows.length;
  const width = rows[0].length;

  let position: number = -1;
  let direction: Direction;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      const candidate = i * width + j;

      map.set(candidate, char);

      if (char === '^') {
        direction = 'N';
        position = candidate;
      } else if (char === '>') {
        direction = 'E';
        position = candidate;
      } else if (char === 'v') {
        direction = 'S';
        position = candidate;
      } else if (char === '<') {
        direction = 'W';
        position = candidate;
      }
    }
  }

  const unique = walk(position, direction, width, height, map);

  let cycleCount = 0;
  for (const candidate of unique) {
    const newMap = new Map(map);

    newMap.set(candidate, 'O');

    if (checkCycle(position, direction, width, height, newMap)) {
      cycleCount++;
    }
  }

  return cycleCount;
}

await runSolution(day6a);
