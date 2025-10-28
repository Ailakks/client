import { Expose } from "class-transformer"

export class Role {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    permissions: string;

    @Expose()
    position: number;
}