import { runSolution } from '../utils.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mul(a, b) {
  return a * b;
}
/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  let code = '';

  for (const datum of data) {
    const instructions = datum.matchAll(/mul\(\d+,\d+\)/g);

    code += code.length
      ? `+${instructions.toArray().join('+')}`
      : instructions.toArray().join('+');
  }

  return eval(code);
}

await runSolution(day3a);
