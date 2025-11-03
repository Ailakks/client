import { Expose, Type } from "class-transformer";
import type { MemberTransform } from "../member.transform";

class Member {
    @Expose()
    member: MemberTransform;
}

class Group {
    @Expose()
    id: string;
}

class Operations {
    @Expose()
    items: Group[] | Member[];

    @Expose()
    range: number[];
}

export class GuildMemberListUpdateTransform {
    @Expose({ name: 'ops' })
    @Type(() => Operations)
    operations: Operations;
}