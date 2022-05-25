function roundTo2Places(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

export { roundTo2Places, assertNever };
