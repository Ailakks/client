import { Expose, Type } from "class-transformer";

class GuildTransform {
    @Expose({ name: 'identity_guild_id' })
    id: string;

    @Expose()
    tag: string;

    @Expose({ name: 'identity_guild_id' })
    show_badge: boolean;

    @Expose()
    badge: string;
}

class AvatarDecoratorTransform {
    @Expose({ name: 'sku_id' })
    id: string;

    @Expose()
    asset: string;
}
export class UserTransform {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    display_name: string;

    @Expose()
    global_name: string;

    @Expose()
    bio: string;

    @Expose()
    bot: boolean;

    @Expose({ name: 'primary_guild' })
    @Type(() => GuildTransform)
    guild: GuildTransform;

    @Expose()
    avatar: string;

    @Expose({ name: 'avatar_decoration_data' })
    @Type(() => AvatarDecoratorTransform)
    avatar_decorator: AvatarDecoratorTransform;
}