import { Expose, Type } from "class-transformer";
import type { Guild } from "./guild.transform";

class GuildOverride {
    @Expose()
    channel_id: string;
}

class UserGuildSettings {
    @Expose()
    guild_id: string;

    @Expose()
    channel_overrides: GuildOverride[]
}

class Data {
    @Expose()
    guilds: Guild[];

    @Expose()
    user_guild_settings: UserGuildSettings[];
}

export class Profile {
    @Expose({ name: 'd' })
    @Type(() => Data)
    data: Data;
}