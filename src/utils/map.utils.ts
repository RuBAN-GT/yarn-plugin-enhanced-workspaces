export function getMapValues<T>(input: Map<any, T>): T[] {
  const values: T[] = [];

  input.forEach((value) => {
    values.push(value);
  });

  return values;
}

export function getMapKeys<T>(input: Map<T, any>): Set<T> {
  const keys: Set<T> = new Set();

  input.forEach((_, key) => {
    keys.add(key);
  });

  return keys;
}

export function getInvertedMap<K, V>(input: Map<K, V>): Map<V, K[]> {
  const output: Map<V, K[]> = new Map();

  input.forEach((value, key) => {
    const list = output.get(value) || [];
    list.push(key);

    output.set(value, list);
  });

  return output;
}
