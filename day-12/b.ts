import { runSolution } from '../utils.ts';

type Point = { x: number; y: number };

type Region = Array<string[]>;

function getKey({ x, y }: Point) {
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
  region: Region = []
) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return region;
  }

  if (seen.has(getKey({ x, y }))) {
    return region;
  }

  if (char !== data[y][x]) {
    return region;
  }

  seen.add(getKey({ x, y }));
  region[y] ??= [];
  region[y][x] = char;

  walk(data, x, y - 1, char, seen, height, width, region);
  walk(data, x + 1, y, char, seen, height, width, region);
  walk(data, x, y + 1, char, seen, height, width, region);
  walk(data, x - 1, y, char, seen, height, width, region);

  return region;
}

/** provide your solution as the return of this function */
export async function day12b(data: string[]) {
  const seen = new Set<string>();
  const height = data.length;
  const width = data[0].length;

  const regions: Region[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (seen.has(getKey({ x, y }))) {
        continue;
      }

      const char = data[y][x];

      regions.push(walk(data, x, y, char, seen, height, width));
    }
  }

  let cost = 0;
  for (const region of regions) {
    let corners = 0;
    let size = 0;

    for (const y in region) {
      const row = region[y];
      for (const x in row) {
        const yInt = parseInt(y, 10);
        const xInt = parseInt(x, 10);

        size++;

        const diagonals: Record<string, Point> = {
          NE: { y: yInt - 1, x: xInt + 1 },
          SE: { y: yInt + 1, x: xInt + 1 },
          SW: { y: yInt + 1, x: xInt - 1 },
          NW: { y: yInt - 1, x: xInt - 1 },
        };

        const cardinals: Record<string, Point> = {
          N: { y: yInt - 1, x: xInt },
          E: { y: yInt, x: xInt + 1 },
          S: { y: yInt + 1, x: xInt },
          W: { y: yInt, x: xInt - 1 },
        };

        // NE
        if (
          region[cardinals.N.y]?.[cardinals.N.x] === undefined &&
          region[cardinals.E.y]?.[cardinals.E.x] === undefined
        ) {
          corners++;
        }

        if (
          region[cardinals.N.y]?.[cardinals.N.x] !== undefined &&
          region[cardinals.E.y]?.[cardinals.E.x] !== undefined &&
          region[diagonals.NE.y]?.[diagonals.NE.x] == undefined
        ) {
          corners++;
        }

        // SE
        if (
          region[cardinals.S.y]?.[cardinals.S.x] === undefined &&
          region[cardinals.E.y]?.[cardinals.E.x] === undefined
        ) {
          corners++;
        }

        if (
          region[cardinals.S.y]?.[cardinals.S.x] !== undefined &&
          region[cardinals.E.y]?.[cardinals.E.x] !== undefined &&
          region[diagonals.SE.y]?.[diagonals.SE.x] == undefined
        ) {
          corners++;
        }

        // SW
        if (
          region[cardinals.S.y]?.[cardinals.S.x] === undefined &&
          region[cardinals.W.y]?.[cardinals.W.x] === undefined
        ) {
          corners++;
        }

        if (
          region[cardinals.S.y]?.[cardinals.S.x] !== undefined &&
          region[cardinals.W.y]?.[cardinals.W.x] !== undefined &&
          region[diagonals.SW.y]?.[diagonals.SW.x] == undefined
        ) {
          corners++;
        }

        // NW
        if (
          region[cardinals.N.y]?.[cardinals.N.x] === undefined &&
          region[cardinals.W.y]?.[cardinals.W.x] === undefined
        ) {
          corners++;
        }

        if (
          region[cardinals.N.y]?.[cardinals.N.x] !== undefined &&
          region[cardinals.W.y]?.[cardinals.W.x] !== undefined &&
          region[diagonals.NW.y]?.[diagonals.NW.x] == undefined
        ) {
          corners++;
        }
      }
    }

    cost += corners * size;
  }

  return cost;
}

await runSolution(day12b);
