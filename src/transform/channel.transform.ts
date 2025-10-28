import { Expose } from "class-transformer";

export class Channel {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    type: number;

    @Expose()
    position: number;

    @Expose()
    parent_id: string;

    @Expose()
    flags: number;
}