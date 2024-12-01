import { runSolution } from '../utils.ts';
import { getInput } from './input.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  const input = getInput(data);

  const frequency = input[1].reduce((acc: Record<string, number>, value) => {
    acc[value] = acc[value] ? acc[value] + 1 : 1;

    return acc;
  }, {});

  let sum = 0;

  for (const i of input[0]) {
    if (frequency[i]) {
      sum += frequency[i] * i;
    }
  }

  return sum;
}

await runSolution(day1b);
