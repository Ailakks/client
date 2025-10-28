export function getActiveFlags(bitmask: number, flags: Record<string, number>): Record<string, number> {
    return Object.fromEntries(
        Object.entries(flags)
            .filter(([_, value]) => (bitmask & value) === value)
    );
}