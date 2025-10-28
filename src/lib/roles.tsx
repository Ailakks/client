export function rolesMask(mask: string[], overwrites: { allow: string, deny: string }[]): bigint {
  const base = mask.map(role => BigInt(role)).reduce((acc, r) => acc | r, 0n)

  return overwrites.reduce((acc, o) => {
    const allow = BigInt(o.allow)
    const deny = BigInt(o.deny)
    return (acc & ~deny) | allow
  }, base)
}
