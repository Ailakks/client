import { Expose } from "class-transformer";
import type { Channel } from "./channel.transform";
import type { Member } from "./member.transform";
import type { Role } from "./role.transform";

export class Guild {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    icon: string;

    @Expose()
    channels: Channel[];

    @Expose()
    members: Member[];

    @Expose()
    roles: Role[];
}