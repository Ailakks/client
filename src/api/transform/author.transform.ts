import { Expose } from "class-transformer";

export class UserTransform {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    bio: string;

    @Expose()
    avatar: string;
}