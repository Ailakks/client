import { Expose } from "class-transformer";

class Category {
    @Expose()

    name: string;

    @Expose()
    src: string;
}

export class StickersListTransform {
    @Expose()
    categories: Category[];
}