import { Expose, Type } from "class-transformer";
import type { MemberTransform } from "../member.transform";

export class Member {
    @Expose()
    member: MemberTransform;
}

export class Group {
    @Expose()
    id: string;
}

class Operations {
    @Expose()
    items: Group[] | Member[];

    @Expose()
    item: Group | Member;

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