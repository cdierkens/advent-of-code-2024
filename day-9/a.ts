import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  const [diskMap] = data;

  const disk: string[] = [];

  let id = 0;
  for (let i = 0; i < diskMap.length; i++) {
    disk.push(
      ...Array.from({ length: parseInt(diskMap[i], 10) }, () =>
        i % 2 === 0 ? id.toString() : '.'
      )
    );
    if (i % 2 === 0) {
      id++;
    }
  }

  let freeIndex = disk.indexOf('.');

  for (let i = disk.length - 1; i > freeIndex; i--) {
    const char = disk[i];

    if (char === '.') {
      continue;
    }

    [disk[i], disk[freeIndex]] = [disk[freeIndex], disk[i]];

    freeIndex = disk.indexOf('.', freeIndex + 1);
  }

  let checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    const char = disk[i];

    if (char === '.') {
      break;
    }

    checksum += parseInt(char, 10) * i;
  }

  return checksum;
}

await runSolution(day9a);
