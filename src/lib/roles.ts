import { decodeMask } from "@/util/permission"
import { ChannelFlags } from "./channels"
import { getActiveFlags } from "./flags"
import type { Profile } from "@/transform/profile.transform"
import type { Guild } from "@/transform/guild.transform"
import type { Channel } from "@/transform/channel.transform"
import type { User } from "@/transform/user.transform"
import type { Role } from "@/transform/role.transform"
import type { Member } from "@/transform/member.transform"
import type { Overwrite } from "@/transform/overwrite.transform"

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

export function me(user: User, guild: Guild): Member | undefined {
    return guild.members.find(m => m.user.id == user.id);
}

export function meRoles(user: User, guild: Guild): (Role | undefined)[] {
    const everyone = everyoneRole(guild.roles);

    return [everyone, ...(me(user, guild)?.roles || []).map(id => guild.roles.find(r => r.id === id))];
}

export function guildChannelRoles(user: User, guild: Guild, channel: Channel): any[] {
    const member = me(user, guild);

    if (!member) return [];

    return channelRoles(member, guild.roles, channel.permission_overwrites);
}

export function channelPermissions(user: User, guild: Guild, channel: Channel): bigint | undefined {
    const base = meRoles(user, guild)
        .map(role => role?.permissions || "0")
        .map(BigInt)
        .reduce((acc, r) => acc | r, 0n);

    const overwrites = guildChannelRoles(user, guild, channel);

    return overwrites
        .map(o => ({ allow: BigInt(o.allow || "0"), deny: BigInt(o.deny || "0") }))
        .reduce((acc, o) => (acc & ~o.deny) | o.allow, base);
}

export function checkPermission(user: User, guild: Guild, channel: Channel, permission: string): boolean {
    return decodeMask(`${channelPermissions(user, guild, channel)}`).includes(permission);
}

export function checkVisible(data: Profile, guild: Guild, channel: Channel, permission: string): boolean {
    const override_flags = data.data.user_guild_settings.find((item) => item.guild_id == guild.id)?.channel_overrides?.find((item) => item.channel_id == channel.id);

    return data.data.user.id == "" || checkPermission(data.data.user, guild, channel, permission) && override_flags && !getActiveFlags(channel.flags, ChannelFlags).includes(ChannelFlags.IsGuildResourceChannel);
}
