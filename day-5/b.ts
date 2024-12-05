import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
  const index = data.indexOf('');
  const rules = data.slice(0, index);
  const updates = data.slice(index + 1);

  // Make comparator lookup
  const keys = new Set<string>();
  for (const rule of rules) {
    keys.add(rule);
  }

  // Iterate through updates
  let count = 0;
  for (const update of updates) {
    const values = update.split(',');
    let valid = true;
    for (let i = 0; i < values.length - 1; i++) {
      const a = values[i];
      const b = values[i + 1];

      if (keys.has(`${b}|${a}`)) {
        valid = false;

        break;
      }
    }

    if (valid) {
      continue;
    }

    const sorted = values.toSorted((a, b) => {
      if (keys.has(`${a}|${b}`)) {
        return -1;
      } else if (keys.has(`${b}|${a}`)) {
        return 1;
      } else {
        return 0;
      }
    });

    const middle = sorted[Math.floor(sorted.length / 2)];
    count += parseInt(middle, 10);
  }

  return count;
}

await runSolution(day5b);
