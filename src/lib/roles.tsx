import { decodeMask } from "@/util/permission"

interface User {
    id: string
    username: string
}

interface Member {
    user: User
    roles: string[]
}

interface Role {
    id: string
    name?: string
    permissions?: string
}

interface Overwrite {
    id: string
    allow?: string
    deny?: string
}

interface Server {
    members: Member[]
    roles: Role[]
}

interface Channel {
    permission_overwrites: Overwrite[]
}

export function rolesMask(mask: string[], overwrites: Overwrite[]): bigint {
    const base = mask.map(role => BigInt(role)).reduce((acc, r) => acc | r, 0n)

    return overwrites.reduce((acc, o) => {
        const allow = BigInt(o.allow || "0")
        const deny = BigInt(o.deny || "0")
        return (acc & ~deny) | allow
    }, base)
}

export function everyoneRole(roles: Role[]): any | undefined {
    return roles.find((item) => item.name == "@everyone");
}

export function userRoles(member: Member, roles: Role[]): string[] {
    const everyone = everyoneRole(roles);

    if (!everyone) return [];

    return [everyone?.id, ...member.roles];
}

export function channelRoles(member: Member, roles: Role[], permission_overwrites: Overwrite[]): any[] {
    return permission_overwrites.filter(item => userRoles(member, roles).includes(item.id));
}

export function me(server: Server): Member | undefined {
    return server.members.find(m => m.user.id === "1432477694259626248");
}

export function meRoles(server: Server): (Role | undefined)[] {
    const everyone = everyoneRole(server.roles);

    return [everyone, ...(me(server)?.roles || []).map(id => server.roles.find(r => r.id === id))];
}

export function serverChannelRoles(server: Server, channel: Channel): any[] {
    const member = me(server);

    if (!member) return [];

    return channelRoles(member, server.roles, channel.permission_overwrites);
}

export function channelPermissions(server: Server, channel: Channel): bigint | undefined {
    const base = meRoles(server)
        .map(role => role?.permissions || "0")
        .map(BigInt)
        .reduce((acc, r) => acc | r, 0n);

    const overwrites = serverChannelRoles(server, channel);

    return overwrites
        .map(o => ({ allow: BigInt(o.allow || "0"), deny: BigInt(o.deny || "0") }))
        .reduce((acc, o) => (acc & ~o.deny) | o.allow, base);
}

export function checkPermission(server: Server, channel: Channel, permission: string): boolean {
    return decodeMask(`${channelPermissions(server, channel)}`).includes(permission)
}
