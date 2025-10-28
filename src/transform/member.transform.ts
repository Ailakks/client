import { Expose } from "class-transformer"
import type { User } from "./user.transform";

export class Member {
    @Expose()
    user: User;

    @Expose()
    roles: string[];
}