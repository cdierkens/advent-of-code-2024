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

  row: for (const datum of data) {
    const [left, right] = datum.split(':');

    const target = parseInt(left, 10);
    const values = right
      .trim()
      .split(/\s+/g)
      .map((value) => parseInt(value, 10));

    const combinations = generateCombinations(
      ['+', '*', '|'],
      values.length - 1
    );

    for (let i = 0; i < combinations.length; i++) {
      const combination = combinations[i];
      let total = values[0];

      for (let j = 1; j < values.length; j++) {
        const operation = combination[j - 1];
        if (operation === '+') {
          total = total + values[j];
        } else if (operation === '*') {
          total = total * values[j];
        } else if (operation === '|') {
          total = parseInt(`${total}${values[j]}`);
        }
      }

      if (total === target) {
        calibrationTotal += total;
        continue row;
      }
    }
  }

  return calibrationTotal;
}

await runSolution(day7a);
