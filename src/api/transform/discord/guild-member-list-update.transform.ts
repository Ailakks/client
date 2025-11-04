import { Expose, Type } from "class-transformer";
import { MemberTransform } from "../member.transform";

export class Member {
    @Expose()
    @Type(() => MemberTransform)
    member: MemberTransform;
}

export class Group {
    @Expose()
    id: string;
}

class Operations {
    @Expose()
    @Type(() => Member)
    items: Group[] | Member[];

    @Expose()
    range: number[];
}

class Data {
    @Expose({ name: 'ops' })
    @Type(() => Operations)
    operations: Operations[];

    @Expose()
    member_count: number;

    @Expose()
    online_count: number;
}

export class GuildMemberListUpdateTransform {
    @Expose({ name: 'd' })
    @Type(() => Data)
    data: Data;
}