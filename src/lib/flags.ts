export function getActiveFlags<T>(bitmask: number, flags: T): T[] {
    return Object.values(flags).filter(value => (bitmask & value) === value);
}