import { Expose, Type } from "class-transformer";
import { AuthorTransform } from "./author.transform";

class Author extends AuthorTransform {
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