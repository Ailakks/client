import { Expose, Type } from "class-transformer";
import { MemberTransform } from "./member.transform";

class Author extends MemberTransform {
}

class Attachment {
    @Expose()
    proxy_url: string;
}

class Embed {
    @Expose()
    description: string;
}

export class MessageTransform {
    @Expose()
    id: string;

    @Expose()
    content: string;

    @Expose()
    @Type(() => Author)
    author: Author;

    @Expose()
    timestamp: number;

    @Expose()
    edited_timestamp: number;

    @Expose()
    @Type(() => Attachment)
    attachments: Attachment[];

    @Expose()
    @Type(() => Embed)
    embeds: Embed[];
}