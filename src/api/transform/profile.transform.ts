import { Expose, Type } from "class-transformer";
import type { GuildTransform } from "./guild.transform";
import type { UserTransform } from "./user.transform";

class GuildOverride {
    @Expose()
    channel_id: string;
}

class UserGuildSetting {
    @Expose()
    guild_id: string;

    @Expose()
    channel_overrides: GuildOverride[]
}

class UserGuildSettings {
    @Expose()
    entries: UserGuildSetting[];
}

class Data {
    @Expose()
    user: UserTransform;

    @Expose()
    guilds: GuildTransform[];

    @Expose()
    @Type(() => UserGuildSettings)
    user_guild_settings: UserGuildSettings;
}

export class ProfileTransform {
    @Expose({ name: 'd' })
    @Type(() => Data)
    data: Data;
}