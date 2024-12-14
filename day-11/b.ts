import { runSolution } from '../utils.ts';

function getCount(
  engraving: string,
  i: number,
  counts = new Map<string, number>()
) {
  const key = `${engraving}:${i}`;
  if (counts.has(key)) {
    return counts.get(key);
  }

  if (i === 0) {
    return 1;
  }

  const value = BigInt(engraving);

  if (value === BigInt(0)) {
    // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.

    return getCount('1', i - 1, counts);
  } else if (engraving.length % 2 === 0) {
    // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)

    const left = getCount(
      parseInt(engraving.slice(0, engraving.length / 2)).toString(),
      i - 1,
      counts
    );
    const right = getCount(
      parseInt(engraving.slice(engraving.length / 2)).toString(),
      i - 1,
      counts
    );
    const count = left + right;

    counts.set(key, count);

    return count;
  } else {
    // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

    return getCount(String(value * BigInt(2024)), i - 1, counts);
  }
}

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  const stones = data[0].split(' ');

  const blinkCount = 75;
  let total = 0;

  for (let i = 0; i < stones.length; i++) {
    total += getCount(stones[i], blinkCount);
  }

  return total;
}

await runSolution(day11b);
