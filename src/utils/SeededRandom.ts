export class SeededRandom {
  private seed: number;
  private current: number;

  constructor(seed: number) {
    this.seed = seed;
    this.current = seed;
  }

  next(): number {
    this.current = (this.current * 1664525 + 1013904223) % 4294967296;
    return this.current / 4294967296;
  }

  between(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick<T>(array: T[]): T {
    return array[this.between(0, array.length - 1)];
  }
}

export function generateSeed(): number {
  return Date.now() % 1000000;
}
