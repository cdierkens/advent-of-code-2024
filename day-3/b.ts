import { runSolution } from '../utils.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mul(a, b) {
  return a * b;
}
/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  // https://regex101.com/r/qimU8O/1
  const input = data.join('').replaceAll(/don't\(\).+?(do\(\)|$)/g, '');

  const instructions = input.matchAll(/mul\(\d+,\d+\)/g);

  const code = instructions.toArray().join('+');

  return eval(code);
}

await runSolution(day3a);
