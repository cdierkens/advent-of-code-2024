import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9b(data: string[]) {
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

  for (let i = disk.length - 1; i > 0; i--) {
    const id = disk[i];

    if (id === '.') {
      continue;
    }

    const last = i;
    let first = i;
    while (disk[--i] === id) {
      first = i;
    }
    i++;

    const spaceNeeded = last - first + 1;

    let spaceFound = -1;
    let freeStart = -1;
    for (let k = 0; k < first; k++) {
      const id = disk[k];

      if (id === '.') {
        if (freeStart === -1) {
          freeStart = k;
        }

        spaceFound = k - freeStart + 1;

        const distance = first - freeStart;

        if (spaceFound >= spaceNeeded) {
          for (let l = first; l < last + 1; l++) {
            [disk[l], disk[l - distance]] = [disk[l - distance], disk[l]];
          }

          break;
        }
      } else {
        spaceFound = -1;
        freeStart = -1;
      }
    }
  }

  let checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    const char = disk[i];

    if (char === '.') {
      continue;
    }

    checksum += parseInt(char, 10) * i;
  }

  return checksum;
}

await runSolution(day9b);
