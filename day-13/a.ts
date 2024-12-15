import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day13a(data: string[]) {
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    const [a, b, prize] = data.slice(i, i + 3);

    const aX = parseInt(/X\+(\d+)/g.exec(a)[1], 10);
    const aY = parseInt(/Y\+(\d+)/g.exec(a)[1], 10);

    const bX = parseInt(/X\+(\d+)/g.exec(b)[1], 10);
    const bY = parseInt(/Y\+(\d+)/g.exec(b)[1], 10);

    const prizeX = parseInt(/X=(\d+)/g.exec(prize)[1], 10);
    const prizeY = parseInt(/Y=(\d+)/g.exec(prize)[1], 10);

    let tokens = 0;
    const maxY = Math.floor(prizeY / aY) * aY;
    for (let j = maxY; j > 0; j -= aY) {
      const remaining = prizeY - j;

      if (remaining % bY === 0) {
        const push = {
          a: j / aY,
          b: Math.floor(remaining / bY),
        };

        if (push.a * aX + push.b * bX === prizeX) {
          tokens = push.a * 3 + push.b * 1;

          break;
        }
      }
    }

    total += tokens;
  }

  return total;
}

await runSolution(day13a);
