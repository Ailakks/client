import { Expose } from "class-transformer";
import type { ChannelTransform } from "./channel.transform";
import type { MemberTransform } from "./member.transform";
import type { RoleTransform } from "./role.transform";

export class GuildTransform {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    icon: string;

    @Expose()
    channels: ChannelTransform[];

    @Expose()
    members: MemberTransform[];

    @Expose()
    roles: RoleTransform[];

    @Expose()
    owner_id: string;
}