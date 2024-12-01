export function getInput(data: string[]) {
  return data.reduce(
    (acc: [number[], number[]], row) => {
      const [a, b] = row.split(/\s+/g);

      acc[0].push(parseInt(a, 10));
      acc[1].push(parseInt(b, 10));
      return acc;
    },
    [[], []]
  );
}
