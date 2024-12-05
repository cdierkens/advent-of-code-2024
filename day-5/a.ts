import { runSolution } from '../utils.ts';

// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
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
  updates: for (const update of updates) {
    const values = update.split(',');
    for (let i = 0; i < values.length - 1; i++) {
      const a = values[i];
      const b = values[i + 1];

      if (keys.has(`${b}|${a}`)) {
        continue updates;
      }
    }

    const middle = values[Math.floor(values.length / 2)];
    count += parseInt(middle, 10);
  }

  return count;
}

await runSolution(day5a);
