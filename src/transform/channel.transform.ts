import { Expose } from "class-transformer";
import type { Overwrite } from "./overwrite.transform";

export class ChannelTransform {
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

    @Expose()
    permission_overwrites: Overwrite[];
}