import { Expose, Type } from "class-transformer"
import { UserTransform } from "./user.transform";

class ActivityTransform {
    @Expose()
    id: number;

    @Expose()
    name: number;

    @Expose()
    type: number;

    @Expose({ name: 'state' })
    body: string;

    @Expose()
    @Type(() => EmojiTransform)
    emoji: EmojiTransform[];
}

class EmojiTransform {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    animated: boolean;
}

class PresenceTransform {
    @Expose({ name: 'status' })
    type: string;

    @Expose({ name: 'processed_at_timestamp' })
    since: number;

    @Expose()
    @Type(() => ActivityTransform)
    activities: ActivityTransform[];
}

export class MemberTransform {
    @Expose()
    @Type(() => UserTransform)
    user: UserTransform;

    @Expose()
    roles: string[];

    @Expose()
    nick: string;

    @Expose()
    avatar: string;

    @Expose()
    @Type(() => PresenceTransform)
    presence: PresenceTransform;
}