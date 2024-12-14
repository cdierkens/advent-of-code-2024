import { runSolution } from '../utils.ts';

type Point = number;
type Region = Set<Point>;

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

function getW(position: number, width: number) {
  const next = position - 1;
  return getY(position, width) === getY(next, width) ? next : undefined;
}

function getPosition(x: number, y: number, width: number) {
  return y * width + x;
}

function getKey(x: number, y: number) {
  return `${x}:${y}`;
}

function walk(
  data: string[],
  x: number,
  y: number,
  char: string,
  seen: Set<string>,
  height: number,
  width: number,
  region: Region = new Set()
) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return region;
  }

  if (seen.has(getKey(x, y))) {
    return region;
  }

  if (char !== data[y][x]) {
    return region;
  }

  seen.add(getKey(x, y));
  region.add(getPosition(x, y, width));

  walk(data, x, y - 1, char, seen, height, width, region);
  walk(data, x + 1, y, char, seen, height, width, region);
  walk(data, x, y + 1, char, seen, height, width, region);
  walk(data, x - 1, y, char, seen, height, width, region);

  return region;
}

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {
  const seen = new Set<string>();
  const height = data.length;
  const width = data[0].length;

  const regions: Region[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (seen.has(getKey(x, y))) {
        continue;
      }

      const char = data[y][x];

      regions.push(walk(data, x, y, char, seen, height, width));
    }
  }

  let cost = 0;
  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    let walls = 0;
    for (const position of region) {
      if (!region.has(getN(position, width))) {
        walls++;
      }

      if (!region.has(getE(position, width))) {
        walls++;
      }

      if (!region.has(getS(position, width, height))) {
        walls++;
      }

      if (!region.has(getW(position, width))) {
        walls++;
      }
    }

    cost += walls * region.size;
  }

  return cost;
}

await runSolution(day12a);
