import { Expose } from "class-transformer"

export class OverwriteTransform {
    @Expose()
    id: string;

    @Expose()
    allow: string;

    @Expose()
    deny: string;
}