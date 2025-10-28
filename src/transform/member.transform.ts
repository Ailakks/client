import { Expose } from "class-transformer"
import type { UserTransform } from "./user.transform";

export class MemberTransform {
    @Expose()
    user: UserTransform;

    @Expose()
    roles: string[];
}