import { decodeMask } from "@/util/permission"

export function rolesMask(mask: string[], overwrites: { allow: string, deny: string }[]): bigint {
    const base = mask.map(role => BigInt(role)).reduce((acc, r) => acc | r, 0n)

    return overwrites.reduce((acc, o) => {
        const allow = BigInt(o.allow)
        const deny = BigInt(o.deny)
        return (acc & ~deny) | allow
    }, base)
}

export function everyoneRole(roles: any[]): any | undefined {
    return roles.find((item: { name: string }) => item.name == "@everyone");
}

export function userRoles(member: { user: { id: string, username: string }, roles: string[] }, roles: any[]): string[] {
    const everyone = everyoneRole(roles);

    if (!everyone) return [];

    return [everyone?.id, ...member.roles]
}

export function channelRoles(member: { user: { id: string, username: string }, roles: string[] }, roles: any[], permission_overwrites: [{ id: string }]): any[] {
    return permission_overwrites.filter(item => userRoles(member, roles).includes(item.id));
}

export function me(server: { members: [{ user: { id: string, username: string }, roles: string[] }], roles: any[] }): Partial<{ roles: any[] }> | undefined {
    return server.members.find(m => m.user.id === "1432477694259626248");
}

export function serverChannelRoles(server: { members: [{ user: { id: string, username: string }, roles: string[] }], roles: any[] }, channel: { permission_overwrites: [{ id: string }] }): any[] {
    const member = server.members.find(m => m.user.id === "1432477694259626248");

    if (!member) return [];

    return channelRoles(member, server.roles, channel.permission_overwrites);
}

export function channelPermissions(server: { members: [{ user: { id: string, username: string }, roles: string[] }], roles: any[] }, channel: { permission_overwrites: [{ id: string }] }): bigint | undefined {
    const base = (me(server)?.roles || [])
        .map(id => server.roles.find(r => r.id === id)?.permissions || "0")
        .map(BigInt)
        .reduce((acc, r) => acc | r, 0n);

    const overwrites = serverChannelRoles(server, channel);

    return overwrites
        .map(o => ({ allow: BigInt(o.allow), deny: BigInt(o.deny) }))
        .reduce((acc, o) => (acc & ~o.deny) | o.allow, base);
}

export function checkPermission(server: { members: [{ user: { id: string, username: string }, roles: string[] }], roles: [{ id: string, name: string }] }, channel: { permission_overwrites: [{ id: string }] }, permission: string): boolean {
    return decodeMask(`${channelPermissions(server, channel)}`).includes(permission)
}