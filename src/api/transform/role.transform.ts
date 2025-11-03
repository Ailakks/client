import { Expose } from "class-transformer"

export class RoleTransform {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    permissions: string;

    @Expose()
    position: number;
}