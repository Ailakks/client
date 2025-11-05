import { Expose, Type } from "class-transformer"
import { UserTransform } from "./user.transform";
import { MemberTransform } from "./member.transform";

class ConnectedAccount {
    @Expose()
    type: string;

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    verified: boolean;
}

class MutualItem {
    @Expose()
    id: string;

    @Expose()
    nick: string;
}

class MutualGuild extends MutualItem {
}

class MutualFreind extends MutualItem {
}


class Badge {
    @Expose()
    id: string;

    @Expose()
    description: string;

    @Expose()
    icon: string;

    @Expose()
    link: string;
}

export class RichMemberTransform {
    @Expose()
    @Type(() => UserTransform)
    user: UserTransform;

    @Expose({ name: 'guild_member' })
    @Type(() => MemberTransform)
    member: MemberTransform;

    @Expose()
    @Type(() => ConnectedAccount)
    connected_accounts: ConnectedAccount;

    @Expose()
    @Type(() => MutualGuild)
    mutual_guilds: MutualGuild[];

    @Expose()
    @Type(() => MutualFreind)
    mutual_friends: MutualFreind[];

    @Expose()
    @Type(() => Badge)
    badges: Badge[];
}