import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
  const stones = data[0].split(' ');

  const blinkCount = 25;

  for (let i = 0; i < blinkCount; i++) {
    for (let j = 0; j < stones.length; j++) {
      const engraving = stones[j];
      const value = BigInt(engraving);
      if (value === BigInt(0)) {
        // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.

        stones[j] = '1';
      } else if (engraving.length % 2 === 0) {
        // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)

        stones.splice(
          j + 1,
          0,
          parseInt(engraving.slice(engraving.length / 2)).toString()
        );
        stones[j] = parseInt(
          engraving.slice(0, engraving.length / 2)
        ).toString();
        j++;
      } else {
        // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

        stones[j] = String(value * BigInt(2024));
      }
    }
  }

  return stones.length;
}

await runSolution(day11a);
