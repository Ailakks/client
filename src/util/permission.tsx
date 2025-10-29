export function decodeMask(mask: bigint, type: Record<string, number>): (number | undefined)[] {
    const result: (number | undefined)[] = [];

    for (let i = 0; i <= 39; i++) {
        if ((mask & (1n << BigInt(i))) !== 0n) {
            result.push(i);
        }
    }
    
    return result;
}