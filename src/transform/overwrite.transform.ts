import { Expose } from "class-transformer"

export class Overwrite {
    @Expose()
    id: string;

    @Expose()
    allow: string;

    @Expose()
    deny: string;
}