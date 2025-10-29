export function getActiveFlags(bitmask: bigint, enumObj: Record<string, number>): number[] {
    const result: number[] = [];
    const values = Object.values(enumObj);
    for (let i = 0; i < values.length; i++) {
        if ((bitmask & BigInt(values[i])) === BigInt(values[i])) {
            result.push(values[i]);
        }
    }
    return result;
}
