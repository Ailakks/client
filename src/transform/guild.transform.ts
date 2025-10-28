import { Expose } from "class-transformer";
import type { Channel } from "./channel.transform";

export class Guild {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    icon: string;

    @Expose()
    channels: Channel[];
}