import { decodeMask } from "@/util/permission"
import { ChannelFlags } from "./channels"
import { getActiveFlags } from "./flags"
import type { Profile } from "@/transform/profile.transform"
import type { Guild } from "@/transform/guild.transform"
import type { Channel } from "@/transform/channel.transform"

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
    return permission_overwrites
        .filter(item => userRoles(member, roles).includes(item.id))
        .sort((a, b) => {
            return (roles.find(r => r.id === a.id)?.position || 0) - (roles.find(r => r.id === b.id)?.position || 0)
        })
}

export function me(server: Guild): Member | undefined {
    return server.members.find(m => m.user.id === "1432477694259626248");
}

export function meRoles(server: Guild): (Role | undefined)[] {
    const everyone = everyoneRole(server.roles);

    return [everyone, ...(me(server)?.roles || []).map(id => server.roles.find(r => r.id === id))];
}

export function serverChannelRoles(server: Guild, channel: Channel): any[] {
    const member = me(server);

    if (!member) return [];

    return channelRoles(member, server.roles, channel.permission_overwrites);
}

export function channelPermissions(server: Guild, channel: Channel): bigint | undefined {
    const base = meRoles(server)
        .map(role => role?.permissions || "0")
        .map(BigInt)
        .reduce((acc, r) => acc | r, 0n);

    const overwrites = serverChannelRoles(server, channel);

    return overwrites
        .map(o => ({ allow: BigInt(o.allow || "0"), deny: BigInt(o.deny || "0") }))
        .reduce((acc, o) => (acc & ~o.deny) | o.allow, base);
}

export function checkPermission(server: Guild, channel: Channel, permission: string): boolean {
    return decodeMask(`${channelPermissions(server, channel)}`).includes(permission);
}

export function checkVisible(data: Profile, server: Guild, channel: Channel, permission: string): boolean {
    const override_flags = data.data.user_guild_settings.find((item) => item.guild_id == server.id).channel_overrides.find((item) => item.channel_id == channel.id);

    return checkPermission(server, channel, permission) && override_flags && !getActiveFlags(channel.flags, ChannelFlags).includes(ChannelFlags.IsGuildResourceChannel);
}
