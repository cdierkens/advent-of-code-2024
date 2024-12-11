import { runSolution } from '../utils.ts';

function generateCombinations(options: string[], length): string[] {
  if (length === 0) return [''];

  const smallerCombinations = generateCombinations(options, length - 1);
  const result = [];

  for (const combination of smallerCombinations) {
    for (const option of options) {
      result.push(combination + option);
    }
  }

  return result;
}

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {
  let calibrationTotal = 0;

  for (const datum of data) {
    const [left, right] = datum.split(':');

    const total = parseInt(left, 10);
    const values = right
      .trim()
      .split(/\s+/g)
      .map((value) => parseInt(value, 10));

    const combinations = generateCombinations(['+', '*'], values.length - 1);
    const totals = new Set<number>();

    for (let i = 0; i < combinations.length; i++) {
      const combination = combinations[i];
      let total = values[0];

      for (let j = 1; j < values.length; j++) {
        const operation = combination[j - 1];
        if (operation === '+') {
          total = total + values[j];
        } else if (operation === '*') {
          total = total * values[j];
        }
      }

      totals.add(total);
    }

    if (totals.has(total)) {
      calibrationTotal += total;
    }
  }

  return calibrationTotal;
}

await runSolution(day7a);
