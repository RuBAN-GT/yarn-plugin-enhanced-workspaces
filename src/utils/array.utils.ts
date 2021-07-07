export function chunkBy<T = any>(input: T[], size: number): T[][] {
  const length = Math.ceil(input.length / size);
  const result = Array(length);

  for (let i = 0; i < length; i++) {
    const startPosition = i * size;
    result[i] = input.slice(startPosition, startPosition + size);
  }

  return result;
}
