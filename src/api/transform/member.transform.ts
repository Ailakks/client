import { Expose } from "class-transformer"
import { UserTransform } from "./user.transform";

export class MemberTransform extends UserTransform {
    @Expose()
    user: UserTransform;

    @Expose()
    roles: string[];
}