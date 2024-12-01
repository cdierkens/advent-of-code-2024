import { runSolution } from '../utils.ts';
import { getInput } from './input.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  const input = getInput(data);

  input[0].sort();
  input[1].sort();

  let sum = 0;

  for (let i = 0; i < input[0].length; i++) {
    sum += Math.abs(input[0][i] - input[1][i]);
  }
  return sum;
}

await runSolution(day1a);
