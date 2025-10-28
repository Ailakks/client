export function rolesMask(mask: string[], overwrites: { allow: string, deny: string }[]): bigint {
  const base = mask.map(role => BigInt(role)).reduce((acc, r) => acc | r, 0n)

  return overwrites.reduce((acc, o) => {
    const allow = BigInt(o.allow)
    const deny = BigInt(o.deny)
    return (acc & ~deny) | allow
  }, base)
}

export function channelApplyingRoles(member: { roles: string[] }, roles: [{ id: string, name: string }], permission_overwrites: [{ id: string }]): string[] {
  const everyone = roles.find((item: { name: string }) => item.name == "@everyone");

  return permission_overwrites.map((item: { id: string }) => item.id).filter(item => [everyone?.id, member.roles].includes(item));
}