export function getActiveFlags(bitmask: number, flags: Record<string, number>): number[] {
    return Object.values(flags).filter(value => (bitmask & value) === value);
}